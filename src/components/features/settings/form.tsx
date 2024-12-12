"use client";

import { updateSettingsAction } from "@/app/actions/updateUserSettings";
import { PixKeyType } from "@/types/enums";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

interface SettingsFormProps {
  userId: string;
  initialSettings: {
    notifyByEmail: boolean;
    notifyByWhatsapp: boolean;
    pixKeyType: PixKeyType | null;
    pixKeyValue: string | null;
  };
}

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

export function SettingsForm({ userId, initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateSettingsAction(userId, settings);
      toast.success("Configurações atualizadas com sucesso!");
    } catch {
      toast.error("Erro ao atualizar configurações");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* Notificações */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notificações para inquilinos
        </h3>
        <div className="space-y-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={settings.notifyByEmail}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  notifyByEmail: e.target.checked,
                }))
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 block">
                E-mail
              </span>
              <span className="text-sm text-gray-500">
                Envie notificações por e-mail de solicitação de pagamentos e
                atualizações para seus inquilinos
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={settings.notifyByWhatsapp}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  notifyByWhatsapp: e.target.checked,
                }))
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 block">
                WhatsApp
              </span>
              <span className="text-sm text-gray-500">
                Envie notificações por Whatsapp de solicitação de pagamentos e
                atualizações para seus inquilinos
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Chave PIX */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Chave PIX para Recebimentos
        </h3>
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="pixKeyType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo da Chave PIX
            </label>
            <select
              id="pixKeyType"
              value={settings.pixKeyType || ""}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  pixKeyType: e.target.value as PixKeyType,
                  pixKeyValue: "", // Limpa o valor quando muda o tipo
                }))
              }
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione um tipo</option>
              {Object.values(PixKeyType).map((type) => (
                <option key={type} value={type}>
                  {pixKeyTypeLabels[type]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="pixKeyValue"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Chave PIX
            </label>
            {settings.pixKeyType === PixKeyType.EMAIL ||
            settings.pixKeyType === PixKeyType.RANDOM ? (
              <input
                type={
                  settings.pixKeyType === PixKeyType.EMAIL ? "email" : "text"
                }
                value={settings.pixKeyValue || ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    pixKeyValue: e.target.value,
                  }))
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : settings.pixKeyType ? (
              <PatternFormat
                format={getPixKeyFormat(settings.pixKeyType)}
                value={settings.pixKeyValue || ""}
                onValueChange={(values) =>
                  setSettings((s) => ({
                    ...s,
                    pixKeyValue: values.formattedValue,
                  }))
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <input
                disabled
                placeholder="Selecione um tipo de chave primeiro"
                className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500"
              />
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}
