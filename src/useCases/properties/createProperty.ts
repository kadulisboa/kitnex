"use server";
import { generateCode } from "@/lib/generateCode";
import { prisma } from "@/lib/prisma";
import { CreatePropertyDTO } from "@/types/dtos";
import { Property } from "@prisma/client";

interface CreatePropertyParams {
  userId: string;
  data: CreatePropertyDTO;
  fromRental: boolean;
}

export async function createProperty({
  userId,
  data,
  fromRental = false,
}: CreatePropertyParams): Promise<Property> {
  // throw new Error("Função não implementada");
  try {
    // Verifica se já existe um imóvel com o mesmo identificador para o usuário
    const existingProperty = await prisma.property.findFirst({
      where: {
        userId,
        identifier: data.identifier,
      },
    });

    if (existingProperty) {
      throw new Error("Já existe um imóvel com este identificador");
    }

    // Gera o código sequencial do imóvel
    const sequence = await prisma.userSequence.upsert({
      where: { userId },
      update: { propertySeq: { increment: 1 } },
      create: { userId, propertySeq: 1 },
    });

    const propertyCode = generateCode("KX", sequence.propertySeq);

    // Normaliza os dados
    const normalizedData = {
      ...data,
      zipCode: data.zipCode.replace(/\D/g, ""), // Remove não dígitos do CEP
      userId,
      code: propertyCode,
      title: data.identifier, // Usa o identificador como título
      active: !fromRental,
    };

    // Cria o imóvel
    const property = await prisma.property.create({
      data: normalizedData,
    });

    return property;
  } catch (error) {
    console.error("Erro ao criar imóvel:", error);
    throw error;
  }
}
