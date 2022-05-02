import { TokenType } from './tokenizer';

export function isAssignmentOperator(tokenType: TokenType): boolean {
  return [
    TokenType.SimpleAssignment,
    TokenType.ComplexAssignment
  ].includes(tokenType);
}

export function isLiteral(tokenType: TokenType) {
  return [
    TokenType.String,
    TokenType.Number
  ].includes(tokenType);
}
