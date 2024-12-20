import { RentalsHeader } from "@/components/features/rentals/rentalsHeader";
import { RentalsList } from "@/components/features/rentals/rentalsList";
import { PageTitle } from "@/components/ui/pageTitle";
import { getRentals } from "@/useCases/rentals/getRentals";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface RentalsPageProps {
  searchParams: {
    search?: string;
    status?: string;
  };
}

export default async function RentalsPage({ searchParams }: RentalsPageProps) {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  // Aguarda os searchParams
  const { search, status } = await searchParams;

  const rentals = await getRentals({
    userId: user.id,
    search,
    hasOverdueCharges: status === "overdue",
  });

  return (
    <div className="space-y-6">
      <PageTitle
        title="Aluguéis"
        subtitle="Gerencie todos os seus contratos de aluguel"
      />

      <RentalsHeader />

      <div className="bg-white rounded-lg shadow">
        <RentalsList rentals={rentals} />
      </div>
    </div>
  );
}
