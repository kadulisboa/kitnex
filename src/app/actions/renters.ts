"use server";

import { getUserIdFromClerk } from "@/lib/auth";
import { Renter } from "@/types/models";
import { createRenter } from "@/useCases/renters/createRenter";
import { getRenters } from "@/useCases/renters/getRenters";
import { revalidatePath } from "next/cache";

export async function searchRentersAction(
  userId: string,
  search: string
): Promise<{ data?: Renter[]; error?: string }> {
  try {
    const userIdNoClerk = await getUserIdFromClerk(userId);
    const renters = await getRenters({ userId: userIdNoClerk, search });
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
    const userId = "123";
    const renter = await createRenter({
      ...data,
      userId,
      phone: data.phone || "",
    });
    revalidatePath("/rentals");
    return { data: renter };
  } catch {
    return { error: "Erro ao criar inquilino" };
  }
}
