"use client";

import Button from "@/components/button/button";
import TitleSection from "@/components/title-section/titleSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MockDataContext } from "@/context/mockDataContext";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const convertType = (text: string) => {
  if (text === "income") {
    return "Receita";
  }
  return "Despesa";
};

export default function Home() {
  const { total, financial } = useContext(MockDataContext);

  // Calcular receitas e despesas
  const receitas = financial
    .filter((item) => item.type === "income")
    .reduce((acc, item) => {
      const numericString = String(item.value)
        .replace(/[^\d,]/g, "")
        .replace(",", ".");
      const parsed = parseFloat(numericString) || 0;
      return acc + parsed;
    }, 0);

  const despesas = financial
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      const numericString = String(item.value)
        .replace(/[^\d,]/g, "")
        .replace(",", ".");
      const parsed = parseFloat(numericString) || 0;
      return acc + parsed;
    }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">Visão geral das suas finanças</p>
          </div>
          <Button>
            <a
              href="/new-transaction"
              target="_self"
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              Nova Transação
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-white/90 text-sm font-medium">
                  Saldo Total
                </CardTitle>
                <div className="bg-white/20 p-2 rounded-lg">
                  <DollarSign className="text-white" size={20} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white mb-2">
                {" "}
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <ArrowUpRight size={16} />
              </div>
            </CardContent>
          </Card>

          {/* Receitas */}
          <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-slate-700 text-sm font-medium">
                  Receitas
                </CardTitle>
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <TrendingUp className="text-emerald-600" size={20} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600 mb-2">
                {receitas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-slate-500 text-sm">Total de entradas</p>
            </CardContent>
          </Card>

          {/* Despesas */}
          <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-slate-700 text-sm font-medium">
                  Despesas
                </CardTitle>
                <div className="bg-red-100 p-2 rounded-lg">
                  <TrendingDown className="text-red-600" size={20} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 mb-2">
                {despesas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-slate-500 text-sm">Total de saídas</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Transações */}
        <Card className="bg-white border-0 shadow-xl">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-slate-900 text-xl">
              Últimas Transações
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="py-4 px-6 text-slate-700 font-semibold">
                      Tipo
                    </TableHead>
                    <TableHead className="py-4 px-6 text-slate-700 font-semibold">
                      Valor
                    </TableHead>
                    <TableHead className="py-4 px-6 text-slate-700 font-semibold">
                      Descrição
                    </TableHead>
                    <TableHead className="py-4 px-6 text-slate-700 font-semibold text-right">
                      Data
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financial.map((data, idx) => (
                    <TableRow
                      key={idx}
                      className="hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      <TableCell className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                            data?.type === "income"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {data?.type === "income" ? (
                            <ArrowUpRight size={16} />
                          ) : (
                            <ArrowDownRight size={16} />
                          )}
                          {convertType(data?.type)}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`py-4 px-6 font-semibold ${
                          data?.type === "income"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {data?.value}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-slate-700">
                        {data?.description}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-slate-500 text-right">
                        {data.date instanceof Date
                          ? data.date.toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : data.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
