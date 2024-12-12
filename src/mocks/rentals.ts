import { RentalWithSummary } from "@/types/props";

// src/mocks/rentals.ts
export const rentals: RentalWithSummary[] = [
  {
    id: "1",
    userId: "user1",
    code: "AX001",
    propertyId: "P001",
    renterId: "R001",
    price: 800,
    dueDay: 10,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-01-01"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    renter: {
      id: "1",
      name: "João Silva",
      document: "123.456.789-00",
    },
    property: {
      identifier: "Kitnet 101",
      address: "Rua das Flores, 123 - Centro",
    },
    _count: {
      charges: 12,
    },
    overdueCharges: 1,
  },
  {
    id: "2",
    userId: "user1",
    code: "AX002",
    propertyId: "P002",
    renterId: "R002",
    price: 1200,
    dueDay: 5,
    startDate: new Date("2023-12-01"),
    endDate: new Date("2024-12-01"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    renter: {
      id: "2",
      name: "Maria Souza",
      document: "987.654.321-00",
    },
    property: {
      identifier: "Kitnet 202",
      address: "Av. Principal, 456 - Jardim",
    },
    _count: {
      charges: 12,
    },
    overdueCharges: 0,
  },
  {
    id: "3",
    userId: "user1",
    code: "AX003",
    propertyId: "P003",
    renterId: "R003",
    price: 950,
    dueDay: 15,
    startDate: new Date("2024-02-01"),
    endDate: null,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    renter: {
      id: "3",
      name: "Pedro Santos",
      document: "456.789.123-00",
    },
    property: {
      identifier: "Kitnet 303",
      address: "Rua dos Ipês, 789 - Vila Nova",
    },
    _count: {
      charges: 6,
    },
    overdueCharges: 2,
  },
  {
    id: "4",
    userId: "user1",
    code: "AX004",
    propertyId: "P004",
    renterId: "R004",
    price: 1500,
    dueDay: 1,
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-11-01"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    renter: {
      id: "4",
      name: "Ana Oliveira",
      document: "321.654.987-00",
    },
    property: {
      identifier: "Kitnet 404",
      address: "Rua das Palmeiras, 321 - Centro",
    },
    _count: {
      charges: 12,
    },
    overdueCharges: 0,
  },
];
