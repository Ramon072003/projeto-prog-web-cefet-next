"use client";

import { useState } from "react";
import Button from "@/components/button/button";
import Input from "@/components/input/input";

interface TransactionFormData {
  type: "income" | "expense" | "";
  value: string;
  date: string;
  description: string;
}

export default function TransactionForm() {
  const [formData, setFormData] = useState<TransactionFormData>({
    type: "",
    value: "",
    date: "",
    description: "",
  });

  const handleTypeChange = (type: "income" | "expense") => {
    setFormData((prev) => ({
      ...prev,
      type: prev.type === type ? "" : type,
    }));
  };

  const handleInputChange = (
    field: keyof TransactionFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // Aqui você pode adicionar a lógica para salvar a transação
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <fieldset className="p-8 border border-gray-300 rounded-lg">
        <legend className="px-4 text-lg font-bold text-black">
          📝 Dados da Transação
        </legend>

        <div className="flex flex-col gap-6 mt-6">
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.type === "income"}
                onChange={() => handleTypeChange("income")}
                className="w-4 h-4"
              />
              <span className="font-medium text-black">Receita</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.type === "expense"}
                onChange={() => handleTypeChange("expense")}
                className="w-4 h-4"
              />
              <span className="font-medium text-black">Despesa</span>
            </label>
          </div>

          {/* Seção Valor e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Valor</label>
              <input
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className="w-full h-12 text-black px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0,00"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full text-black h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Seção Descrição */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">DESCRIÇÃO</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full text-black h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva a transação"
            />
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-center items-center mt-4">
            <Button>Salvar Transação</Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
