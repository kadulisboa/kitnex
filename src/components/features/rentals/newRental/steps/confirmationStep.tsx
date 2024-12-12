"use client";

interface ConfirmationStepProps {
  onBack: () => void;
  onConfirm: () => void;
}

interface InfoGridProps {
  title: string;
  items: { label: string; value: string }[];
}

function InfoGrid({ title, items }: InfoGridProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      <div className="bg-gray-50 p-3 rounded-lg grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map(({ label, value }, index) => (
          <div
            key={index}
            className="text-sm flex justify-between border-b-[1px]"
          >
            <span className="text-gray-500">{label}:</span>
            <span className="text-gray-900 font-medium ml-2">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConfirmationStep({ onBack, onConfirm }: ConfirmationStepProps) {
  return (
    <div className="space-y-4">
      <InfoGrid
        title="Inquilino"
        items={[
          { label: "Nome", value: "João Silva" },
          { label: "CPF", value: "123.456.789-00" },
          { label: "Whatsapp", value: "(11) 98765-4321" },
        ]}
      />

      <InfoGrid
        title="Imóvel"
        items={[
          { label: "Tipo", value: "Kitnet" },
          { label: "Identificador", value: "Kitnet 101" },
          { label: "Endereço", value: "Rua das Flores, 123" },
          { label: "Cidade/UF", value: "São Paulo/SP" },
        ]}
      />

      <InfoGrid
        title="Contrato"
        items={[
          { label: "Valor", value: "R$ 800,00" },
          { label: "Vencimento", value: "Dia 10" },
          { label: "Início", value: "01/01/2024" },
          { label: "Término", value: "31/12/2024" },
        ]}
      />

      {/* Aviso */}
      <div className="rounded-lg bg-blue-50 p-3">
        <p className="text-sm text-blue-700">
          Ao confirmar, o aluguel será criado e todas as cobranças serão geradas
          automaticamente.
        </p>
      </div>

      {/* Botões */}
      <div className="flex justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-gray-100 rounded-lg hover:bg-gray-600"
        >
          Voltar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
