import { prisma } from "@/lib/prisma";
import { Renter } from "@prisma/client";

interface CreateRenterData {
  name: string;
  document: string;
  email?: string;
  phone?: string;
}

export async function createRenter(data: CreateRenterData): Promise<Renter> {
  const normalizedDocument = data.document.replace(/\D/g, "");
  const normalizedPhone = data.phone?.replace(/\D/g, "");

  // TODO: Implementar criação real no banco
  // return prisma.renter.create({
  //   data: {
  //     ...data,
  //     document: normalizedDocument,
  //     phone: normalizedPhone,
  //     active: true,
  //   },
  // });

  // Mock implementation
  return {
    id: Math.random().toString(36).substring(7),
    name: data.name,
    document: normalizedDocument,
    email: data.email || null,
    phone: normalizedPhone || null,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Renter;
}
