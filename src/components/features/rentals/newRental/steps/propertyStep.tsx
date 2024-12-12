"use client";

import { useCEPLookup } from "@/services/useCepLookup";
import { PropertyType } from "@/types/enums";
import { Search } from "lucide-react";
import { useState } from "react";
import { PatternFormat } from "react-number-format";

interface PropertyStepProps {
  onNext: () => void;
  onBack: () => void;
}

const propertyTypeLabels: Record<PropertyType, string> = {
  KITNET: "Kitnet",
  // HOUSE: "Casa",
  // APARTMENT: "Apartamento",
  // COMMERCIAL: "Comercial",
  // OTHER: "Outro",
};

export function PropertyStep({ onNext, onBack }: PropertyStepProps) {
  const [selectedOption, setSelectedOption] = useState<"existing" | "new">(
    "existing"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const { fetchAddressData, loading } = useCEPLookup();

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 9) {
      const addressData = await fetchAddressData(newCep);
      if (addressData) {
        setAddress({
          street: addressData.logradouro,
          number: "",
          complement: "",
          neighborhood: addressData.bairro,
          city: addressData.localidade,
          state: addressData.uf,
        });
      }
    }
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
              name="propertyOption"
              value="existing"
              checked={selectedOption === "existing"}
              onChange={() => setSelectedOption("existing")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900">
              Selecionar imóvel existente
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="propertyOption"
              value="new"
              checked={selectedOption === "new"}
              onChange={() => setSelectedOption("new")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900">Cadastrar novo imóvel</span>
          </label>
        </div>
      </div>

      {/* Conteúdo baseado na seleção */}
      {selectedOption === "existing" ? (
        <div className="space-y-4">
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
              placeholder="Buscar imóvel por identificador ou endereço..."
              className="text-gray-900 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Lista de imóveis */}
          <div className="border rounded-lg divide-y max-h-[300px] overflow-y-auto">
            {/* TODO: Lista de imóveis */}
            <div className="p-4 text-center text-sm text-gray-500">
              Nenhum imóvel encontrado
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Tipo do Imóvel
                </span>
                <span className="text-red-500 text-xs">*Obrigatório</span>
              </label>
              <select
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecione um tipo</option>
                {Object.entries(propertyTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  CEP
                </span>
                <span className="text-red-500 text-xs">*Obrigatório</span>
              </label>
              <PatternFormat
                type="text"
                value={cep}
                onChange={handleCEPChange}
                placeholder={loading ? "Carregando..." : "Digite o CEP"}
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                format={"#####-###"}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between">
              <span className="block text-sm font-medium text-gray-700">
                Endereço
              </span>
              <span className="text-red-500 text-xs">*Obrigatório</span>
            </label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, street: e.target.value }))
              }
              className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Número
                </span>
                <span className="text-red-500 text-xs">*Obrigatório</span>
              </label>
              <input
                required
                type="text"
                value={address.number}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, number: e.target.value }))
                }
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Complemento
              </label>
              <input
                type="text"
                value={address.complement}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    complement: e.target.value,
                  }))
                }
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Bairro
                </span>
                <span className="text-red-500 text-xs">*Obrigatório</span>
              </label>
              <input
                type="text"
                value={address.neighborhood}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    neighborhood: e.target.value,
                  }))
                }
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Cidade
                </span>
                <span className="text-red-500 text-xs">*Obrigatório</span>
              </label>
              <input
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, city: e.target.value }))
                }
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Estado
                </span>
                <span className="text-red-500 text-xs">*Obrigatório</span>
              </label>
              <input
                type="text"
                value={address.state}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, state: e.target.value }))
                }
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700">
                  Identificador
                </span>
                <span className="text-red-500 text-xs">*Obrigatório</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Kitnet 101"
                className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Botões de navegação */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-gray-100 rounded-lg hover:bg-gray-600"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
