import { Step, steps } from "@/types/newRental";

interface StepsIndicatorProps {
  currentStep: Step;
  completedSteps: Step[];
  onStepClick: (step: Step) => void;
}

export function StepsIndicator({
  currentStep,
  completedSteps,
  onStepClick,
}: StepsIndicatorProps) {
  // Helper para determinar o estado visual do step
  const getStepStyle = (stepId: Step) => {
    if (currentStep === stepId) {
      return "bg-blue-800 text-white"; // Etapa atual - azul escuro
    }
    if (completedSteps.includes(stepId)) {
      return "bg-blue-500 text-white"; // Etapa completa - azul
    }
    return "bg-gray-100 text-gray-600"; // Etapa não visitada - cinza
  };

  // Helper para determinar o estado da linha conectora
  const getConnectorStyle = (stepId: Step) => {
    if (completedSteps.includes(stepId)) {
      return "bg-blue-500"; // Linha azul para etapas completadas
    }
    return "bg-gray-200"; // Linha cinza para etapas não completadas
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            {/* Círculo numerado clicável */}
            <button
              onClick={() => onStepClick(step.id)}
              className={`
                flex items-center justify-center w-8 h-8 rounded-full font-medium
                transition-colors duration-200
                ${getStepStyle(step.id)}
                ${
                  completedSteps.includes(step.id) || currentStep === step.id
                    ? "hover:bg-blue-700 cursor-pointer"
                    : "cursor-not-allowed"
                }
              `}
              disabled={
                !completedSteps.includes(step.id) && currentStep !== step.id
              }
            >
              {i + 1}
            </button>

            {/* Título do passo */}
            <span
              className={`
                ml-2 text-sm font-medium
                ${currentStep === step.id ? "text-blue-800" : "text-gray-900"}
              `}
            >
              {step.title}
            </span>

            {/* Linha conectora (menos no último item) */}
            {i < steps.length - 1 && (
              <div
                className={`w-12 h-1 mx-2 rounded transition-colors duration-200 ${getConnectorStyle(
                  step.id
                )}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
