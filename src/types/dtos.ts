import type { ChargeStatus, PropertyType } from "./enums";

export interface CreateUserDTO {
  name: string;
  clerkId: string;
  email: string;
  phone?: string;
  planId: string;
}

export interface CreatePropertyDTO {
  type: PropertyType;
  identifier: string;
  address: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CreateRenterDTO {
  name: string;
  email?: string;
  phone?: string;
  document: string;
}

export interface CreateRentalDTO {
  propertyId: string;
  renterId: string;
  price: number;
  dueDay: number;
  startDate: Date;
  endDate?: Date;
}

export interface CreateChargeDTO {
  rentalId: string;
  dueDate: Date;
  price: number;
}

export type UpdateUserDTO = Partial<CreateUserDTO>;
export type UpdatePropertyDTO = Partial<CreatePropertyDTO>;
export type UpdateRenterDTO = Partial<CreateRenterDTO>;
export type UpdateRentalDTO = Partial<
  Omit<CreateRentalDTO, "propertyId" | "renterId">
>;
export type UpdateChargeDTO = {
  status: ChargeStatus;
  paidAt?: Date;
  proofUrl?: string;
};
