"use server";

import { updateUserSettings } from "@/useCases/users/updateUserSettings";

export async function updateSettingsAction(
  userId: string,
  settings: Parameters<typeof updateUserSettings>[0]["settings"]
) {
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  return updateUserSettings({
    clerkId: userId,
    settings,
  });
}
