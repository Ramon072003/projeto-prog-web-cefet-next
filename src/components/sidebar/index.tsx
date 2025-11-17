"use client";

import { FaMoneyBills } from "react-icons/fa6";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export type PagesTypeSidebar = {
  label: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SidebarProps = {
  pages: PagesTypeSidebar[];
};

export default function Sidebar({ pages }: SidebarProps) {
  // Detectar página ativa (você pode adaptar isso conforme sua lógica de roteamento)
  const currentPath = usePathname();

  return (
    <aside className="w-[20vw] min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 shadow-2xl">
      {/* Logo/Brand */}
      <div className="p-8 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
            <FaMoneyBills className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">FinanceApp</h1>
            <p className="text-slate-400 text-xs">Gerenciamento Financeiro</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <ul className="flex flex-col gap-2">
          {pages.map((page: PagesTypeSidebar) => {
            const isActive = currentPath === page.link;

            return (
              <li key={page.link}>
                <a
                  href={page.link}
                  className={`
                    group flex items-center justify-between gap-4 p-4 rounded-xl
                    transition-all duration-300 cursor-pointer
                    ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      flex items-center justify-center text-2xl transition-transform duration-300
                      ${isActive ? "scale-110" : "group-hover:scale-110"}
                    `}
                    >
                      <page.icon />
                    </div>
                    <span className="font-medium text-base">{page.label}</span>
                  </div>

                  <ChevronRight
                    size={18}
                    className={`
                      transition-all duration-300
                      ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }
                    `}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
