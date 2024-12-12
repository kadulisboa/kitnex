import { Renter } from "@/types/models";

export const renters: Renter[] = [
  {
    id: "1",
    name: "João Silva",
    document: "123.456.789-00",
    email: "joao@email.com",
    phone: "(11) 98765-4321",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Maria Santos",
    document: "987.654.321-00",
    email: "maria@email.com",
    phone: "(11) 91234-5678",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    document: "456.789.123-00",
    email: null,
    phone: "(11) 94567-8901",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Ana Costa",
    document: "789.123.456-00",
    email: "ana@email.com",
    phone: null,
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
