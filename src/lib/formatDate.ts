import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
};

export const formatDateWithTime = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};

export const formatDateToMonth = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, "MMMM/yyyy", { locale: ptBR });
};
