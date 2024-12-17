import { PropertyType } from "@/types/enums";
import { Property } from "@/types/models";

export const properties: Property[] = [
  {
    id: "1",
    userId: "mock-user-id",
    code: "KX001",
    title: "Kitnet Centro",
    type: PropertyType.KITNET,
    identifier: "Kitnet 101",
    address: "Rua das Flores",
    number: "123",
    complement: "Térreo",
    district: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01001-000",
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "mock-user-id",
    code: "KX002",
    title: "Kitnet Jardins",
    type: PropertyType.KITNET,
    identifier: "Kitnet 202",
    address: "Avenida Paulista",
    number: "1000",
    complement: "Bloco A",
    district: "Jardins",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-000",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    userId: "mock-user-id",
    code: "KX003",
    title: "Kitnet Vila Mariana",
    type: PropertyType.KITNET,
    identifier: "Kitnet 303",
    address: "Rua Vergueiro",
    number: "500",
    complement: null,
    district: "Vila Mariana",
    city: "São Paulo",
    state: "SP",
    zipCode: "04101-000",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];