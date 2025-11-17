import "@testing-library/jest-dom";

// Mock localStorage - comentado para usar mocks personalizados nos testes
// Object.defineProperty(window, "localStorage", {
//   value: {
//     getItem: jest.fn(),
//     setItem: jest.fn(),
//     removeItem: jest.fn(),
//     clear: jest.fn(),
//   },
//   writable: true,
// });

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Setup function to clear mocks before each test - comentado para evitar conflito
// beforeEach(() => {
//   window.localStorage.getItem.mockClear();
//   window.localStorage.setItem.mockClear();
//   window.localStorage.removeItem.mockClear();
//   window.localStorage.clear.mockClear();
// });
