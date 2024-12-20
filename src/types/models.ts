import { ChargeStatus, PixKeyType, PropertyType } from "./enums";

export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  phone: string | null;
  planId: string;
  plan?: Plan;
  properties?: Property[];
  rentals?: Rental[];
  settings?: UserSettings | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  id: string;
  userId: string;
  notifyByEmail: boolean;
  notifyByWhatsapp: boolean;
  pixKeyType: PixKeyType | null;
  pixKeyValue: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  features: PlanFeature[];
  price: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanFeature {
  id: string;
  planId: string;
  feature: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  userId: string;
  code: string;
  title: string;
  type: PropertyType;
  identifier: string;
  address: string;
  number: string;
  complement: string | null;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Renter {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  document: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rental {
  id: string;
  userId: string;
  code: string;
  propertyId: string;
  property?: Property;
  renterId: string;
  renter?: Renter;
  price: number;
  dueDay: number;
  startDate: Date;
  endDate: Date | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Charge {
  id: string;
  userId: string;
  code: string;
  title: string;
  rentalId: string;
  rental?: Rental;
  dueDate: Date;
  price: number;
  status: ChargeStatus;
  paidAt: Date | null;
  proofUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
