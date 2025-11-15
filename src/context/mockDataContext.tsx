"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";

type DataFinancialType = {
  type: "income" | "expense";
  value: number;
  date: any;
  description: string;
};

type MockDataContextType = {
  total: number;
  revenue: number;
  expense: number;
  financial: DataFinancialType[];
  setFinancial: React.Dispatch<React.SetStateAction<DataFinancialType[]>>;
};

const defaultData: MockDataContextType = {
  total: 0,
  revenue: 0,
  expense: 0,
  financial: [],
  setFinancial: (_: React.SetStateAction<DataFinancialType[]>) => {},
};

export const MockDataContext = createContext<MockDataContextType>(defaultData);

export function MockDataProvider({ children }: any) {
  const [financial, setFinancial] = useState<DataFinancialType[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    if (!isClient) return;

    try {
      const stored = localStorage.getItem("financial");
      if (stored) {
        const parsed = JSON.parse(stored) as any[];
        setFinancial(parsed.map((f) => ({ ...f, date: new Date(f.date) })));
      }
    } catch (error) {
      console.error("Error loading financial data:", error);
    }
  }, [isClient]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isClient) return;

    try {
      localStorage.setItem("financial", JSON.stringify(financial));
    } catch (error) {
      console.error("Error saving financial data:", error);
    }
  }, [financial, isClient]);

  const revenue = useMemo(
    () =>
      financial
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + Number(item.value), 0),
    [financial]
  );

  const expense = useMemo(
    () =>
      financial
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + Number(item.value), 0),
    [financial]
  );

  const total = revenue - expense;

  return (
    <MockDataContext.Provider
      value={{
        total,
        revenue,
        expense,
        financial,
        setFinancial,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}
