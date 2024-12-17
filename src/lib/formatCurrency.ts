export const formatCurrency = (value: number | string | bigint) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};

export const formatCurrencyToDecimal = (value: string) => {
  const currencywithoutDots = value.replace(/\./g, "");
  const currencyWithSymbols = currencywithoutDots.replace(",", ".");
  const currency = currencyWithSymbols.match(/R\$ (.*)/);

  if (!currency) {
    if (value === "R$ 0,00") {
      return 0.0;
    }
  }
  return currency ? parseFloat(currency[1]) : parseFloat(value);
};
