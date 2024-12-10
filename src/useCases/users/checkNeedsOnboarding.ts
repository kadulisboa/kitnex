"use server";

import { prisma } from "@/lib/prisma";

export async function checkNeedsOnboarding(clerkId: string | undefined) {
  if (!clerkId) return true;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      settings: true,
    },
  });

  if (!user) return true;

  // Usuário precisa de onboarding se:
  // - Não tiver nome OU
  // - Não tiver telefone OU
  // - Não tiver configurações de PIX
  return (
    !user.name ||
    !user.phone ||
    !user.settings?.pixKeyType ||
    !user.settings?.pixKeyValue
  );
}
