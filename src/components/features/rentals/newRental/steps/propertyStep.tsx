// src/components/features/rentals/newRental/steps/propertyStep.tsx
"use client";

import { useRentalForm } from "@/contexts/rentalFormContext";
import { properties } from "@/mocks/properties";
import { useCEPLookup } from "@/services/useCepLookup";
import { PropertyType } from "@/types/enums";
import { PropertyFormData as SelectedProperty } from "@/types/forms";
import { Property } from "@/types/models";
import { PropertyStepProps } from "@/types/props";
import { House, HousePlus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

const propertyTypeLabels: Record<PropertyType, string> = {
  KITNET: "Kitnet",
  // HOUSE: "Casa",
  // APARTMENT: "Apartamento",
  // COMMERCIAL: "Comercial",
  // OTHER: "Outro",
};

export function PropertyStep({ onNext, onBack }: PropertyStepProps) {
  const { formData, setPropertyData } = useRentalForm();

  // Inicializa estados com dados do contexto, se existirem
  const [selectedOption, setSelectedOption] = useState<"existing" | "new">(
    !formData.property?.isNew ? "existing" : "new"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] =
    useState<SelectedProperty | null>(
      formData.property?.id
        ? {
            id: formData.property.id,
            identifier: formData.property.identifier,
            address: formData.property.address,
            type: formData.property.type,
            number: formData.property.number || null,
            district: formData.property.district,
            city: formData.property.city,
            state: formData.property.state,
            zipCode: formData.property.zipCode,
          }
        : null
    );

  const [type, setType] = useState<PropertyType | "">(
    formData.property?.type || ""
  );
  const [cep, setCep] = useState(formData.property?.zipCode || "");
  const [address, setAddress] = useState({
    street: formData.property?.address || "",
    number: formData.property?.number || "",
    complement: formData.property?.complement || "",
    neighborhood: formData.property?.district || "",
    city: formData.property?.city || "",
    state: formData.property?.state || "",
    zipCode: formData.property?.zipCode || cep,
    identifier: formData.property?.identifier || "",
  });

  const { fetchAddressData, loading } = useCEPLookup();

  const handleOptionChange = (option: "existing" | "new") => {
    if (option === "new") {
      setType("");
      setCep("");
      setAddress({
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        identifier: "",
        zipCode: "",
      });
    } else {
      setSelectedProperty(null);
      setSearchTerm("");
      setSearchResults([]);
    }
    setSelectedOption(option);
  };

  // Busca imóveis quando o termo de busca muda
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = properties.filter(
      (property) =>
        property.identifier.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower) ||
        property.district.toLowerCase().includes(searchLower)
    );
    setSearchResults(filtered);
  }, [searchTerm]);

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 9) {
      const addressData = await fetchAddressData(newCep);
      if (addressData) {
        setAddress((prev) => ({
          ...prev,
          street: addressData.logradouro,
          neighborhood: addressData.bairro,
          city: addressData.localidade,
          state: addressData.uf,
        }));
      }
    }
  };

  const handleNext = () => {
    if (selectedOption === "existing" && !selectedProperty) {
      toast.error("Selecione um imóvel para continuar");
      return;
    }

    if (selectedOption === "existing" && selectedProperty) {
      setPropertyData({
        id: selectedProperty.id,
        type: selectedProperty.type,
        identifier: selectedProperty.identifier,
        address: selectedProperty.address,
        number: selectedProperty.number || null,
        district: selectedProperty.district,
        city: selectedProperty.city,
        state: selectedProperty.state,
        isNew: false,
        zipCode: selectedProperty.zipCode,
      });
      onNext();
    } else {
      // Validação dos campos obrigatórios
      if (
        !type ||
        !address.street ||
        !address.number ||
        !address.neighborhood ||
        !address.city ||
        !address.state ||
        !address.identifier ||
        !cep
      ) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }

      setPropertyData({
        type,
        identifier: address.identifier,
        address: address.street,
        number: address.number,
        complement: address.complement,
        district: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: cep,
        isNew: selectedOption === "new",
      });
      onNext();
    }
  };

  const handleBack = () => {
    if (selectedOption === "existing" && selectedProperty) {
      setPropertyData({
        id: selectedProperty.id,
        type: selectedProperty.type,
        identifier: selectedProperty.identifier,
        address: selectedProperty.address,
        number: selectedProperty.number || null,
        district: selectedProperty.district,
        city: selectedProperty.city,
        state: selectedProperty.state,
        isNew: false,
        zipCode: selectedProperty.zipCode,
      });
      onBack();
    } else {
      setPropertyData({
        type: type as PropertyType,
        identifier: address.identifier,
        address: address.street,
        number: address.number,
        complement: address.complement,
        district: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: cep,
        isNew: selectedOption === "new",
      });
      onBack();
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
              onChange={() => handleOptionChange("existing")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <House size={20} className="text-gray-500" />
              <span className="text-sm text-gray-900">Imóvel existente</span>
            </div>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="propertyOption"
              value="new"
              checked={selectedOption === "new"}
              onChange={() => handleOptionChange("new")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <HousePlus size={20} className="text-gray-500" />
              <span className="text-sm text-gray-900">Novo imóvel</span>
            </div>
          </label>
        </div>
      </div>

      {selectedOption === "existing" ? (
        <div className="space-y-4">
          {/* Card do imóvel selecionado */}
          {selectedProperty && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <House size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Imóvel selecionado
                    </h4>
                    <p className="text-sm text-blue-700">
                      {selectedProperty.identifier}
                    </p>
                    <p className="text-sm text-blue-600">
                      {selectedProperty.address}, {selectedProperty.number}
                    </p>
                    <p className="text-sm text-blue-600">
                      {selectedProperty.district} - {selectedProperty.city}/
                      {selectedProperty.state}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProperty(null)}
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
              placeholder="Buscar imóvel por identificador ou endereço..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Lista de imóveis */}
          <div className="border rounded-lg divide-y max-h-[300px] overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {searchTerm ? "Nenhum imóvel encontrado" : "Digite para buscar"}
              </div>
            ) : (
              searchResults
                .filter((property) => property.id !== selectedProperty?.id)
                .map((property) => (
                  <label
                    key={property.id}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="selectedProperty"
                      checked={selectedProperty?.id === property.id}
                      onChange={() =>
                        setSelectedProperty({
                          id: property.id,
                          identifier: property.identifier,
                          address: property.address,
                          type: property.type,
                          number: property.number,
                          district: property.district,
                          city: property.city,
                          state: property.state,
                          zipCode: property.zipCode,
                        })
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {property.identifier}
                      </p>
                      <p className="text-sm text-gray-500">
                        {property.address}, {property.number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {property.district} - {property.city}/{property.state}
                      </p>
                    </div>
                  </label>
                ))
            )}
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
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
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
                value={address.identifier}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    identifier: e.target.value,
                  }))
                }
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
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-gray-100 rounded-lg hover:bg-gray-600"
        >
          Voltar
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
