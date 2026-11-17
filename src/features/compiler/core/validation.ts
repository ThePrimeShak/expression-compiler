const INVALID_IDENTIFIER = /\b\d+[A-Za-z][A-Za-z0-9]*\b/;
const WORD = /\b[^\s()+\-*/^=]+\b/g;
const NUMBER = /^\d+(?:\.\d+)?$/;
const IDENTIFIER = /^[A-Za-z][A-Za-z0-9]*$/;
const ROOT_FUNCTION = /^sqrt\d*$/;

export function validateExpression(input: string): string | null {
  const expression = input.trim();

  if (!expression) return "Input is empty.";

  let parenthesisBalance = 0;
  for (const character of expression) {
    if (character === "(") parenthesisBalance += 1;
    if (character === ")") parenthesisBalance -= 1;

    if (parenthesisBalance < 0) {
      return "Parentheses mismatch: too many closing parentheses.";
    }
  }

  if (parenthesisBalance !== 0) {
    return "Parentheses mismatch: the expression is not balanced.";
  }

  if ("+-*/^=(".includes(expression.at(-1) ?? "")) {
    return "Expression cannot end with an operator.";
  }

  if (INVALID_IDENTIFIER.test(expression)) {
    return "Identifiers must not start with a digit.";
  }

  for (const word of expression.match(WORD) ?? []) {
    if (
      NUMBER.test(word) ||
      IDENTIFIER.test(word) ||
      ROOT_FUNCTION.test(word)
    ) {
      continue;
    }

    return `Invalid token or non-English identifier detected: "${word}"`;
  }

  return null;
}
