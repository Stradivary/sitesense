import { cn } from "./../cn";

describe("cn utility", () => {
  it("joins class names correctly", () => {
    const result = cn("bg-red-500", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("merges conflicting Tailwind classes", () => {
    const result = cn("text-sm", "text-lg");
    expect(result).toBe("text-lg");
  });

  it("handles falsy values", () => {
    const result = cn("p-4", false && "p-6", null, undefined, "");
    expect(result).toBe("p-4");
  });

  it("handles conditional class logic", () => {
    const result = cn("block", { hidden: false, "text-center": true });
    expect(result).toBe("block text-center");
  });

  it("returns empty string when no input is provided", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
