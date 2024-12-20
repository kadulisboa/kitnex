import {
  addMonths,
  endOfMonth,
  isAfter,
  isBefore,
  setDate,
  startOfDay,
} from "date-fns";

/**
 * Ajusta a data de vencimento baseado nas regras:
 * 1. Se o dia solicitado existe no mês, usa ele
 * 2. Se não existe (ex: 31 em abril), usa o último dia do mês
 * 3. Se é a última cobrança e a data final é antes do vencimento, usa a data final
 */
export function adjustDueDate(
  date: Date,
  targetDueDay: number,
  isLastCharge: boolean = false,
  endDate?: Date
): Date {
  // Normaliza as datas para início do dia para evitar problemas de comparação
  const baseDate = startOfDay(date);
  const lastDayOfMonth = endOfMonth(baseDate);
  const lastDayNumber = lastDayOfMonth.getDate();

  // Se é a última cobrança e tem data final definida
  if (isLastCharge && endDate) {
    const endDateNormalized = startOfDay(endDate);
    const proposedDueDate = setDate(baseDate, targetDueDay);

    // Se a data de vencimento proposta é depois da data final
    if (isAfter(proposedDueDate, endDateNormalized)) {
      return endDateNormalized;
    }
  }

  // Se o dia solicitado é maior que o último dia do mês
  if (targetDueDay > lastDayNumber) {
    return lastDayOfMonth;
  }

  // Usa o dia solicitado
  return setDate(baseDate, targetDueDay);
}

/**
 * Gera uma sequência de datas de vencimento entre duas datas
 */
export function generateDueDates(
  startDate: Date,
  endDate: Date,
  dueDay: number
): Date[] {
  const dueDates: Date[] = [];
  let currentDate = startOfDay(startDate);
  const endDateNormalized = startOfDay(endDate);

  // Ajusta para o primeiro vencimento
  let currentDueDate = adjustDueDate(currentDate, dueDay);

  // Se o primeiro vencimento é antes da data inicial, avança um mês
  if (isBefore(currentDueDate, currentDate)) {
    currentDate = addMonths(currentDate, 1);
    currentDueDate = adjustDueDate(currentDate, dueDay);
  }

  // Gera as datas de vencimento
  while (!isAfter(currentDueDate, endDateNormalized)) {
    const isLastCharge = isAfter(
      addMonths(currentDueDate, 1),
      endDateNormalized
    );

    dueDates.push(
      adjustDueDate(currentDueDate, dueDay, isLastCharge, endDateNormalized)
    );

    currentDate = addMonths(currentDate, 1);
    currentDueDate = adjustDueDate(currentDate, dueDay);
  }

  return dueDates;
}
