"use server";
import { prisma } from "@/lib/prisma";

export async function getUserIdFromClerk(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user.id;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Não foi possível identificar o usuário");
  }
}
