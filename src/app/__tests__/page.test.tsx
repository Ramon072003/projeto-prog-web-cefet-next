import { render, screen, fireEvent } from "@testing-library/react";
import { MockDataProvider } from "@/context/mockDataContext";
import { AuthProvider } from "@/context/authContext";
import Home from "@/app/page";
import { useRouter } from "next/navigation";

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock AuthProvider com usuário logado
const MockAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  // Simula usuário logado
  mockLocalStorage.setItem(
    "user",
    JSON.stringify({
      id: "test-user-id",
      name: "Test User",
      email: "test@example.com",
    })
  );

  return (
    <AuthProvider>
      <MockAuthWrapper>{children}</MockAuthWrapper>
    </AuthProvider>
  );
};

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  back: jest.fn(),
};

describe("Home (Dashboard)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should render dashboard with initial values", () => {
    render(
      <MockAuthWrapper>
        <Home />
      </MockAuthWrapper>
    );

    expect(screen.getAllByText("R$ 0,00")).toHaveLength(3); // Saldo Total, Receitas, Despesas
    expect(screen.getByText("Receitas")).toBeInTheDocument();
    expect(screen.getByText("Despesas")).toBeInTheDocument();
    expect(screen.getByText("Últimas Transações")).toBeInTheDocument();
  });

  it("should render transaction table headers", () => {
    render(
      <MockAuthWrapper>
        <Home />
      </MockAuthWrapper>
    );

    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Valor")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Ações")).toBeInTheDocument();
  });

  it("should navigate to edit page when edit button is clicked", () => {
    // Mock localStorage with a transaction
    const mockTransaction = {
      id: "test-id-123",
      type: "income",
      value: 1000,
      date: "2023-12-25",
      description: "Test transaction",
    };

    window.localStorage.getItem.mockReturnValue(
      JSON.stringify([mockTransaction])
    );

    render(
      <MockAuthWrapper>
        <Home />
      </MockAuthWrapper>
    );

    const editButton = screen.getByTitle("Editar transação");
    fireEvent.click(editButton);

    expect(mockPush).toHaveBeenCalledWith("/edit-transaction?id=test-id-123");
  });

  it("should show delete confirmation when delete button is clicked", () => {
    // Mock localStorage with a transaction
    const mockTransaction = {
      id: "test-id-123",
      type: "expense",
      value: 500,
      date: "2023-12-26",
      description: "Test expense",
    };

    window.localStorage.getItem.mockReturnValue(
      JSON.stringify([mockTransaction])
    );

    render(
      <MockAuthWrapper>
        <Home />
      </MockAuthWrapper>
    );

    const deleteButton = screen.getByTitle("Excluir transação");
    fireEvent.click(deleteButton);

    expect(screen.getByText("Sim")).toBeInTheDocument();
    expect(screen.getByText("Não")).toBeInTheDocument();
  });
});
