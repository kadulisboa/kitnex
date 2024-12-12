import type { ChargeStatus, PixKeyType, PropertyType } from "./enums";

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UserResponse {
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
}

export interface PropertyResponse {
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
}

export interface RenterResponse {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  document: string;
  active: boolean;
}

export interface RentalResponse {
  id: string;
  price: number;
  dueDay: number;
  startDate: Date;
  endDate: Date | null;
  active: boolean;
  property: PropertyResponse;
  renter: RenterResponse;
}

export interface ChargeResponse {
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
}
