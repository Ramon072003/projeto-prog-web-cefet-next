"use client";

import React, { createContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./authContext";

type DataFinancialType = {
  id: string;
  userId: string;
  type: "income" | "expense";
  value: number;
  date: Date;
  description: string;
  category: string;
};

interface MockDataContextType {
  total: number;
  revenue: number;
  expense: number;
  financial: DataFinancialType[];
  setFinancial: React.Dispatch<React.SetStateAction<DataFinancialType[]>>;
  addTransaction: (
    transaction: Omit<DataFinancialType, "id" | "userId">
  ) => void;
  updateTransaction: (
    id: string,
    transaction: Omit<DataFinancialType, "id" | "userId">
  ) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => DataFinancialType | undefined;
}

const defaultData: MockDataContextType = {
  total: 0,
  revenue: 0,
  expense: 0,
  financial: [],
  setFinancial: () => {},
  addTransaction: () => {},
  updateTransaction: () => {},
  deleteTransaction: () => {},
  getTransactionById: () => undefined,
};

export const MockDataContext = createContext<MockDataContextType>(defaultData);

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [financial, setFinancial] = useState<DataFinancialType[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    if (!isClient || !user) return;

    try {
      const storageKey = `financial_${user.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as DataFinancialType[];
        const migratedData = parsed.map((item, index) => ({
          ...item,
          id: item.id || `migration-${Date.now()}-${index}`,
          userId: user.id,
          date: new Date(item.date),
        }));
        setFinancial(migratedData);
      }
    } catch (error) {
      console.error("Error loading financial data:", error);
    }
  }, [isClient, user]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isClient || !user) return;

    try {
      const storageKey = `financial_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(financial));
    } catch (error) {
      console.error("Error saving financial data:", error);
    }
  }, [financial, isClient, user]);

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

  // Função para gerar um ID único
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Função para adicionar transação
  const addTransaction = (
    transaction: Omit<DataFinancialType, "id" | "userId">
  ) => {
    if (!user) return;

    const newTransaction: DataFinancialType = {
      ...transaction,
      id: generateId(),
      userId: user.id,
    };
    setFinancial((prev) => [...prev, newTransaction]);
  };

  // Função para atualizar transação
  const updateTransaction = (
    id: string,
    updatedTransaction: Omit<DataFinancialType, "id" | "userId">
  ) => {
    if (!user) return;

    setFinancial((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? { ...updatedTransaction, id, userId: user.id }
          : transaction
      )
    );
  };

  // Função para excluir transação
  const deleteTransaction = (id: string) => {
    setFinancial((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  // Função para buscar transação por ID
  const getTransactionById = (id: string): DataFinancialType | undefined => {
    return financial.find((transaction) => transaction.id === id);
  };

  return (
    <MockDataContext.Provider
      value={{
        total,
        revenue,
        expense,
        financial,
        setFinancial,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionById,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}
