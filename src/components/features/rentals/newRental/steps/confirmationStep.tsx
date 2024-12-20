"use client";

import { useRentalForm } from "@/contexts/rentalFormContext";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { createRental } from "@/useCases/rentals/createRental";
import { useAuth } from "@clerk/nextjs";
import { addMonths, isAfter, isBefore, setDate, startOfDay } from "date-fns";
import { CalendarDays, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ConfirmationStepProps {
  onBack: () => void;
  onComplete: () => void;
}

interface ChargePreview {
  dueDate: Date;
  price: number;
}

function generateChargesPreviews(
  startDate: Date,
  endDate: Date,
  price: number,
  dueDay: number
): ChargePreview[] {
  const charges: ChargePreview[] = [];
  let currentDate = startOfDay(setDate(new Date(startDate), dueDay));

  // Se a data de vencimento for anterior à data de início,
  // avança para o próximo mês
  if (isBefore(currentDate, startDate)) {
    currentDate = addMonths(currentDate, 1);
  }

  while (!isAfter(currentDate, endDate)) {
    charges.push({
      dueDate: new Date(currentDate),
      price,
    });
    currentDate = addMonths(currentDate, 1);
  }

  return charges;
}

export function ConfirmationStep({
  onBack,
  onComplete,
}: ConfirmationStepProps) {
  const { userId } = useAuth();
  const { formData } = useRentalForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!formData.renter || !formData.property || !formData.contract) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          Dados incompletos. Por favor, volte e preencha todos os dados.
        </p>
      </div>
    );
  }

  const chargesPreviews = formData.contract.endDate
    ? generateChargesPreviews(
        startOfDay(new Date(formData.contract.startDate)),
        startOfDay(new Date(formData.contract.endDate)),
        formData.contract.price,
        formData.contract.dueDay
      )
    : [];

  const handleComplete = async () => {
    if (!userId) return;

    try {
      setIsSubmitting(true);
      await createRental({
        userId,
        data: formData,
      });
      toast.success("Aluguel criado com sucesso!");
      onComplete();
      router.refresh();
    } catch {
      toast.error("Erro ao criar aluguel. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Inquilino e Imóvel */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm text-gray-600 font-medium">Inquilino</h3>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {formData.renter.name}
          </p>
          <p className="text-xs text-gray-500">{formData.renter.document}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm text-gray-600 font-medium">Imóvel</h3>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {formData.property.identifier}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {formData.property.address}, {formData.property.number}
          </p>
        </div>
      </div>

      {/* Detalhes do Contrato */}
      <div className="bg-gray-50 rounded-lg p-3">
        <h3 className="text-sm font-medium mb-2 text-gray-600">
          Detalhes do Contrato
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Valor:</span>
            <span className="text-gray-600 font-medium">
              {formatCurrency(formData.contract.price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Vencimento:</span>
            <span className="font-medium text-gray-600">
              Dia {formData.contract.dueDay}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Início:</span>
            <span className="font-medium text-gray-600">
              {formatDate(formData.contract.startDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Término:</span>
            <span className="font-medium text-gray-600">
              {formatDate(formData.contract.endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Resumo das Cobranças */}
      <div className="bg-blue-50 rounded-lg p-3">
        <h3 className="text-sm font-medium mb-2 text-gray-600">
          Resumo das Cobranças
        </h3>
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="text-gray-600">
              {chargesPreviews.length} cobranças serão geradas
            </p>
            <p className="text-blue-600 font-medium">
              Total:{" "}
              {formatCurrency(
                chargesPreviews.reduce((acc, charge) => acc + charge.price, 0)
              )}
            </p>
          </div>
          <button
            className="text-xs text-blue-600 hover:text-blue-800"
            onClick={() => toast.info("Em desenvolvimento")}
          >
            Ver detalhes
          </button>
        </div>
      </div>

      {/* Aviso */}
      <div className="text-xs text-gray-500 text-center">
        Ao confirmar, o aluguel será criado e as cobranças serão geradas
        automaticamente.
      </div>

      {/* Botões */}
      <div className="flex justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-500 text-gray-100 rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          Voltar
        </button>
        <button
          onClick={handleComplete}
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Criando...
            </>
          ) : (
            "Confirmar"
          )}
        </button>
      </div>
    </div>
  );
}
