export const TOKEN_TYPES = {
  IDENTIFIER: "IDENTIFIER",
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
  LEFT_PARENTHESIS: "LEFT_PARENTHESIS",
  RIGHT_PARENTHESIS: "RIGHT_PARENTHESIS",
  ASSIGNMENT: "ASSIGNMENT",
  FUNCTION: "FUNCTION",
} as const;

export type BinaryOperator = "+" | "-" | "*" | "/" | "^";
export type UnaryOperator = "+" | "-";

export type Token =
  | {
      type: typeof TOKEN_TYPES.IDENTIFIER;
      value: string;
      id: string;
    }
  | {
      type: typeof TOKEN_TYPES.NUMBER;
      value: string;
    }
  | {
      type: typeof TOKEN_TYPES.OPERATOR;
      value: BinaryOperator;
    }
  | {
      type:
        | typeof TOKEN_TYPES.LEFT_PARENTHESIS
        | typeof TOKEN_TYPES.RIGHT_PARENTHESIS
        | typeof TOKEN_TYPES.ASSIGNMENT;
      value: "(" | ")" | "=";
    }
  | {
      type: typeof TOKEN_TYPES.FUNCTION;
      value: "sqrt";
      base: number;
    };

export type AstNode =
  | {
      type: "Assignment";
      name: string;
      id: string;
      value: AstNode;
    }
  | {
      type: "BinaryOperation";
      operator: BinaryOperator;
      left: AstNode;
      right: AstNode;
    }
  | {
      type: "UnaryOperation";
      operator: UnaryOperator;
      expression: AstNode;
    }
  | {
      type: "NumberLiteral";
      value: string;
    }
  | {
      type: "Identifier";
      name: string;
      id: string;
    };

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export interface CompilerResult {
  tokens: Token[];
  transformedExpression: string;
  syntaxTree: TreeNode;
  threeAddressCode: string[];
}
