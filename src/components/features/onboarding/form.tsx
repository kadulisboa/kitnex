"use client";

import { PixKeyType } from "@/types/enums";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";

type FormState = {
  errors?: {
    name?: string[];
    whatsapp?: string[];
    pixKeyType?: string[];
    pixKeyValue?: string[];
    global?: string[];
  };
};

type OnboardingFormProps = {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  defaultName?: string;
};

const pixKeyTypeLabels: Record<PixKeyType, string> = {
  [PixKeyType.CPF]: "CPF",
  [PixKeyType.CNPJ]: "CNPJ",
  [PixKeyType.PHONE]: "Telefone",
  [PixKeyType.EMAIL]: "E-mail",
  [PixKeyType.RANDOM]: "Chave aleatória",
};

const getPixKeyFormat = (type: PixKeyType) => {
  switch (type) {
    case PixKeyType.CPF:
      return "###.###.###-##";
    case PixKeyType.CNPJ:
      return "##.###.###/####-##";
    case PixKeyType.PHONE:
      return "(##) #####-####";
    default:
      return "";
  }
};

export function OnboardingForm({
  action,
  defaultName = "",
}: OnboardingFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, { errors: {} });

  const [pixKeyType, setPixKeyType] = useState<PixKeyType | "">("");
  const [pixKeyValue, setPixKeyValue] = useState("");

  const handlePixKeyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as PixKeyType;
    setPixKeyType(newType);
    setPixKeyValue("");
  };

  useEffect(() => {
    if (state.errors?.global) {
      router.push("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      {state.errors?.global && (
        <div className="p-3 bg-red-100 border border-red-400 rounded-lg">
          {state.errors.global.map((error) => (
            <p key={error} className="text-sm text-red-700">
              {error.split(" - ").pop()}
            </p>
          ))}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Como você gostaria de ser chamado?
        </label>
        <input
          id="name"
          type="text"
          defaultValue={defaultName}
          name="name"
          className={`mt-1 block w-full text-slate-900 rounded-md border ${
            state.errors?.name ? "border-red-500" : "border-gray-300"
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          required
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="whatsapp"
          className="block text-sm font-medium text-gray-700"
        >
          Seu WhatsApp
        </label>
        <PatternFormat
          format="(##) #####-####"
          name="whatsapp"
          id="whatsapp"
          placeholder="(11) 99999-9999"
          className={`mt-1 block w-full rounded-md text-slate-800 border ${
            state.errors?.whatsapp ? "border-red-500" : "border-gray-300"
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          required
        />
        {state.errors?.whatsapp && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.whatsapp[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="pixKeyType"
          className="block text-sm font-medium text-gray-700"
        >
          Tipo da Chave PIX
        </label>
        <select
          id="pixKeyType"
          name="pixKeyType"
          value={pixKeyType}
          onChange={handlePixKeyTypeChange}
          className={`mt-1 block w-full text-slate-800 rounded-md border ${
            state.errors?.pixKeyType ? "border-red-500" : "border-gray-300"
          } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          required
        >
          <option value="">Selecione um tipo</option>
          {Object.values(PixKeyType).map((type) => (
            <option key={type} value={type}>
              {pixKeyTypeLabels[type]}
            </option>
          ))}
        </select>
        {state.errors?.pixKeyType && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.pixKeyType[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="pixKeyValue"
          className="block text-sm font-medium text-gray-700"
        >
          Chave PIX
        </label>
        {pixKeyType === PixKeyType.EMAIL || pixKeyType === PixKeyType.RANDOM ? (
          <input
            id="pixKeyValue"
            type={pixKeyType === PixKeyType.EMAIL ? "email" : "text"}
            name="pixKeyValue"
            value={pixKeyValue}
            onChange={(e) => setPixKeyValue(e.target.value)}
            className={`mt-1 block w-full text-slate-800 rounded-md border ${
              state.errors?.pixKeyValue ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            required
          />
        ) : pixKeyType ? (
          <PatternFormat
            format={getPixKeyFormat(pixKeyType as PixKeyType)}
            name="pixKeyValue"
            id="pixKeyValue"
            value={pixKeyValue}
            onValueChange={(values) => setPixKeyValue(values.value)}
            className={`mt-1 block w-full text-slate-800 rounded-md border ${
              state.errors?.pixKeyValue ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            required
          />
        ) : (
          <input
            className="mt-1 block w-full text-slate-800 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled
          />
        )}
        {state.errors?.pixKeyValue && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.pixKeyValue[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Concluir
      </button>
    </form>
  );
}
