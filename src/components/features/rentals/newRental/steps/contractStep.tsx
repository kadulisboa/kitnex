"use client";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

interface ContractStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function ContractStep({ onNext, onBack }: ContractStepProps) {
  const [contract, setContract] = useState({
    price: "",
    dueDay: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (field: string, value: string) => {
    setContract((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Valor do Aluguel */}
        <div>
          <label className="flex items-center justify-between">
            <span className="block text-sm font-medium text-gray-700">
              Valor do Aluguel
            </span>
            <span className="text-red-500 text-xs">*Obrigatório</span>
          </label>
          <NumericFormat
            value={contract.price}
            onChange={(e) => handleChange("price", e.target.value)}
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Dia do Vencimento */}
        <div>
          <label className="flex items-center justify-between">
            <span className="block text-sm font-medium text-gray-700">
              Dia do Vencimento
            </span>
            <span className="text-red-500 text-xs">*Obrigatório</span>
          </label>
          <select
            value={contract.dueDay}
            onChange={(e) => handleChange("dueDay", e.target.value)}
            className="text-gray-900 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecione o dia</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data de Início */}
      <div>
        <label className="flex items-center justify-between">
          <span className="block text-sm font-medium text-gray-700">
            Data de Início
          </span>
          <span className="text-red-500 text-xs">*Obrigatório</span>
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            value={contract.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="text-gray-900 pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Data de Término */}
      <div>
        <label className="flex items-center justify-between">
          <span className="block text-sm font-medium text-gray-700">
            Data de Término
          </span>
          <span className="text-red-500 text-xs">*Obrigatório</span>
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            value={contract.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="text-gray-900 pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Informações sobre as cobranças */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          Informações sobre as cobranças
        </h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>As cobranças serão geradas automaticamente de acordo com:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>O dia de vencimento selecionado</li>
            <li>O período do contrato</li>
            <li>Serão geradas apenas cobranças futuras</li>
          </ul>
        </div>
      </div>

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
