import { Property, Rental, Renter } from "@/types/models";

type RenterSummary = Pick<Renter, "id" | "name" | "document">;
type PropertySummary = Pick<Property, "identifier" | "address">;

type RentalWithSummary = Omit<Rental, "renter" | "property"> & {
  renter: RenterSummary;
  property: PropertySummary;
  _count: { charges: number };
  overdueCharges: number;
};

export type { RentalWithSummary };
