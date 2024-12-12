import { prisma } from "@/lib/prisma";
import { CreateUserDTO } from "@/types/dtos";
import { UserResponse } from "@/types/responses";

export async function createUser(params: CreateUserDTO): Promise<UserResponse> {
  try {
    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: params.clerkId },
    });

    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    // Pegar plano free
    const freePlan = await prisma.plan.findFirst({
      where: { name: "Free" },
    });

    if (!freePlan) {
      throw new Error("Plano free não encontrado");
    }

    // Criar usuário com suas configurações
    const user = await prisma.user.create({
      data: {
        clerkId: params.clerkId,
        email: params.email,
        name: params.name,
        phone: params.phone ?? null,
        planId: freePlan.id,
        settings: {
          create: {
            notifyByEmail: true,
            notifyByWhatsapp: false,
          },
        },
      },
      include: {
        plan: true,
        settings: true,
      },
    });

    // Retornar no formato UserResponse
    return {
      id: user.id,
      clerkId: user.clerkId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      plan: {
        id: user.plan.id,
        name: user.plan.name,
        price: Number(user.plan.price),
      },
      settings: user.settings
        ? {
            notifyByEmail: user.settings.notifyByEmail,
            notifyByWhatsapp: user.settings.notifyByWhatsapp,
            pixKeyType: user.settings.pixKeyType,
            pixKeyValue: user.settings.pixKeyValue,
          }
        : null,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
