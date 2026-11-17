import { generateThreeAddressCode } from "@/features/compiler/core/code-generator";
import { tokenize } from "@/features/compiler/core/lexer";
import { parse } from "@/features/compiler/core/parser";
import { toTreeNode } from "@/features/compiler/core/tree-adapter";
import { validateExpression } from "@/features/compiler/core/validation";
import type { CompilerResult } from "@/features/compiler/types";

export function analyzeExpression(input: string): CompilerResult {
  const validationError = validateExpression(input);
  if (validationError) throw new Error(validationError);

  const { tokens, transformedExpression } = tokenize(input);
  const syntaxTree = parse(tokens);

  return {
    tokens,
    transformedExpression,
    syntaxTree: toTreeNode(syntaxTree),
    threeAddressCode: generateThreeAddressCode(syntaxTree),
  };
}
