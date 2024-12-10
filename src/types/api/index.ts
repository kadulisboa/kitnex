import { ChargeStatus, PixKeyType, PropertyType } from "../enums";

// User
export type CreateUserDTO = {
  name: string;
  clerkId: string;
  email: string;
  phone?: string;
  planId: string;
};

export type UpdateUserDTO = Partial<CreateUserDTO>;

export type UserResponse = {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  phone: string | null;
  plan: {
    id: string;
    name: string;
    price: number;
  };
  settings: {
    notifyByEmail: boolean;
    notifyByWhatsapp: boolean;
    pixKeyType: PixKeyType | null;
    pixKeyValue: string | null;
  } | null;
};

// Property
export type CreatePropertyDTO = {
  type: PropertyType;
  identifier: string;
  address: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
};

export type UpdatePropertyDTO = Partial<CreatePropertyDTO>;

export type PropertyResponse = {
  id: string;
  type: PropertyType;
  identifier: string;
  address: string;
  number: string | null;
  complement: string | null;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  active: boolean;
};

// Renter
export type CreateRenterDTO = {
  name: string;
  email?: string;
  phone?: string;
  document: string;
};

export type UpdateRenterDTO = Partial<CreateRenterDTO>;

export type RenterResponse = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  document: string;
  active: boolean;
};

// Rental
export type CreateRentalDTO = {
  propertyId: string;
  renterId: string;
  price: number;
  dueDay: number;
  startDate: Date;
  endDate?: Date;
};

export type UpdateRentalDTO = Partial<
  Omit<CreateRentalDTO, "propertyId" | "renterId">
>;

export type RentalResponse = {
  id: string;
  price: number;
  dueDay: number;
  startDate: Date;
  endDate: Date | null;
  active: boolean;
  property: PropertyResponse;
  renter: RenterResponse;
};

// Charge
export type CreateChargeDTO = {
  rentalId: string;
  dueDate: Date;
  price: number;
};

export type UpdateChargeDTO = {
  status: ChargeStatus;
  paidAt?: Date;
  proofUrl?: string;
};

export type ChargeResponse = {
  id: string;
  dueDate: Date;
  price: number;
  status: ChargeStatus;
  paidAt: Date | null;
  proofUrl: string | null;
  rental: {
    id: string;
    property: {
      identifier: string;
    };
    renter: {
      name: string;
    };
  };
};

// API Response Pattern
export type ApiResponse<T> = {
  data: T;
  error?: string;
};

export type ApiListResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};
