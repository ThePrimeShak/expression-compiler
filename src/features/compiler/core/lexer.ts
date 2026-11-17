import {
  TOKEN_TYPES,
  type BinaryOperator,
  type Token,
} from "@/features/compiler/types";

interface LexResult {
  tokens: Token[];
  transformedExpression: string;
}

const WHITESPACE = /^\s+/;
const NUMBER = /^\d+(?:\.\d+)?/;
const ROOT_FUNCTION = /^sqrt(\d+)?\b/;
const IDENTIFIER = /^[A-Za-z][A-Za-z0-9]*/;
const OPERATOR = /^[+\-*/^]/;

export function tokenize(input: string): LexResult {
  const tokens: Token[] = [];
  const identifierIds = new Map<string, string>();
  let remainingInput = input;

  const getIdentifierId = (name: string) => {
    const existingId = identifierIds.get(name);
    if (existingId) return existingId;

    const id = `id${identifierIds.size + 1}`;
    identifierIds.set(name, id);
    return id;
  };

  while (remainingInput.length > 0) {
    const whitespace = remainingInput.match(WHITESPACE)?.[0];
    if (whitespace) {
      remainingInput = remainingInput.slice(whitespace.length);
      continue;
    }

    const number = remainingInput.match(NUMBER)?.[0];
    if (number) {
      tokens.push({ type: TOKEN_TYPES.NUMBER, value: number });
      remainingInput = remainingInput.slice(number.length);
      continue;
    }

    const rootFunction = remainingInput.match(ROOT_FUNCTION)?.[0];
    if (rootFunction) {
      const base = Number(rootFunction.slice(4) || 2);
      if (base <= 0) throw new Error("Root base must be greater than zero.");

      tokens.push({ type: TOKEN_TYPES.FUNCTION, value: "sqrt", base });
      remainingInput = remainingInput.slice(rootFunction.length);
      continue;
    }

    const identifier = remainingInput.match(IDENTIFIER)?.[0];
    if (identifier) {
      tokens.push({
        type: TOKEN_TYPES.IDENTIFIER,
        value: identifier,
        id: getIdentifierId(identifier),
      });
      remainingInput = remainingInput.slice(identifier.length);
      continue;
    }

    const operator = remainingInput.match(OPERATOR)?.[0] as
      | BinaryOperator
      | undefined;
    if (operator) {
      tokens.push({ type: TOKEN_TYPES.OPERATOR, value: operator });
      remainingInput = remainingInput.slice(operator.length);
      continue;
    }

    const symbol = remainingInput[0];
    if (symbol === "(") {
      tokens.push({ type: TOKEN_TYPES.LEFT_PARENTHESIS, value: symbol });
    } else if (symbol === ")") {
      tokens.push({ type: TOKEN_TYPES.RIGHT_PARENTHESIS, value: symbol });
    } else if (symbol === "=") {
      tokens.push({ type: TOKEN_TYPES.ASSIGNMENT, value: symbol });
    } else {
      throw new Error(`Unknown token starting at: ${remainingInput}`);
    }

    remainingInput = remainingInput.slice(1);
  }

  return {
    tokens,
    transformedExpression: transformTokens(tokens).join(" "),
  };
}

function transformTokens(
  tokens: Token[],
  start = 0,
  end = tokens.length
): string[] {
  const parts: string[] = [];
  let index = start;

  while (index < end) {
    const token = tokens[index];
    if (!token) break;

    if (token.type === TOKEN_TYPES.FUNCTION) {
      if (tokens[index + 1]?.type !== TOKEN_TYPES.LEFT_PARENTHESIS) {
        throw new Error(
          "Expected an opening parenthesis after the root function."
        );
      }

      const closingParenthesis = findClosingParenthesis(tokens, index + 1, end);
      const innerExpression = transformTokens(
        tokens,
        index + 2,
        closingParenthesis
      );
      parts.push(`(${innerExpression.join(" ")})`, "^", `1/${token.base}`);
      index = closingParenthesis + 1;
      continue;
    }

    parts.push(token.type === TOKEN_TYPES.IDENTIFIER ? token.id : token.value);
    index += 1;
  }

  return parts;
}

function findClosingParenthesis(
  tokens: Token[],
  start: number,
  end: number
): number {
  let depth = 0;

  for (let index = start; index < end; index += 1) {
    const token = tokens[index];
    if (token?.type === TOKEN_TYPES.LEFT_PARENTHESIS) depth += 1;
    if (token?.type === TOKEN_TYPES.RIGHT_PARENTHESIS) depth -= 1;
    if (depth === 0) return index;
  }

  throw new Error("Unmatched parenthesis after the root function.");
}
