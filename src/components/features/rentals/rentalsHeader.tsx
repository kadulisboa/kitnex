"use client";

import { NewRentalModal } from "@/components/features/rentals/newRental";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function RentalsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "";

  // Atualiza a URL com os filtros
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="w-full flex gap-4">
        {/* Busca */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por inquilino, CPF, endereço..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={currentSearch}
            onChange={(e) => updateSearchParams("search", e.target.value)}
          />
        </div>

        {/* Filtro de Status */}
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          value={currentStatus}
          onChange={(e) => updateSearchParams("status", e.target.value)}
        >
          <option value="">Todos</option>
          <option value="overdue">Atrasados</option>
        </select>
      </div>

      {/* Botão Novo Aluguel */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Novo Aluguel
      </button>

      {isModalOpen && <NewRentalModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
