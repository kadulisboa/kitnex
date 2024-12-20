"use server";

import { getUserIdFromClerk } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface GetPropertiesParams {
  userId: string;
  search?: string;
  active?: boolean;
  onlyAvailable?: boolean; // Propriedades que não têm aluguel ativo
}

export async function getProperties({
  userId,
  search,
  active = true,
  onlyAvailable = false,
}: GetPropertiesParams) {
  const userIdNoClerk = await getUserIdFromClerk(userId);
  try {
    return await prisma.property.findMany({
      where: {
        userId: userIdNoClerk,
        active,
        // Se onlyAvailable é true, filtra propriedades sem aluguéis ativos
        ...(onlyAvailable && {
          rentals: {
            none: {
              active: true,
            },
          },
        }),
        // Busca por vários campos se houver termo de busca
        ...(search && {
          OR: [
            { identifier: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } },
            { district: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { code: { contains: search.toUpperCase() } }, // código é sempre maiúsculo
          ],
        }),
      },
      include: {
        _count: {
          select: {
            rentals: true,
          },
        },
        // Inclui o aluguel ativo atual, se existir
        rentals: {
          where: {
            active: true,
          },
          take: 1,
          select: {
            id: true,
            startDate: true,
            endDate: true,
            renter: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw new Error("Não foi possível buscar os imóveis");
  }
}
