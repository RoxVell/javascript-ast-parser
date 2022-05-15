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

export function isLiteral(tokenType: TokenType): boolean {
  return [
    TokenType.Number,
    TokenType.String,
    TokenType.Boolean,
    TokenType.Null,
    // TokenType.Undefined,
  ].includes(tokenType);
}

export function isAssignmentOperator(tokenType: TokenType): boolean {
  return [
    TokenType.SimpleAssignment,
    TokenType.ComplexAssignment,
  ].includes(tokenType);
}

export function isPrefixOperator(tokenType: TokenType): boolean {
  return PREFIX_OPERATORS.includes(tokenType);
}

export function isUnaryOperator(tokenType: TokenType): boolean {
  return UNARY_OPERATORS.includes(tokenType);
}

export function isAccessorOperator(tokenType: TokenType): boolean {
  return ACCESSOR_OPERATORS.includes(tokenType);
}

// export function isLogicalOperator(tokenType: TokenType) {
//   return [
//     TokenType.LogicalOperator,
//     TokenType.ComplexAssignment,
//   ].includes(tokenType);
// }
