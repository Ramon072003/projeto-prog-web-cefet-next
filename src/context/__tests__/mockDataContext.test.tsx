import { render, screen, act } from "@testing-library/react";import { render, screen, act } from "@testing-library/react";import { render, screen, act } from "@testing-library/react";

import { MockDataProvider, MockDataContext } from "@/context/mockDataContext";

import { AuthProvider } from "@/context/authContext";import { MockDataProvider, MockDataContext } from "@/context/mockDataContext";import { MockDataProvider, MockDataContext } from "  test("should provide initial state", () => {

import { useContext } from "react";

import { AuthProvider } from "@/context/authContext";    render(

// Mock localStorage

const mockLocalStorage = (() => {import { useContext } from "react";      <MockAuthWrapper>

  let store: Record<string, string> = {};

  return {        <TestComponent />

    getItem: (key: string) => store[key] || null,

    setItem: (key: string, value: string) => { store[key] = value.toString(); },// Mock localStorage      </MockAuthWrapper>

    removeItem: (key: string) => { delete store[key]; },

    clear: () => { store = {}; }const mockLocalStorage = (() => {    );

  };

})();  let store: Record<string, string> = {};



Object.defineProperty(window, 'localStorage', {  return {    expect(screen.getByTestId("revenue")).toHaveTextContent("0");

  value: mockLocalStorage

});    getItem: (key: string) => store[key] || null,    expect(screen.getByTestId("total")).toHaveTextContent("0");



// Mock AuthProvider com usuário logado    setItem: (key: string, value: string) => { store[key] = value.toString(); },    expect(screen.getByTestId("expense")).toHaveTextContent("0");

const MockAuthWrapper = ({ children }: { children: React.ReactNode }) => {

  // Simula usuário logado    removeItem: (key: string) => { delete store[key]; },    expect(screen.getByTestId("transactions-count")).toHaveTextContent("0");

  mockLocalStorage.setItem('user', JSON.stringify({ 

    id: 'test-user-id',     clear: () => { store = {}; }  });ckDataContext";

    name: 'Test User', 

    email: 'test@example.com'   };import { AuthProvider } from "@/context/authContext";

  }));

  })();import { useContext } from "react";

  return (

    <AuthProvider>

      <MockDataProvider>

        {children}Object.defineProperty(window, 'localStorage', {// Mock localStorage

      </MockDataProvider>

    </AuthProvider>  value: mockLocalStorageconst mockLocalStorage = (() => {

  );

};});  let store: Record<string, string> = {};



// Componente de teste para acessar o contexto  return {

const TestComponent = () => {

  const context = useContext(MockDataContext);// Mock AuthProvider com usuário logado    getItem: (key: string) => store[key] || null,



  return (const MockAuthWrapper = ({ children }: { children: React.ReactNode }) => {    setItem: (key: string, value: string) => { store[key] = value.toString(); },

    <div>

      <div data-testid="total">{context.total}</div>  // Simula usuário logado    removeItem: (key: string) => { delete store[key]; },

      <div data-testid="revenue">{context.revenue}</div>

      <div data-testid="expense">{context.expense}</div>  mockLocalStorage.setItem('user', JSON.stringify({     clear: () => { store = {}; }

      <div data-testid="transactions-count">{context.financial.length}</div>

      <button    id: 'test-user-id',   };

        data-testid="add-income"

        onClick={() =>    name: 'Test User', })();

          context.addTransaction({

            type: "income",    email: 'test@example.com' 

            value: 1000,

            date: new Date("2023-01-01"),  }));Object.defineProperty(window, 'localStorage', {

            description: "Salário",

            category: "Work"    value: mockLocalStorage

          })

        }  return (});

      >

        Add Income    <AuthProvider>

      </button>

      <button      <MockDataProvider>// Mock AuthProvider com usuário logado

        data-testid="add-expense"

        onClick={() =>        {children}const MockAuthWrapper = ({ children }: { children: React.ReactNode }) => {

          context.addTransaction({

            type: "expense",      </MockDataProvider>  // Simula usuário logado

            value: 500,

            date: new Date("2023-01-02"),    </AuthProvider>  mockLocalStorage.setItem('user', JSON.stringify({ 

            description: "Compras",

            category: "Shopping"  );    id: 'test-user-id', 

          })

        }};    name: 'Test User', 

      >

        Add Expense    email: 'test@example.com' 

      </button>

      <button// Componente de teste para acessar o contexto  }));

        data-testid="delete-first"

        onClick={() => {const TestComponent = () => {  

          if (context.financial.length > 0) {

            context.deleteTransaction(context.financial[0].id);  const context = useContext(MockDataContext);  return (

          }

        }}    <AuthProvider>

      >

        Delete First  return (      <MockDataProvider>

      </button>

      <button    <div>        {children}

        data-testid="update-first"

        onClick={() => {      <div data-testid="total">{context.total}</div>      </MockDataProvider>

          if (context.financial.length > 0) {

            const transaction = context.financial[0];      <div data-testid="revenue">{context.revenue}</div>    </AuthProvider>

            context.updateTransaction(transaction.id, {

              type: transaction.type,      <div data-testid="expense">{context.expense}</div>  );

              value: transaction.value + 100,

              date: transaction.date,      <div data-testid="transactions-count">{context.financial.length}</div>};

              description: transaction.description + " - Updated",

              category: transaction.category      <button

            });

          }        data-testid="add-income"// Componente de teste para acessar o contexto

        }}

      >        onClick={() =>const TestComponent = () => {

        Update First

      </button>          context.addTransaction({  const context = useContext(MockDataContext);

      {context.financial.map((transaction) => (

        <div key={transaction.id}>            type: "income",

          <span data-testid={`description-${transaction.id}`}>

            {transaction.description}            value: 1000,  return (

          </span>

          <span data-testid={`value-${transaction.id}`}>{transaction.value}</span>            date: new Date("2023-01-01"),    <div>

        </div>

      ))}            description: "Salário",      <div data-testid="total">{context.total}</div>

    </div>

  );            category: "Work"      <div data-testid="revenue">{context.revenue}</div>

};

          })      <div data-testid="expense">{context.expense}</div>

describe("MockDataContext", () => {

  beforeEach(() => {        }      <div data-testid="transactions-count">{context.financial.length}</div>

    mockLocalStorage.clear();

  });      >      <button



  test("should provide initial state", () => {        Add Income        data-testid="add-income"

    render(

      <MockAuthWrapper>      </button>        onClick={() =>

        <TestComponent />

      </MockAuthWrapper>      <button          context.addTransaction({

    );

        data-testid="add-expense"            type: "income",

    expect(screen.getByTestId("revenue").textContent).toBe("0");

    expect(screen.getByTestId("total").textContent).toBe("0");        onClick={() =>            value: 1000,

    expect(screen.getByTestId("expense").textContent).toBe("0");

    expect(screen.getByTestId("transactions-count").textContent).toBe("0");          context.addTransaction({            date: new Date("2023-01-01"),

  });

            type: "expense",            description: "Salário",

  test("should add income transaction and update totals", () => {

    render(            value: 500,          })

      <MockAuthWrapper>

        <TestComponent />            date: new Date("2023-01-02"),        }

      </MockAuthWrapper>

    );            description: "Compras",      >



    act(() => {            category: "Shopping"        Add Income

      screen.getByTestId("add-income").click();

    });          })      </button>



    expect(screen.getByTestId("transactions-count").textContent).toBe("1");        }      <button

    expect(screen.getByTestId("revenue").textContent).toBe("1000");

    expect(screen.getByTestId("total").textContent).toBe("1000");      >        data-testid="add-expense"

  });

        Add Expense        onClick={() =>

  test("should add expense transaction and update totals", () => {

    render(      </button>          context.addTransaction({

      <MockAuthWrapper>

        <TestComponent />      <button            type: "expense",

      </MockAuthWrapper>

    );        data-testid="delete-first"            value: 500,



    act(() => {        onClick={() => {            date: new Date("2023-01-02"),

      screen.getByTestId("add-expense").click();

    });          if (context.financial.length > 0) {            description: "Compras",



    expect(screen.getByTestId("transactions-count").textContent).toBe("1");            context.deleteTransaction(context.financial[0].id);          })

    expect(screen.getByTestId("expense").textContent).toBe("500");

    expect(screen.getByTestId("total").textContent).toBe("-500");          }        }

  });

        }}      >

  test("should calculate correct total with income and expense", () => {

    render(      >        Add Expense

      <MockAuthWrapper>

        <TestComponent />        Delete First      </button>

      </MockAuthWrapper>

    );      </button>      {context.financial.map((transaction) => (



    act(() => {      <button        <div key={transaction.id} data-testid={`transaction-${transaction.id}`}>

      screen.getByTestId("add-income").click();

      screen.getByTestId("add-expense").click();        data-testid="update-first"          <span data-testid={`type-${transaction.id}`}>{transaction.type}</span>

    });

        onClick={() => {          <span data-testid={`value-${transaction.id}`}>

    expect(screen.getByTestId("revenue").textContent).toBe("1000");

    expect(screen.getByTestId("expense").textContent).toBe("500");          if (context.financial.length > 0) {            {transaction.value}

    expect(screen.getByTestId("total").textContent).toBe("500");

  });            const transaction = context.financial[0];          </span>



  test("should delete transaction", () => {            context.updateTransaction(transaction.id, {          <span data-testid={`description-${transaction.id}`}>

    render(

      <MockAuthWrapper>              type: transaction.type,            {transaction.description}

        <TestComponent />

      </MockAuthWrapper>              value: transaction.value + 100,          </span>

    );

              date: transaction.date,          <button

    act(() => {

      screen.getByTestId("add-income").click();              description: transaction.description + " - Updated",            data-testid={`delete-${transaction.id}`}

    });

              category: transaction.category            onClick={() => context.deleteTransaction(transaction.id)}

    expect(screen.getByTestId("transactions-count").textContent).toBe("1");

            });          >

    act(() => {

      screen.getByTestId("delete-first").click();          }            Delete

    });

        }}          </button>

    expect(screen.getByTestId("transactions-count").textContent).toBe("0");

    expect(screen.getByTestId("revenue").textContent).toBe("0");      >          <button

    expect(screen.getByTestId("total").textContent).toBe("0");

  });        Update First            data-testid={`update-${transaction.id}`}



  test("should update transaction", () => {      </button>            onClick={() =>

    render(

      <MockAuthWrapper>      {context.financial.map((transaction) => (              context.updateTransaction(transaction.id, {

        <TestComponent />

      </MockAuthWrapper>        <div key={transaction.id}>                type: transaction.type,

    );

          <span data-testid={`description-${transaction.id}`}>                value: transaction.value + 100,

    act(() => {

      screen.getByTestId("add-income").click();            {transaction.description}                date: transaction.date,

    });

              </span>                description: transaction.description + " - Updated",

    act(() => {

      screen.getByTestId("update-first").click();          <span data-testid={`value-${transaction.id}`}>{transaction.value}</span>              })

    });

        </div>            }

    const descriptionElement = screen.getByText("Salário - Updated");

    expect(descriptionElement).toBeInTheDocument();      ))}          >



    const valueElement = screen.getByText("1100");    </div>            Update

    expect(valueElement).toBeInTheDocument();

  );          </button>

    expect(screen.getByTestId("revenue").textContent).toBe("1100");

    expect(screen.getByTestId("total").textContent).toBe("1100");};        </div>

  });

      ))}

  test("should persist transactions in localStorage", async () => {

    render(describe("MockDataContext", () => {    </div>

      <MockAuthWrapper>

        <TestComponent />  beforeEach(() => {  );

      </MockAuthWrapper>

    );    mockLocalStorage.clear();};



    act(() => {  });

      screen.getByTestId("add-income").click();

    });describe("MockDataContext", () => {



    const storedData = mockLocalStorage.getItem("financial_test-user-id");  test("should provide initial state", () => {  beforeEach(() => {

    expect(storedData).toBeTruthy();

        render(    localStorage.clear();

    if (storedData) {

      const parsed = JSON.parse(storedData);      <MockAuthWrapper>  });

      expect(parsed).toHaveLength(1);

      expect(parsed[0].description).toBe("Salário");        <TestComponent />

    }

  });      </MockAuthWrapper>  it("should provide initial state", () => {



  test("should load transactions from localStorage", () => {    );    render(

    const mockData = [

      {      <MockDataProvider>

        id: "test-id",

        userId: "test-user-id",    expect(screen.getByTestId("revenue").textContent).toBe("0");        <TestComponent />

        type: "income",

        value: 1000,    expect(screen.getByTestId("total").textContent).toBe("0");      </MockDataProvider>

        description: "Test Income",

        category: "Test Category",    expect(screen.getByTestId("expense").textContent).toBe("0");    );

        date: new Date("2023-01-01").toISOString()

      }    expect(screen.getByTestId("transactions-count").textContent).toBe("0");

    ];

  });    expect(screen.getByTestId("total")).toHaveTextContent("0");

    mockLocalStorage.setItem("financial_test-user-id", JSON.stringify(mockData));

    expect(screen.getByTestId("revenue")).toHaveTextContent("0");

    render(

      <MockAuthWrapper>  test("should add income transaction and update totals", () => {    expect(screen.getByTestId("expense")).toHaveTextContent("0");

        <TestComponent />

      </MockAuthWrapper>    render(    expect(screen.getByTestId("transactions-count")).toHaveTextContent("0");

    );

      <MockAuthWrapper>  });

    expect(screen.getByTestId("transactions-count").textContent).toBe("1");

  });        <TestComponent />

});
      </MockAuthWrapper>  it("should add income transaction and update totals", async () => {

    );    render(

      <MockDataProvider>

    act(() => {        <TestComponent />

      screen.getByTestId("add-income").click();      </MockDataProvider>

    });    );



    expect(screen.getByTestId("transactions-count").textContent).toBe("1");    act(() => {

    expect(screen.getByTestId("revenue").textContent).toBe("1000");      screen.getByTestId("add-income").click();

    expect(screen.getByTestId("total").textContent).toBe("1000");    });

  });

    expect(screen.getByTestId("transactions-count")).toHaveTextContent("1");

  test("should add expense transaction and update totals", () => {    expect(screen.getByTestId("revenue")).toHaveTextContent("1000");

    render(    expect(screen.getByTestId("total")).toHaveTextContent("1000");

      <MockAuthWrapper>  });

        <TestComponent />

      </MockAuthWrapper>  it("should add expense transaction and update totals", async () => {

    );    render(

      <MockDataProvider>

    act(() => {        <TestComponent />

      screen.getByTestId("add-expense").click();      </MockDataProvider>

    });    );



    expect(screen.getByTestId("transactions-count").textContent).toBe("1");    act(() => {

    expect(screen.getByTestId("expense").textContent).toBe("500");      screen.getByTestId("add-expense").click();

    expect(screen.getByTestId("total").textContent).toBe("-500");    });

  });

    expect(screen.getByTestId("transactions-count")).toHaveTextContent("1");

  test("should calculate correct total with income and expense", () => {    expect(screen.getByTestId("expense")).toHaveTextContent("500");

    render(    expect(screen.getByTestId("total")).toHaveTextContent("-500");

      <MockAuthWrapper>  });

        <TestComponent />

      </MockAuthWrapper>  it("should calculate correct total with income and expense", async () => {

    );    render(

      <MockDataProvider>

    act(() => {        <TestComponent />

      screen.getByTestId("add-income").click();      </MockDataProvider>

      screen.getByTestId("add-expense").click();    );

    });

    act(() => {

    expect(screen.getByTestId("revenue").textContent).toBe("1000");      screen.getByTestId("add-income").click();

    expect(screen.getByTestId("expense").textContent).toBe("500");      screen.getByTestId("add-expense").click();

    expect(screen.getByTestId("total").textContent).toBe("500");    });

  });

    expect(screen.getByTestId("revenue")).toHaveTextContent("1000");

  test("should delete transaction", () => {    expect(screen.getByTestId("expense")).toHaveTextContent("500");

    render(    expect(screen.getByTestId("total")).toHaveTextContent("500");

      <MockAuthWrapper>  });

        <TestComponent />

      </MockAuthWrapper>  it("should delete transaction", async () => {

    );    render(

      <MockDataProvider>

    act(() => {        <TestComponent />

      screen.getByTestId("add-income").click();      </MockDataProvider>

    });    );



    expect(screen.getByTestId("transactions-count").textContent).toBe("1");    // Add a transaction first

    act(() => {

    act(() => {      screen.getByTestId("add-income").click();

      screen.getByTestId("delete-first").click();    });

    });

    expect(screen.getByTestId("transactions-count")).toHaveTextContent("1");

    expect(screen.getByTestId("transactions-count").textContent).toBe("0");

    expect(screen.getByTestId("revenue").textContent).toBe("0");    // Find the transaction and delete it

    expect(screen.getByTestId("total").textContent).toBe("0");    const deleteButton = screen.getByTestId(/^delete-/);

  });    act(() => {

      deleteButton.click();

  test("should update transaction", () => {    });

    render(

      <MockAuthWrapper>    expect(screen.getByTestId("transactions-count")).toHaveTextContent("0");

        <TestComponent />    expect(screen.getByTestId("revenue")).toHaveTextContent("0");

      </MockAuthWrapper>    expect(screen.getByTestId("total")).toHaveTextContent("0");

    );  });



    act(() => {  it("should update transaction", async () => {

      screen.getByTestId("add-income").click();    render(

    });      <MockDataProvider>

            <TestComponent />

    act(() => {      </MockDataProvider>

      screen.getByTestId("update-first").click();    );

    });

    // Add a transaction first

    // Aguarde o componente atualizar    act(() => {

    const descriptionElement = screen.getByText("Salário - Updated");      screen.getByTestId("add-income").click();

    expect(descriptionElement).toBeInTheDocument();    });



    const valueElement = screen.getByText("1100");    // Find the transaction and update it

    expect(valueElement).toBeInTheDocument();    const updateButton = screen.getByTestId(/^update-/);

    act(() => {

    expect(screen.getByTestId("revenue").textContent).toBe("1100");      updateButton.click();

    expect(screen.getByTestId("total").textContent).toBe("1100");    });

  });

    // Check if description was updated

  test("should persist transactions in localStorage", async () => {    const descriptionElement = screen.getByTestId(/^description-/);

    render(    expect(descriptionElement).toHaveTextContent("Salário - Updated");

      <MockAuthWrapper>

        <TestComponent />    // Check if value was updated

      </MockAuthWrapper>    const valueElement = screen.getByTestId(/^value-/);

    );    expect(valueElement).toHaveTextContent("1100");



    act(() => {    // Check if totals were recalculated

      screen.getByTestId("add-income").click();    expect(screen.getByTestId("revenue")).toHaveTextContent("1100");

    });    expect(screen.getByTestId("total")).toHaveTextContent("1100");

  });

    // Simular localStorage já ter dados e verificar se carrega

    const storedData = mockLocalStorage.getItem("financial_test-user-id");  it("should persist transactions in localStorage", async () => {

    expect(storedData).toBeTruthy();    render(

          <MockDataProvider>

    if (storedData) {        <TestComponent />

      const parsed = JSON.parse(storedData);      </MockDataProvider>

      expect(parsed).toHaveLength(1);    );

      expect(parsed[0].description).toBe("Salário");

    }    act(() => {

  });      screen.getByTestId("add-income").click();

    });

  test("should load transactions from localStorage", () => {

    const mockData = [    // Verify localStorage was called

      {    expect(localStorage.setItem).toHaveBeenCalled();

        id: "test-id",  });

        userId: "test-user-id",

        type: "income",  it("should load transactions from localStorage", async () => {

        value: 1000,    // Mock localStorage with existing data

        description: "Test Income",    const mockData = [

        category: "Test Category",      {

        date: new Date("2023-01-01").toISOString()        id: "test-id",

      }        type: "income",

    ];        value: 2000,

        date: "2023-01-01T00:00:00.000Z",

    mockLocalStorage.setItem("financial_test-user-id", JSON.stringify(mockData));        description: "Test Transaction",

      },

    render(    ];

      <MockAuthWrapper>

        <TestComponent />    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));

      </MockAuthWrapper>

    );    render(

      <MockDataProvider>

    expect(screen.getByTestId("transactions-count").textContent).toBe("1");        <TestComponent />

  });      </MockDataProvider>

});    );

    expect(screen.getByTestId("transactions-count")).toHaveTextContent("1");
    expect(screen.getByTestId("revenue")).toHaveTextContent("2000");
  });
});
