import { TokenType } from './tokens';

const PREFIX_OPERATORS: TokenType[] = [
  TokenType.Increment,
  TokenType.Exclamation,
  TokenType.Void,
  TokenType.Typeof,
  TokenType.AdditiveOperator,
  TokenType.Await,
  TokenType.Delete,
];

const POSTFIX_OPERATORS: TokenType[] = [
  TokenType.Increment,
];

const UNARY_OPERATORS: TokenType[] = [
  TokenType.Exclamation,
  TokenType.Void,
  TokenType.Typeof,
  TokenType.AdditiveOperator,
  TokenType.Delete,
];

const ACCESSOR_OPERATORS: TokenType[] = [
  TokenType.Set,
  TokenType.Get,
];

export function isAssignmentOperator(tokenType: TokenType): boolean {
  return [
    TokenType.SimpleAssignment,
    TokenType.ComplexAssignment,
  ].includes(tokenType);
}

export function isPrefixOperator(tokenType: TokenType): boolean {
  return PREFIX_OPERATORS.includes(tokenType);
}

export function isPostfixOperator(tokenType: TokenType): boolean {
  return POSTFIX_OPERATORS.includes(tokenType);
}

export function isUnaryOperator(tokenType: TokenType): boolean {
  return UNARY_OPERATORS.includes(tokenType);
}

export function isAccessorOperator(tokenType: TokenType): boolean {
  return ACCESSOR_OPERATORS.includes(tokenType);
}
