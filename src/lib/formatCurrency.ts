export const formatCurrency = (value: number | string | bigint) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};
