// src/useCases/charges/createCharges.ts
"use server";

import { generateDueDates } from "@/lib/dateUtils";
import { generateCode } from "@/lib/generateCode";
import { prisma } from "@/lib/prisma";
import { ChargeStatus } from "@/types/enums";
import { Decimal } from "@prisma/client/runtime/library";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CreateChargesParams {
  userId: string;
  rentalId: string;
  startDate: Date;
  endDate: Date;
  price: number | Decimal;
  dueDay: number;
}

export async function createCharges({
  userId,
  rentalId,
  startDate,
  endDate,
  price,
  dueDay,
}: CreateChargesParams) {
  try {
    // Gera todas as datas de vencimento
    const dueDates: Date[] = generateDueDates(startDate, endDate, dueDay);

    // Prepara as cobranças
    const charges = await Promise.all(
      dueDates.map(async (dueDate) => {
        // Gera código sequencial para a cobrança
        const sequence = await prisma.userSequence.upsert({
          where: { userId },
          update: { chargeSeq: { increment: 1 } },
          create: { userId, chargeSeq: 1 },
        });

        const chargeCode = generateCode("CX", sequence.chargeSeq);

        // Formata o título com o mês e ano
        const monthYear = format(dueDate, "MMMM'/'yyyy", { locale: ptBR });

        return {
          userId,
          rentalId,
          code: chargeCode,
          title: `Aluguel ${monthYear}`,
          dueDate,
          price,
          status: ChargeStatus.PENDING,
        };
      })
    );

    // Cria todas as cobranças
    const createdCharges = await prisma.charge.createMany({
      data: charges,
    });

    return {
      count: createdCharges.count,
      charges: await prisma.charge.findMany({
        where: { rentalId },
        orderBy: { dueDate: "asc" },
      }),
    };
  } catch (error) {
    console.error("Erro ao criar cobranças:", error);
    throw new Error("Não foi possível criar as cobranças");
  }
}
