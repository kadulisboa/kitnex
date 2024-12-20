import { prisma } from "@/lib/prisma";

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
  return prisma.renter.findMany({
    where: {
      active: onlyActive ? true : undefined,
      OR: search
        ? [
            { name: { contains: search, mode: "insensitive" } },
            { document: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
      userId,
    },
    orderBy: { name: "asc" },
  });
}
