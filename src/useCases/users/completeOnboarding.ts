import { prisma } from "@/lib/prisma";
import { PixKeyType } from "@/types/enums";

interface CompleteOnboardingParams {
  clerkId: string;
  name: string;
  whatsapp: string;
  pixKeyType: PixKeyType;
  pixKeyValue: string;
}

export async function completeOnboarding(params: CompleteOnboardingParams) {
  return prisma.user.update({
    where: { clerkId: params.clerkId },
    data: {
      name: params.name,
      phone: params.whatsapp,
      settings: {
        update: {
          notifyByWhatsapp: true,
          pixKeyType: params.pixKeyType,
          pixKeyValue: params.pixKeyValue,
        },
      },
    },
  });
}
