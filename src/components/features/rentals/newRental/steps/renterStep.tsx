"use client";

import { searchRentersAction } from "@/app/actions/renters";
import { useRentalForm } from "@/contexts/rentalFormContext";
import { RenterFormData as SelectedRenter } from "@/types/forms";
import { Renter as RenterType } from "@/types/models";
import { useAuth } from "@clerk/nextjs";
import { Search, UserPlus, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

interface RenterStepProps {
  onNext: () => void;
}

export function RenterStep({ onNext }: RenterStepProps) {
  const { userId } = useAuth();
  const { formData, setRenterData } = useRentalForm();
  const [selectedOption, setSelectedOption] = useState<"existing" | "new">(
    !formData.renter?.isNew ? "existing" : "new"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<RenterType[]>([]);
  const [selectedRenter, setSelectedRenter] = useState<SelectedRenter | null>(
    formData.renter?.id
      ? {
          id: formData.renter.id,
          name: formData.renter.name,
          document: formData.renter.document,
          email: formData.renter.email || "",
          phone: formData.renter.phone || "",
        }
      : null
  );
  const [isSearching, setIsSearching] = useState(false);

  // Form state for new renter
  const [newRenter, setNewRenter] = useState({
    name: formData.renter?.isNew ? formData.renter.name : "",
    document: formData.renter?.isNew ? formData.renter.document : "",
    email: formData.renter?.isNew ? formData.renter.email : "",
    phone: formData.renter?.isNew ? formData.renter.phone : "",
  });

  // Search renters when searchTerm changes
  useEffect(() => {
    const search = async () => {
      setIsSearching(true);
      if (!searchTerm) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      const result = await searchRentersAction(userId!, searchTerm);
      if (result.data) {
        setSearchResults(result.data);
      }
      setIsSearching(false);
    };

    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleNext = () => {
    if (selectedOption === "existing" && selectedRenter) {
      // Salva o inquilino selecionado no contexto
      setRenterData({
        id: selectedRenter.id,
        name: selectedRenter.name,
        document: selectedRenter.document,
        email: selectedRenter.email || "",
        phone: selectedRenter.phone || "",
        isNew: false,
      });
      onNext();
    } else if (selectedOption === "new") {
      // Validações do novo inquilino
      if (!newRenter.name || !newRenter.document || !newRenter.phone) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }

      // Salva os dados do novo inquilino no contexto (sem criar ainda)
      setRenterData({
        name: newRenter.name,
        document: newRenter.document,
        email: newRenter.email,
        phone: newRenter.phone,
        isNew: true,
      });
      onNext();
    }
  };

  const handleSelectRenter = (renter: RenterType) => {
    const selected = {
      id: renter.id,
      name: renter.name,
      document: renter.document,
      email: renter.email,
      phone: renter.phone,
    };
    setSelectedRenter(selected);
  };

  const handleOptionChange = (option: "existing" | "new") => {
    // Limpa os dados ao mudar de opção
    if (option === "existing") {
      setNewRenter({
        name: "",
        document: "",
        email: "",
        phone: "",
      });
    } else {
      setSelectedRenter(null);
      setSearchTerm("");
      setSearchResults([]);
    }
    setSelectedOption(option);
  };

  return (
    <div className="space-y-6">
      {/* Opções de Seleção */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Selecione uma opção
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="renterOption"
              value="existing"
              checked={selectedOption === "existing"}
              onChange={() => handleOptionChange("existing")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <UserRound size={20} className="text-gray-500" />
              <span className="text-sm text-gray-900">Inquilino existente</span>
            </div>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="renterOption"
              value="new"
              checked={selectedOption === "new"}
              onChange={() => handleOptionChange("new")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <UserPlus size={20} className="text-gray-500" />
              <span className="text-sm text-gray-900">Novo inquilino</span>
            </div>
          </label>
        </div>
      </div>

      {/* Conteúdo baseado na seleção */}
      {selectedOption === "existing" ? (
        <div className="space-y-4">
          {/* Card do inquilino selecionado */}
          {selectedRenter && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <UserRound size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Inquilino selecionado
                    </h4>
                    <p className="text-sm text-blue-700">
                      {selectedRenter.name}
                    </p>
                    <p className="text-sm text-blue-600">
                      {selectedRenter.document}
                    </p>
                    {selectedRenter.email && (
                      <p className="text-sm text-blue-600">
                        {selectedRenter.email}
                      </p>
                    )}
                    {selectedRenter.phone && (
                      <p className="text-sm text-blue-600">
                        {selectedRenter.phone}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRenter(null)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Campo de busca */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar inquilino por nome ou CPF..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Lista de inquilinos */}
          <div className="border rounded-lg divide-y max-h-[300px] overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {searchTerm
                  ? isSearching
                    ? "Buscando..."
                    : "Nenhum inquilino encontrado"
                  : "Digite para buscar"}
              </div>
            ) : (
              searchResults
                .filter((renter) => renter.id !== selectedRenter?.id)
                .map((renter) => (
                  <label
                    key={renter.id}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="selectedRenter"
                      value={renter.id}
                      checked={selectedRenter?.id === renter.id}
                      onChange={() => handleSelectRenter(renter)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{renter.name}</p>
                      <p className="text-sm text-gray-500">{renter.document}</p>
                    </div>
                  </label>
                ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="flex items-center justify-between">
              <span className="block text-sm font-medium text-gray-700">
                Nome completo
              </span>
              <span className="text-red-500 text-xs">*Obrigatório</span>
            </label>
            <input
              type="text"
              value={newRenter.name}
              onChange={(e) =>
                setNewRenter((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center justify-between">
              <span className="block text-sm font-medium text-gray-700">
                CPF
              </span>
              <span className="text-red-500 text-xs">*Obrigatório</span>
            </label>
            <PatternFormat
              format="###.###.###-##"
              value={newRenter.document}
              onChange={(e) =>
                setNewRenter((prev) => ({ ...prev, document: e.target.value }))
              }
              className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              value={newRenter.email ?? undefined}
              onChange={(e) =>
                setNewRenter((prev) => ({ ...prev, email: e.target.value }))
              }
              className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between">
              <span className="block text-sm font-medium text-gray-700">
                Whatsapp
              </span>
              <span className="text-red-500 text-xs">*Obrigatório</span>
            </label>
            <PatternFormat
              format="(##) #####-####"
              value={newRenter.phone}
              onChange={(e) =>
                setNewRenter((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      )}

      {/* Botões de navegação */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => handleNext()}
          disabled={selectedOption === "existing" && !selectedRenter}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
