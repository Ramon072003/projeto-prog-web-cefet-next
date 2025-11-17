import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider } from "@/context/authContext";
import TransactionForm from "@/components/transaction-form";
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

describe("TransactionForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should render form elements correctly", () => {
    render(
      <MockAuthWrapper>
        <TransactionForm />
      </MockAuthWrapper>
    );

    expect(screen.getByText("Nova Transação")).toBeInTheDocument();
    expect(screen.getByText("Tipo de Transação")).toBeInTheDocument();
    expect(screen.getByText("Receita")).toBeInTheDocument();
    expect(screen.getByText("Despesa")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0,00")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Descreva sua transação...")
    ).toBeInTheDocument();
  });

  it("should select income type", () => {
    render(
      <MockAuthWrapper>
        <TransactionForm />
      </MockAuthWrapper>
    );

    const incomeButton = screen.getByText("Receita").closest("button");
    fireEvent.click(incomeButton!);

    expect(incomeButton).toHaveClass("border-emerald-500");
  });

  it("should select expense type", () => {
    render(
      <MockAuthWrapper>
        <TransactionForm />
      </MockAuthWrapper>
    );

    const expenseButton = screen.getByText("Despesa").closest("button");
    fireEvent.click(expenseButton!);

    expect(expenseButton).toHaveClass("border-red-500");
  });

  it("should fill form and submit successfully", async () => {
    render(
      <MockAuthWrapper>
        <TransactionForm />
      </MockAuthWrapper>
    );

    // Select income type
    const incomeButton = screen.getByText("Receita").closest("button");
    fireEvent.click(incomeButton!);

    // Fill value
    const valueInput = screen.getByPlaceholderText("0,00");
    fireEvent.change(valueInput, { target: { value: "1000" } });

    // Fill date
    const dateInput = screen.getByDisplayValue(""); // Date input
    fireEvent.change(dateInput, { target: { value: "2023-12-25" } });

    // Fill description
    const descriptionInput = screen.getByPlaceholderText(
      "Descreva sua transação..."
    );
    fireEvent.change(descriptionInput, {
      target: { value: "Salário de dezembro" },
    });

    // Submit form
    const submitButton = screen.getByText("Salvar Transação");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("should not submit without selecting transaction type", () => {
    // Mock console.warn to avoid log output during tests
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

    render(
      <MockAuthWrapper>
        <TransactionForm />
      </MockAuthWrapper>
    );

    // Fill other fields but don't select type
    const valueInput = screen.getByPlaceholderText("0,00");
    fireEvent.change(valueInput, { target: { value: "1000" } });

    const submitButton = screen.getByText("Salvar Transação");
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Selecione o tipo de transação antes de salvar."
    );
    expect(mockPush).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should toggle transaction type", () => {
    render(
      <MockAuthWrapper>
        <TransactionForm />
      </MockAuthWrapper>
    );

    const incomeButton = screen.getByText("Receita").closest("button");
    const expenseButton = screen.getByText("Despesa").closest("button");

    // Select income
    fireEvent.click(incomeButton!);
    expect(incomeButton).toHaveClass("border-emerald-500");

    // Select expense (should deselect income)
    fireEvent.click(expenseButton!);
    expect(expenseButton).toHaveClass("border-red-500");
    expect(incomeButton).not.toHaveClass("border-emerald-500");

    // Click expense again (should deselect)
    fireEvent.click(expenseButton!);
    expect(expenseButton).not.toHaveClass("border-red-500");
  });
});
