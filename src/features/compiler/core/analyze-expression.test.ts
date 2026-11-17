import { describe, expect, it } from "vitest";

import { analyzeExpression } from "@/features/compiler/core/analyze-expression";

describe("analyzeExpression", () => {
  it("runs the complete compiler pipeline", () => {
    const result = analyzeExpression("A = sqrt(B - (C - D) ^ E) - 10");

    expect(result.tokens).toHaveLength(16);
    expect(result.transformedExpression).toContain("id1 =");
    expect(result.syntaxTree.name).toBe("=");
    expect(result.threeAddressCode).toEqual([
      "t1 = id3 - id4",
      "t2 = t1 ^ id5",
      "t3 = id2 - t2",
      "t4 = t3 ^ 0.5",
      "t5 = t4 - 10.0",
      "id1 = t5",
    ]);
  });

  it("respects multiplication precedence", () => {
    const result = analyzeExpression("x = 2 + 3 * 4");

    expect(result.threeAddressCode).toEqual([
      "t1 = 3.0 * 4.0",
      "t2 = 2.0 + t1",
      "id1 = t2",
    ]);
  });

  it("treats exponentiation as right-associative", () => {
    const result = analyzeExpression("x = 2 ^ 3 ^ 4");

    expect(result.threeAddressCode).toEqual([
      "t1 = 3.0 ^ 4.0",
      "t2 = 2.0 ^ t1",
      "id1 = t2",
    ]);
  });

  it("applies exponentiation before a leading unary operator", () => {
    const result = analyzeExpression("-2 ^ 2");

    expect(result.threeAddressCode).toEqual([
      "t1 = 2.0 ^ 2.0",
      "t2 = -t1",
      "_result = t2",
    ]);
  });

  it("reuses the same id for repeated identifiers", () => {
    const result = analyzeExpression("total = price + price");
    const identifiers = result.tokens.filter(
      (token) => token.type === "IDENTIFIER"
    );

    expect(identifiers.map((token) => token.id)).toEqual(["id1", "id2", "id2"]);
  });

  it("supports roots with an explicit base", () => {
    const result = analyzeExpression("x = sqrt3(8)");

    expect(result.threeAddressCode).toEqual([
      "t1 = 8.0 ^ 0.3333333333333333",
      "id1 = t1",
    ]);
  });

  it.each([
    ["", "Input is empty"],
    ["x = (1 + 2", "not balanced"],
    ["x = 1 2", "Unexpected token"],
    ["x = sqrt0(9)", "greater than zero"],
    ["2value = 3", "must not start with a digit"],
  ])("rejects invalid input: %s", (input, expectedError) => {
    expect(() => analyzeExpression(input)).toThrow(expectedError);
  });
});
