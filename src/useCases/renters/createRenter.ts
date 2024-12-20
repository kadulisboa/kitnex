"use server";
import { prisma } from "@/lib/prisma";
import { CreateRenterDTO } from "@/types/dtos";
import { Renter } from "@prisma/client";

export async function createRenter(data: CreateRenterDTO): Promise<Renter> {
  try {
    // Verifica se já existe um inquilino com o mesmo documento
    const existingRenter = await prisma.renter.findUnique({
      where: {
        userId_document: {
          userId: data.userId,
          document: data.document,
        },
      },
    });

    if (existingRenter) {
      throw new Error("Já existe um inquilino com este documento");
    }

    // Cria o inquilino
    const renter = await prisma.renter.create({
      data: {
        ...data,
        active: true,
      },
    });

    return renter;
  } catch (error) {
    console.error("Erro ao criar inquilino:", error);
    throw error;
  }
}
