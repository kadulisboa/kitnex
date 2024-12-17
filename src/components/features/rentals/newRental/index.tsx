"use client";

import { ConfirmationStep } from "@/components/features/rentals/newRental/steps/confirmationStep";
import { ContractStep } from "@/components/features/rentals/newRental/steps/contractStep";
import { PropertyStep } from "@/components/features/rentals/newRental/steps/propertyStep";
import { RenterStep } from "@/components/features/rentals/newRental/steps/renterStep";
import { StepsIndicator } from "@/components/features/rentals/newRental/stepsIndicator";
import { RentalFormProvider } from "@/contexts/rentalFormContext";

import { type Step } from "@/types/newRental";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export interface NewRentalModalProps {
  onClose: () => void;
}

export function NewRentalModal({ onClose }: NewRentalModalProps) {
  const [step, setStep] = useState<Step>("renter");
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);

  // Função para marcar uma etapa como completa
  const completeStep = (currentStep: Step, nextStep: Step) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setStep(nextStep);
  };

  // Função para navegação entre etapas
  const handleStepClick = (selectedStep: Step) => {
    // Só permite navegar para etapas completadas ou a etapa atual
    if (completedSteps.includes(selectedStep) || step === selectedStep) {
      setStep(selectedStep);
    }
  };

  // Previne o scroll do body quando o modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <RentalFormProvider>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg w-full max-w-3xl shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Novo Aluguel
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Steps Indicator */}
            <StepsIndicator
              currentStep={step}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />

            {/* Content */}
            <div className="p-6 min-h-[400px]">
              {step === "renter" && (
                <RenterStep onNext={() => completeStep("renter", "property")} />
              )}
              {step === "property" && (
                <PropertyStep
                  onBack={() => setStep("renter")}
                  onNext={() => completeStep("property", "contract")}
                />
              )}
              {step === "contract" && (
                <ContractStep
                  onBack={() => setStep("property")}
                  onNext={() => completeStep("contract", "confirmation")}
                />
              )}
              {step === "confirmation" && (
                <ConfirmationStep
                  onBack={() => setStep("contract")}
                  onComplete={() => onClose()}
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </RentalFormProvider>
  );
}
