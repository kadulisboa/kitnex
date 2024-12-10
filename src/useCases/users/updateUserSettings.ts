// src/useCases/users/updateUserSettings.ts
import { prisma } from "@/lib/prisma";
import { PixKeyType } from "@/types/enums";

interface UpdateUserSettingsParams {
  clerkId: string;
  settings: {
    notifyByEmail: boolean;
    notifyByWhatsapp: boolean;
    pixKeyType: PixKeyType | null;
    pixKeyValue: string | null;
  };
}

export async function updateUserSettings({
  clerkId,
  settings,
}: UpdateUserSettingsParams) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await prisma.userSettings.upsert({
      where: {
        userId: user.id,
      },
      update: {
        notifyByEmail: settings.notifyByEmail,
        notifyByWhatsapp: settings.notifyByWhatsapp,
        pixKeyType: settings.pixKeyType,
        pixKeyValue: settings.pixKeyValue,
      },
      create: {
        userId: user.id,
        notifyByEmail: settings.notifyByEmail,
        notifyByWhatsapp: settings.notifyByWhatsapp,
        pixKeyType: settings.pixKeyType,
        pixKeyValue: settings.pixKeyValue,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);
    throw new Error("Não foi possível atualizar as configurações");
  }
}
