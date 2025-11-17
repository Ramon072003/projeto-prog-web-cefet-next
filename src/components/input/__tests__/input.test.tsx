import { render, screen } from "@testing-library/react";
import Input from "@/components/input/input";

describe("Input Component", () => {
  it("should render input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("should render with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("should handle custom className", () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("custom-input");
  });
});
