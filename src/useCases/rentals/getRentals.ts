import { prisma } from "@/lib/prisma";
import { rentals } from "@/mocks/rentals";

interface GetRentalsParams {
  userId: string;
  search?: string;
  hasOverdueCharges?: boolean;
}

export async function getRentals({
  userId,
  search,
  hasOverdueCharges,
}: GetRentalsParams) {
  return prisma.rental.findMany({
    where: {
      userId,
      active: true,
      OR: search
        ? [
            { renter: { name: { contains: search, mode: "insensitive" } } },
            { renter: { document: { contains: search, mode: "insensitive" } } },
            {
              property: {
                identifier: { contains: search, mode: "insensitive" },
              },
            },
            {
              property: { address: { contains: search, mode: "insensitive" } },
            },
          ]
        : undefined,
      charges: hasOverdueCharges
        ? {
            some: {
              status: "OVERDUE",
              dueDate: { lt: new Date() },
            },
          }
        : undefined,
    },
    include: {
      renter: {
        select: {
          name: true,
          document: true,
        },
      },
      property: {
        select: {
          identifier: true,
          address: true,
        },
      },
      _count: {
        select: {
          charges: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getMockedRentals({
  search,
  hasOverdueCharges,
}: GetRentalsParams) {
  let filteredRentals = [...rentals];

  // Aplica filtro de busca
  if (search) {
    const searchLower = search.toLowerCase();
    filteredRentals = filteredRentals.filter(
      (rental) =>
        rental.renter.name.toLowerCase().includes(searchLower) ||
        rental.renter.document.includes(search) ||
        rental.property.identifier.toLowerCase().includes(searchLower) ||
        rental.property.address.toLowerCase().includes(searchLower)
    );
  }

  // Filtra por cobranças pendentes
  if (hasOverdueCharges) {
    filteredRentals = filteredRentals.filter(
      (rental) => rental.overdueCharges > 0
    );
  }

  return filteredRentals;
}
