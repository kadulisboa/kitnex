"use server";

import { PixKeyType } from "@/types/enums";
import { completeOnboarding } from "@/useCases/users/completeOnboarding";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const OnboardingSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  whatsapp: z
    .string()
    .min(14, "WhatsApp inválido")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido de WhatsApp"),
  pixKeyType: z.nativeEnum(PixKeyType, {
    errorMap: () => ({ message: "Tipo de chave PIX inválido" }),
  }),
  pixKeyValue: z.string().min(1, "Chave PIX é obrigatória"),
});

type FormState = {
  errors?: {
    name?: string[];
    whatsapp?: string[];
    pixKeyType?: string[];
    pixKeyValue?: string[];
    global?: string[];
  };
  success?: boolean;
};

export async function onboardingAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState | never> {
  const user = await currentUser();

  if (!user?.id) {
    return {
      errors: {
        global: ["401 - Usuário não autenticado"],
      },
    };
  }

  const validatedFields = OnboardingSchema.safeParse({
    name: formData.get("name"),
    whatsapp: formData.get("whatsapp"),
    pixKeyType: formData.get("pixKeyType"),
    pixKeyValue: formData.get("pixKeyValue"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { name, whatsapp, pixKeyType, pixKeyValue } = validatedFields.data;

    await completeOnboarding({
      clerkId: user.id,
      name,
      whatsapp,
      pixKeyType,
      pixKeyValue,
    });

    (await cookies()).set("onboarding-success", "true", {
      maxAge: 5, // expira em 5 segundos
      path: "/",
    });

    // Se chegou aqui, deu tudo certo
    redirect("/dashboard");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      // Não trata como erro, apenas deixa o redirect acontecer
      throw error;
    }

    // console.log(error);
    return {
      errors: {
        global: [
          (error as Error).message || "Algo deu errado. Tente novamente.",
        ],
      },
    };
  }
}
