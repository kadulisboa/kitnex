import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />

      <div className="relative">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Crie sua conta no Kitnex
          </h2>
          <p className="mt-2 text-gray-200">
            Comece a gerenciar seus aluguéis agora mesmo
          </p>
        </div>

        <SignUp
          appearance={{
            elements: {
              card: "bg-white shadow-xl",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-500",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              footerActionLink: "text-blue-600 hover:text-blue-700",
              formFieldInput:
                "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              socialButtonsBlockButton:
                "border border-gray-300 hover:bg-gray-50",
              socialButtonsBlockButtonText: "text-gray-600 font-medium",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500",
            },
          }}
        />
      </div>
    </div>
  );
}
