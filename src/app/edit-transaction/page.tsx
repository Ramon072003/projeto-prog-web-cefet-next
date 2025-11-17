"use client";

import { useContext, useState, useEffect, Suspense } from "react";
import Button from "@/components/button/button";
import { MockDataContext } from "@/context/mockDataContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  FileText,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface TransactionFormData {
  type: "income" | "expense" | "";
  value: string;
  date: string;
  description: string;
}

function EditTransactionContent() {
  const { getTransactionById, updateTransaction } = useContext(MockDataContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");

  const [formData, setFormData] = useState<TransactionFormData>({
    type: "",
    value: "",
    date: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (transactionId) {
      const transaction = getTransactionById(transactionId);
      if (transaction) {
        setFormData({
          type: transaction.type,
          value: transaction.value.toString(),
          date:
            transaction.date instanceof Date
              ? transaction.date.toISOString().split("T")[0]
              : new Date(transaction.date).toISOString().split("T")[0],
          description: transaction.description,
        });
      }
      setIsLoading(false);
    } else {
      router.push("/");
    }
  }, [transactionId, getTransactionById, router]);

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
      alert("Selecione o tipo de transação antes de salvar.");
      return;
    }

    if (!transactionId) {
      alert("ID da transação não encontrado.");
      return;
    }

    updateTransaction(transactionId, {
      type: formData.type,
      value: parseFloat(formData.value),
      date: new Date(formData.date),
      description: formData.description,
      category: formData.type === "income" ? "Receita" : "Despesa",
    });

    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Editar Transação
            </h1>
            <p className="text-slate-600">Modifique os dados da transação</p>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <form onSubmit={handleSubmit}>
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
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }
                      `}
                      >
                        <TrendingUp size={24} />
                      </div>
                      <span className="font-semibold text-slate-700">
                        Receita
                      </span>
                      <span className="text-sm text-slate-500 text-center">
                        Dinheiro que entra
                      </span>
                    </div>
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
                            ? "bg-red-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }
                      `}
                      >
                        <TrendingDown size={24} />
                      </div>
                      <span className="font-semibold text-slate-700">
                        Despesa
                      </span>
                      <span className="text-sm text-slate-500 text-center">
                        Dinheiro que sai
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Valor */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <DollarSign className="inline mr-2" size={16} />
                  Valor
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  className="w-full px-4 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0,00"
                  required
                />
              </div>

              {/* Data */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <Calendar className="inline mr-2" size={16} />
                  Data
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-4 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Descrição */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <FileText className="inline mr-2" size={16} />
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-4 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Descreva sua transação..."
                  rows={3}
                  required
                />
              </div>

              {/* Botão de Salvar */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Salvar Alterações
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function EditTransaction() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EditTransactionContent />
    </Suspense>
  );
}
