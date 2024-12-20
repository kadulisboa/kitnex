import { Charge, Property, Rental, Renter } from "@/types/models";

type RenterSummary = Pick<Renter, "id" | "name" | "document">;
type PropertySummary = Pick<Property, "identifier" | "address">;
type ChargeSummary = Pick<Charge, "id">;

type RentalWithSummary = Omit<Rental, "renter" | "property"> & {
  renter: RenterSummary;
  property: PropertySummary;
  _count: { charges: number };
  charges: ChargeSummary[];
};

export type { RentalWithSummary };

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
}
export type RenterStepProps = StepProps;
export type PropertyStepProps = StepProps;
export type ContractStepProps = StepProps;
export type ConfirmationStepProps = StepProps;

// Tipo de retorno da query
export type PropertyWithSummary = Property & {
  _count: {
    rentals: number;
  };
  rentals: Array<{
    id: string;
    startDate: Date;
    endDate: Date | null;
    renter: {
      name: string;
    };
  }>;
};
