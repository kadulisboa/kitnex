import { InfoBanner } from "@/components/ui/informationBanner";
import { PageTitle } from "@/components/ui/pageTitle";
import { checkNeedsOnboarding } from "@/useCases/users/checkNeedsOnboarding";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const needsOnboarding = await checkNeedsOnboarding(user.id);

  if (needsOnboarding) {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-6">
      <InfoBanner
        badge="Beta"
        title="Versão Beta do Kitnex"
        description="Você está utilizando a versão beta do Kitnex. Em breve lançaremos a versão 1.0 com novas funcionalidades para melhorar ainda mais a gestão dos seus imóveis."
        variant="info"
        className="mb-6"
      />
      <PageTitle title="Dashboard" subtitle={`Bem-vindo, ${user.firstName}!`} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Estatísticas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Total de Kitnets
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
        </div>

        {/* Card de Estatísticas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Aluguéis Ativos</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
        </div>

        {/* Card de Estatísticas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Pagamentos Pendentes
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Próximos Passos
        </h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Você ainda não cadastrou nenhuma kitnet. Comece agora mesmo!
          </p>
        </div>
      </div>
    </div>
  );
}
