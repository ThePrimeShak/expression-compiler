import {
  TOKEN_TYPES,
  type AstNode,
  type BinaryOperator,
  type Token,
  type UnaryOperator,
} from "@/features/compiler/types";

export function parse(tokens: Token[]): AstNode {
  let currentIndex = 0;

  const peek = () => tokens[currentIndex];
  const consume = () => tokens[currentIndex++];

  const parseProgram = (): AstNode => {
    const firstToken = peek();
    const secondToken = tokens[currentIndex + 1];

    if (
      firstToken?.type === TOKEN_TYPES.IDENTIFIER &&
      secondToken?.type === TOKEN_TYPES.ASSIGNMENT
    ) {
      consume();
      consume();

      return {
        type: "Assignment",
        name: firstToken.value,
        id: firstToken.id,
        value: parseExpression(),
      };
    }

    return parseExpression();
  };

  const parseExpression = (): AstNode => parseAdditive();

  const parseAdditive = (): AstNode => {
    let left = parseMultiplicative();

    while (isOperator(peek(), "+", "-")) {
      const operator = consume();
      if (operator?.type !== TOKEN_TYPES.OPERATOR) break;

      left = {
        type: "BinaryOperation",
        operator: operator.value,
        left,
        right: parseMultiplicative(),
      };
    }

    return left;
  };

  const parseMultiplicative = (): AstNode => {
    let left = parseUnary();

    while (isOperator(peek(), "*", "/")) {
      const operator = consume();
      if (operator?.type !== TOKEN_TYPES.OPERATOR) break;

      left = {
        type: "BinaryOperation",
        operator: operator.value,
        left,
        right: parseUnary(),
      };
    }

    return left;
  };

  const parsePower = (): AstNode => {
    const left = parsePrimary();

    if (!isOperator(peek(), "^")) return left;
    consume();

    return {
      type: "BinaryOperation",
      operator: "^",
      left,
      right: parseUnary(),
    };
  };

  const parseUnary = (): AstNode => {
    const token = peek();
    if (!isOperator(token, "+", "-")) return parsePower();

    consume();
    return {
      type: "UnaryOperation",
      operator: token.value as UnaryOperator,
      expression: parseUnary(),
    };
  };

  const parsePrimary = (): AstNode => {
    const token = consume();
    if (!token) throw new Error("Unexpected end of input.");

    switch (token.type) {
      case TOKEN_TYPES.NUMBER:
        return { type: "NumberLiteral", value: token.value };

      case TOKEN_TYPES.IDENTIFIER:
        return {
          type: "Identifier",
          name: token.value,
          id: token.id,
        };

      case TOKEN_TYPES.FUNCTION: {
        expect(
          TOKEN_TYPES.LEFT_PARENTHESIS,
          "Expected ( after the root function."
        );
        const expression = parseExpression();
        expect(
          TOKEN_TYPES.RIGHT_PARENTHESIS,
          "Expected ) after the function argument."
        );

        return {
          type: "BinaryOperation",
          operator: "^",
          left: expression,
          right: { type: "NumberLiteral", value: `1/${token.base}` },
        };
      }

      case TOKEN_TYPES.LEFT_PARENTHESIS: {
        const expression = parseExpression();
        expect(
          TOKEN_TYPES.RIGHT_PARENTHESIS,
          "Expected a closing parenthesis."
        );
        return expression;
      }

      default:
        throw new Error(`Unexpected token: "${token.value}".`);
    }
  };

  const expect = (type: Token["type"], message: string) => {
    if (peek()?.type !== type) throw new Error(message);
    consume();
  };

  const syntaxTree = parseProgram();
  const trailingToken = peek();

  if (trailingToken) {
    throw new Error(`Unexpected token: "${trailingToken.value}".`);
  }

  return syntaxTree;
}

function isOperator(
  token: Token | undefined,
  ...operators: BinaryOperator[]
): token is Extract<Token, { type: typeof TOKEN_TYPES.OPERATOR }> {
  return (
    token?.type === TOKEN_TYPES.OPERATOR && operators.includes(token.value)
  );
}
