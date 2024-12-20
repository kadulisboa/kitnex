"use server";
import { getUserIdFromClerk } from "@/lib/auth";
import { generateCode } from "@/lib/generateCode";
import { prisma } from "@/lib/prisma";
import { CreateRentalDTO } from "@/types/dtos";
import { RentalFormData } from "@/types/forms";
import { createCharges } from "../charges/createCharges";
import { createProperty } from "../properties/createProperty";
import { createRenter } from "../renters/createRenter";

interface CreateRentalParams {
  userId: string;
  data: RentalFormData;
}

export async function createRental({ userId, data }: CreateRentalParams) {
  try {
    const userIdNoClerk = await getUserIdFromClerk(userId);

    if (!data.renter || !data.property || !data.contract) {
      throw new Error("Dados incompletos");
    }

    // 1. Cria ou obtém o inquilino
    let renterId: string;
    if (data.renter?.isNew) {
      const renter = await createRenter({
        userId: userIdNoClerk,
        name: data.renter.name,
        document: data.renter.document,
        email: data.renter.email || undefined,
        phone: data.renter.phone,
      });
      renterId = renter.id;
    } else {
      if (!data.renter?.id) throw new Error("ID do inquilino não fornecido");
      renterId = data.renter.id;
    }

    // console.log("Renter ID:", renterId);

    // 2. Cria ou obtém o imóvel
    let propertyId: string;
    if (data.property?.isNew) {
      const property = await createProperty({
        userId: userIdNoClerk,
        data: {
          type: data.property.type,
          identifier: data.property.identifier,
          address: data.property.address,
          number: data.property.number,
          complement: data.property.complement || undefined,
          district: data.property.district,
          city: data.property.city,
          state: data.property.state,
          zipCode: data.property.zipCode,
        },
        fromRental: true,
      });
      propertyId = property.id;
    } else {
      if (!data.property?.id) throw new Error("ID do imóvel não fornecido");
      propertyId = data.property.id;
    }

    // console.log("Property ID:", propertyId);

    // 3. Gera código sequencial para o aluguel
    const sequence = await prisma.userSequence.update({
      where: { userId: userIdNoClerk },
      data: { rentalSeq: { increment: 1 } },
    });

    const rentalCode = generateCode("AX", sequence.rentalSeq);

    // 4. Cria o aluguel
    const rentalData: CreateRentalDTO = {
      userId: userIdNoClerk,
      code: rentalCode,
      propertyId,
      renterId,
      price: data.contract.price,
      dueDay: data.contract.dueDay,
      startDate: new Date(data.contract.startDate),
      endDate: new Date(data.contract.endDate),
    };

    const rental = await prisma.rental.create({
      data: rentalData,
      include: {
        property: true,
        renter: true,
      },
    });

    // console.log("Rental created:", rental);

    // 5. Cria as cobranças
    await createCharges({
      userId: userIdNoClerk,
      rentalId: rental.id,
      startDate: new Date(data.contract.startDate),
      endDate: new Date(data.contract.endDate),
      price: data.contract.price,
      dueDay: data.contract.dueDay,
    });

    return {
      ...rental,
      price: parseFloat(rental.price.toString()),
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao criar aluguel:", error.stack);
    } else {
      console.error("Erro ao criar aluguel:", error);
    }

    throw error;
  }
}
