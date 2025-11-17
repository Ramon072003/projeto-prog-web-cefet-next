"use client";

import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import Sidebar, { PagesTypeSidebar } from "@/components/sidebar";
import { MdOutlineDashboard } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { LogOut, User } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const pages: PagesTypeSidebar[] = [
  {
    label: "Dashboard",
    icon: <MdOutlineDashboard />,
    link: "/",
  },
  {
    label: "Nova Transação",
    icon: <FaMoneyBills />,
    link: "/new-transaction",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Não aplicar o layout em páginas públicas
  if (pathname === "/login" || pathname === "/register") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-row w-full min-h-screen">
        <Sidebar pages={pages} />
        <div className="flex-1 min-h-screen bg-[#f9fafb]">
          {/* Header com informações do usuário */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Sistema Financeiro
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>Olá, {user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            </div>
          </div>
          {/* Conteúdo principal */}
          <div className="p-8">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
