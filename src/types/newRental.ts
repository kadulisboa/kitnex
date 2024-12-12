export type Step = "renter" | "property" | "contract" | "confirmation";

export const steps = [
  { id: "renter" as const, title: "Inquilino" },
  { id: "property" as const, title: "Imóvel" },
  { id: "contract" as const, title: "Contrato" },
  { id: "confirmation" as const, title: "Confirmação" },
] as const;
