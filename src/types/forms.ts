import { PropertyType } from "./enums";
import type { Step } from "./newRental";

export interface RenterFormData {
  id?: string;
  name: string;
  document: string;
  email?: string;
  phone: string;
  isNew?: boolean;
}

export interface PropertyFormData {
  id?: string;
  type: PropertyType;
  identifier: string;
  address: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  isNew?: boolean;
}

export interface ContractFormData {
  price: number;
  dueDay: number;
  startDate: Date;
  endDate?: Date;
}

export interface RentalFormData {
  renter?: RenterFormData;
  property?: PropertyFormData;
  contract?: ContractFormData;
  currentStep: Step;
}
