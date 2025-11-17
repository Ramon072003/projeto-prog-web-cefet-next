"use client";

import { useContext, useState } from "react";
import { MockDataContext } from "@/context/mockDataContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  FileText,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface TransactionFormData {
  type: "income" | "expense" | "";
  value: string;
  date: string;
  description: string;
}

export default function TransactionForm() {
  const { addTransaction } = useContext(MockDataContext);
  const router = useRouter();

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

    if (formData.type === "") {
      console.warn("Selecione o tipo de transação antes de salvar.");
      return;
    }

    console.log("Dados do formulário:", formData);

    addTransaction({
      type: formData.type,
      value: parseFloat(formData.value),
      date: new Date(formData.date),
      description: formData.description,
      category: formData.type === "income" ? "Receita" : "Despesa",
    });

    setFormData({
      type: "",
      value: "",
      date: "",
      description: "",
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Nova Transação
          </h1>
          <p className="text-slate-600">Adicione uma receita ou despesa</p>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            {/* Tipo de Transação */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                Tipo de Transação
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Receita */}
                <button
                  type="button"
                  onClick={() => handleTypeChange("income")}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all duration-300
                    ${
                      formData.type === "income"
                        ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/20"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`
                      p-3 rounded-full transition-colors
                      ${
                        formData.type === "income"
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }
                    `}
                    >
                      <TrendingUp
                        size={24}
                        className={
                          formData.type === "income"
                            ? "text-white"
                            : "text-slate-600"
                        }
                      />
                    </div>
                    <span
                      className={`
                      font-semibold text-lg
                      ${
                        formData.type === "income"
                          ? "text-emerald-700"
                          : "text-slate-700"
                      }
                    `}
                    >
                      Receita
                    </span>
                  </div>
                  {formData.type === "income" && (
                    <div className="absolute top-3 right-3 bg-emerald-500 rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </button>

                {/* Despesa */}
                <button
                  type="button"
                  onClick={() => handleTypeChange("expense")}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all duration-300
                    ${
                      formData.type === "expense"
                        ? "border-red-500 bg-red-50 shadow-lg shadow-red-500/20"
                        : "border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/50"
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`
                      p-3 rounded-full transition-colors
                      ${
                        formData.type === "expense"
                          ? "bg-red-500"
                          : "bg-slate-200"
                      }
                    `}
                    >
                      <TrendingDown
                        size={24}
                        className={
                          formData.type === "expense"
                            ? "text-white"
                            : "text-slate-600"
                        }
                      />
                    </div>
                    <span
                      className={`
                      font-semibold text-lg
                      ${
                        formData.type === "expense"
                          ? "text-red-700"
                          : "text-slate-700"
                      }
                    `}
                    >
                      Despesa
                    </span>
                  </div>
                  {formData.type === "expense" && (
                    <div className="absolute top-3 right-3 bg-red-500 rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Valor e Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Valor */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <DollarSign size={16} />
                  Valor
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                    className="w-full h-14 pl-12 pr-4 text-slate-900 text-lg font-medium border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="0,00"
                  />
                </div>
              </div>

              {/* Data */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar size={16} />
                  Data
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full h-14 px-4 text-slate-900 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-2 mb-8">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText size={16} />
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full h-32 px-4 py-3 text-slate-900 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                placeholder="Descreva a transação..."
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    type: "",
                    value: "",
                    date: "",
                    description: "",
                  })
                }
                className="flex-1 h-14 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Salvar Transação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
