/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RenterFormData } from "@/types/forms";
import { createContext, useContext, useState } from "react";

interface RentalFormData {
  renter?: RenterFormData;
  property?: any; // Será tipado posteriormente
  contract?: any; // Será tipado posteriormente
}

interface RentalFormContextType {
  formData: RentalFormData;
  setRenterData: (data: RenterFormData) => void;
  setPropertyData: (data: any) => void;
  setContractData: (data: any) => void;
  clearForm: () => void;
}

const RentalFormContext = createContext<RentalFormContextType | undefined>(
  undefined
);

export function RentalFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<RentalFormData>({});

  const setRenterData = (data: RenterFormData) => {
    setFormData((prev) => ({ ...prev, renter: data }));
  };

  const setPropertyData = (data: any) => {
    setFormData((prev) => ({ ...prev, property: data }));
  };

  const setContractData = (data: any) => {
    setFormData((prev) => ({ ...prev, contract: data }));
  };

  const clearForm = () => {
    setFormData({});
  };

  return (
    <RentalFormContext.Provider
      value={{
        formData,
        setRenterData,
        setPropertyData,
        setContractData,
        clearForm,
      }}
    >
      {children}
    </RentalFormContext.Provider>
  );
}

export function useRentalForm() {
  const context = useContext(RentalFormContext);
  if (undefined === context) {
    throw new Error("useRentalForm must be used within a RentalFormProvider");
  }
  return context;
}