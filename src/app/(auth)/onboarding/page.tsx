import { onboardingAction } from "@/app/actions/onboarding";
import { OnboardingForm } from "@/components/features/onboarding/form";
import { checkNeedsOnboarding } from "@/useCases/users/checkNeedsOnboarding";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const needsOnboarding = await checkNeedsOnboarding(user.id);

  if (!needsOnboarding) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-900 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Configurando sua conta
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Estamos preparando tudo para você. Por favor, preencha os dados abaixo
          para continuar.
        </p>

        <OnboardingForm
          action={onboardingAction}
          defaultName={user.fullName || ""}
        />
      </div>
    </div>
  );
}
