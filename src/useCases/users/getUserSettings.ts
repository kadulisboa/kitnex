// src/useCases/users/getUserSettings.ts
import { prisma } from "@/lib/prisma";
import { PixKeyType } from "@/types/enums";

export interface UserSettings {
  notifyByEmail: boolean;
  notifyByWhatsapp: boolean;
  pixKeyType: PixKeyType | null;
  pixKeyValue: string | null;
}

export async function getUserSettings(clerkId: string): Promise<UserSettings> {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        settings: true,
      },
    });

    if (!user?.settings) {
      return {
        notifyByEmail: true,
        notifyByWhatsapp: false,
        pixKeyType: null,
        pixKeyValue: null,
      };
    }

    return {
      notifyByEmail: user.settings.notifyByEmail,
      notifyByWhatsapp: user.settings.notifyByWhatsapp,
      pixKeyType: user.settings.pixKeyType,
      pixKeyValue: user.settings.pixKeyValue,
    };
  } catch (error) {
    console.error("Erro ao buscar configurações do usuário:", error);
    throw new Error("Não foi possível buscar as configurações");
  }
}
