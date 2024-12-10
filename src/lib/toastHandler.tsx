"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { toast } from "sonner";

export function ToastHandler() {
  useEffect(() => {
    const success = Cookies.get("onboarding-success");

    if (success) {
      toast.success("Configuração concluída com sucesso!", {
        description: "Bem-vindo ao Kitnex!",
      });

      // Remove o cookie após mostrar o toast
      Cookies.remove("onboarding-success");
    }
  }, []);

  return null;
}
