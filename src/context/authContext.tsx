"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Criar usuário padrão se não existir
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Se não há usuários, criar um usuário de teste
    if (users.length === 0) {
      const defaultUser = {
        id: "default-user-1",
        email: "test@example.com",
        name: "Usuário Teste",
        password: btoa("123456"), // senha: 123456
      };
      users.push(defaultUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  // Verificar se há usuário logado ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    try {
      // Verificar se já existe um usuário com este email
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u: any) => u.email === email);

      if (existingUser) {
        return false; // Email já existe
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password: btoa(password), // Codificação simples (apenas para demo)
      };

      // Salvar no array de usuários
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Fazer login automaticamente
      const userWithoutPassword = { id: newUser.id, email, name };
      setUser(userWithoutPassword);

      return true;
    } catch (error) {
      console.error("Erro ao registrar:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Buscar usuário no localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === btoa(password)
      );

      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        };
        setUser(userWithoutPassword);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
