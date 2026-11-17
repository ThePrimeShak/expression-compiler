import type { AstNode } from "@/features/compiler/types";

export function generateThreeAddressCode(syntaxTree: AstNode): string[] {
  const instructions: string[] = [];
  let temporaryIndex = 1;

  const createTemporary = () => `t${temporaryIndex++}`;

  const generate = (node: AstNode): string => {
    switch (node.type) {
      case "NumberLiteral":
        return toFloatLiteral(node.value);

      case "Identifier":
        return node.id;

      case "UnaryOperation": {
        const operand = generate(node.expression);
        const temporary = createTemporary();
        instructions.push(`${temporary} = ${node.operator}${operand}`);
        return temporary;
      }

      case "BinaryOperation": {
        const left = generate(node.left);
        const right = generate(node.right);
        const temporary = createTemporary();
        instructions.push(`${temporary} = ${left} ${node.operator} ${right}`);
        return temporary;
      }

      case "Assignment": {
        const result = generate(node.value);
        instructions.push(`${node.id} = ${result}`);
        return node.id;
      }
    }
  };

  if (syntaxTree.type === "Assignment") {
    generate(syntaxTree);
  } else {
    instructions.push(`_result = ${generate(syntaxTree)}`);
  }

  return instructions;
}

function toFloatLiteral(value: string): string {
  if (value.includes("/")) {
    const [numerator, denominator] = value.split("/").map(Number);
    const result = numerator / denominator;
    return Number.isInteger(result) ? `${result}.0` : String(result);
  }

  return /^-?\d+$/.test(value) ? `${value}.0` : value;
}
