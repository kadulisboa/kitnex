import { prisma } from "@/lib/prisma";
import { renters as mockRenters } from "@/mocks/renters";

interface GetRentersParams {
  userId: string;
  search?: string;
  onlyActive?: boolean;
}

export async function getRenters({
  userId,
  search,
  onlyActive = true,
}: GetRentersParams) {
  // TODO: Implementar busca real no banco
  // return prisma.renter.findMany({
  //   where: {
  //     active: onlyActive ? true : undefined,
  //     OR: search ? [
  //       { name: { contains: search, mode: 'insensitive' } },
  //       { document: { contains: search, mode: 'insensitive' } },
  //     ] : undefined,
  //   },
  //   orderBy: { name: 'asc' },
  // });

  // Mock implementation
  let filtered = [...mockRenters];

  if (onlyActive) {
    filtered = filtered.filter((renter) => renter.active);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (renter) =>
        renter.name.toLowerCase().includes(searchLower) ||
        renter.document.includes(search)
    );
  }

  return filtered;
}
