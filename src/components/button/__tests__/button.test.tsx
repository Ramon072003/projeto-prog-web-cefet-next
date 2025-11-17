import { render, screen } from "@testing-library/react";
import Button from "@/components/button/button";

describe("Button Component", () => {
  it("should render button with children", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("should render with custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });

  it("should handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
