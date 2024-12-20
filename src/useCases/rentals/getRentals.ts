import { getUserIdFromClerk } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rentals as mockedRentals } from "@/mocks/rentals";
import { RentalWithSummary } from "@/types/props";

interface GetRentalsParams {
  userId: string;
  search?: string;
  hasOverdueCharges?: boolean;
}

export async function getRentals({
  userId,
  search,
  hasOverdueCharges,
}: GetRentalsParams): Promise<RentalWithSummary[]> {
  const userIdNoClerk = await getUserIdFromClerk(userId);

  const rentals = await prisma.rental.findMany({
    where: {
      userId: userIdNoClerk,
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
          id: true,
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
      charges: {
        select: {
          id: true,
        },
        where: {
          status: "OVERDUE",
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

  return rentals.map((rental) => ({
    ...rental,
    price: parseFloat(rental.price.toString()),
  }));
}

export async function getMockedRentals({
  search,
  hasOverdueCharges,
}: GetRentalsParams) {
  let filteredRentals = [...mockedRentals];

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
      (rental) => rental.charges.length > 0
    );
  }

  return filteredRentals;
}
