// src/app/(app)/settings/page.tsx
import { SettingsForm } from "@/components/features/settings/form";
import { PageTitle } from "@/components/ui/pageTitle";
import { getUserSettings } from "@/useCases/users/getUserSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  // Busca configurações atuais do usuário
  const settings = await getUserSettings(user.id);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Configurações"
        subtitle="Gerencie suas preferências e configurações"
      />

      <div className="bg-white rounded-lg shadow-sm">
        <SettingsForm userId={user.id} initialSettings={settings} />
      </div>
    </div>
  );
}
