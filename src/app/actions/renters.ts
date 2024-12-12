"use server";

import { createRenter } from "@/useCases/renters/createRenter";
import { getRenters } from "@/useCases/renters/getRenters";
import { revalidatePath } from "next/cache";

export async function searchRentersAction(userId: string, search: string) {
  try {
    const renters = await getRenters({ userId, search });
    return { data: renters };
  } catch {
    return { error: "Erro ao buscar inquilinos" };
  }
}

export async function createRenterAction(data: {
  name: string;
  document: string;
  email?: string;
  phone?: string;
}) {
  try {
    const renter = await createRenter(data);
    revalidatePath("/rentals");
    return { data: renter };
  } catch {
    return { error: "Erro ao criar inquilino" };
  }
}
