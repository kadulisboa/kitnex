import { useState } from "react";

interface CEPData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export function useCEPLookup() {
  const [cepData, setCepData] = useState<CEPData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddressData = async (cep: string): Promise<CEPData | null> => {
    setLoading(true);
    setError(null);
    console.log("fetching address data for", cep);
    const formatedCep = cep.replace(/\D/g, "");

    try {
      if (formatedCep.length == 8) {
        const response = await fetch(
          `https://viacep.com.br/ws/${formatedCep}/json/`
        );
        if (response.ok) {
          const data: CEPData = await response.json();
          setCepData(data);
          return data;
        } else {
          setError("Erro ao buscar informações de endereço.");
          return null;
        }
      }
      return null;
    } catch {
      setError("Erro de rede ao buscar informações de endereço.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { cepData, loading, error, fetchAddressData };
}
