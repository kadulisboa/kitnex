import { checkNeedsOnboarding } from "@/useCases/users/checkNeedsOnboarding";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function SignInPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />

      <div className="relative">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">Bem-vindo ao Kitnex</h2>
          <p className="mt-2 text-gray-200">
            Gerencie seus aluguéis de forma simples
          </p>
        </div>

        <SignIn
          fallbackRedirectUrl={await (async () => {
            const needsOnboarding = await checkNeedsOnboarding(user?.id);
            return needsOnboarding ? "/onboarding" : "/dashboard";
          })()}
          appearance={{
            elements: {
              card: "bg-white shadow-xl",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-500",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              footerActionLink: "text-blue-600 hover:text-blue-700",
              formFieldInput:
                "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
            },
          }}
        />
      </div>
    </div>
  );
}
