import { cn } from "@/lib/utils";

describe("Utils", () => {
  it("should merge classes correctly", () => {
    const result = cn("class1", "class2");
    expect(result).toBeTruthy();
  });

  it("should handle conditional classes", () => {
    const result = cn("base", true && "conditional", false && "hidden");
    expect(result).toContain("base");
    expect(result).toContain("conditional");
  });

  it("should handle undefined values", () => {
    const result = cn("base", undefined, null);
    expect(result).toContain("base");
  });
});
