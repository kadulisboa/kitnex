export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

// Também podemos adicionar alguns helpers adicionais úteis
export const formatDateWithTime = (date: Date | string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const formatDateToMonth = (date: Date | string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
