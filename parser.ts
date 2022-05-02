import { Token, Tokenizer, TokenType } from './tokenizer';
import { isAssignmentOperator, isLiteral } from './parser-token.helpers';

export class Parser {
  private tokenizer = new Tokenizer();
  private lookahead: Token | null = null;

  public parse(str: string) {
    this.tokenizer.init(str);
    this.lookahead = this.tokenizer.getNextToken();

    return {
      type: 'Program',
      body: this.StatementList(),
    }
  }

  StatementList(stopToken?: TokenType) {
    const statements = [this.Statement()];

    while (this.lookahead && this.lookahead.type !== stopToken) {
      statements.push(this.Statement());
    }

    return statements;
  }

  Statement() {
    switch (this.lookahead?.type) {
      case TokenType.OpenBlock:
        return this.BlockStatement()
      case TokenType.Semicolon:
        return this.EmptyStatement()
      case TokenType.VariableDeclaration:
        return this.VariableDeclaration();
      // case TokenType.If:
      //   return this.IfStatement()
      default:
        return this.ExpressionStatement();
    }
  }

  EmptyStatement() {
    this.eat(TokenType.Semicolon);
    return {
      type: 'EmptyStatement',
    };
  }

  BlockStatement() {
    this.eat(TokenType.OpenBlock);

    const statements = this.lookahead?.type === TokenType.CloseBlock
      ? []
      : this.StatementList(TokenType.CloseBlock);

    this.eat(TokenType.CloseBlock);

    return {
      type: 'BlockStatement',
      body: statements,
    };
  }

  ExpressionStatement() {
    const expression = this.Expression();
    this.eat(TokenType.Semicolon);
    return {
      type: 'ExpressionStatement',
      expression,
    };
  }

  Expression() {
    return this.AssignmentExpression();
  }

  AssignmentExpression() {
    let left = this.AdditiveExpression();

    if (isAssignmentOperator(this.lookahead!.type)) {
      return {
        type: 'AssignmentExpression',
        operator: this.AssignmentOperator().value,
        left: this.checkValidAssignmentTarget(left),
        right: this.AssignmentExpression(),
      };
    }

    return left;
  }

  BinaryExpression(builderName: string, operatorToken: TokenType) {
    let leftOperand = this[builderName]();

    while (this.lookahead?.type === operatorToken) {
      const operator = this.eat(operatorToken).value;
      const rightOperand = this[builderName]();
      leftOperand = {
        type: 'BinaryExpression',
        // @ts-ignore
        operator,
        left: leftOperand,
        right: rightOperand,
      };
    }

    return leftOperand;
  }

  LeftHandSideExpression() {
    return this.Identifier();
  }

  AdditiveExpression() {
    return this.BinaryExpression(
      'MultiplicativeExpression',
      TokenType.AdditiveOperator
    );
  }

  MultiplicativeExpression() {
    return this.BinaryExpression(
      'PrimaryExpression',
      TokenType.MultiplicativeOperator
    );
  }

  PrimaryExpression() {
    if (isLiteral(this.lookahead!.type)) {
      return this.Literal();
    }
    switch (this.lookahead?.type) {
      case TokenType.OpenBracket:
        return this.ParanthesizedExpression();
      default:
        return this.LeftHandSideExpression();
    }
  }

  ParanthesizedExpression() {
    this.eat(TokenType.OpenBracket);
    const expr = this.Expression();
    this.eat(TokenType.CloseBracket);
    return expr;
  }

  public Literal() {
    switch (this.lookahead?.type) {
      case TokenType.Number: return this.NumericLiteral()
      case TokenType.String: return this.StringLiteral()
    }
    throw new Error(`Literal for type "${this.lookahead?.type}" not found`);
  }

  public NumericLiteral() {
    const token = this.eat(TokenType.Number);
    return {
      type: 'NumericLiteral',
      value: Number(token.value),
    };
  }

  private StringLiteral() {
    const token = this.eat(TokenType.String);
    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1),
    };
  }

  private eat(tokenType: TokenType) {
    const token = this.lookahead;

    if (!token) {
      throw new Error(`Unexpected end of input, expected: "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new Error(`Unexpected token: "${token.type}", expected: ${tokenType}"`);
    }

    this.lookahead = this.tokenizer.getNextToken();

    return token;
  }

  VariableDeclaration() {
    const declarationKind = this.eat(TokenType.VariableDeclaration).value;
    const declarations = this.VariableDeclarators();
    return {
      type: 'VariableDeclaration',
      declarations: declarations,
      kind: declarationKind,
    };
  }

  VariableDeclarators() {
    const declarations = [this.VariableDeclarator()];

    while (this.lookahead?.type === TokenType.Comma) {
      this.eat(TokenType.Comma);
      declarations.push(this.VariableDeclarator());
    }

    return declarations;
  }

  Identifier() {
    const identifier = this.eat(TokenType.Identifier).value;
    return {
      type: 'Identifier',
      name: identifier,
    };
  }

  VariableDeclarator() {
    const identifier = this.Identifier();
    this.eat(TokenType.SimpleAssignment);
    const expression = this.Expression();

    return {
      type: 'VariableDeclarator',
      id: identifier,
      init: expression,
    };
  }

  private AssignmentOperator() {
    if (this.lookahead?.type === TokenType.SimpleAssignment) {
      return this.eat(TokenType.SimpleAssignment);
    }

    return this.eat(TokenType.ComplexAssignment);
  }

  private checkValidAssignmentTarget(target) {
    if (target.type === TokenType.Identifier) {
      return target;
    }

    throw new Error(`Invalid left hand side expression, expected identifier, got: "${target.type}"`);
  }
}

const program = `
var x = y = 3;
  `;

const parser = new Parser();
console.log(JSON.stringify(parser.parse(program), null, 2));

// const tokenizer = new Tokenizer();
// tokenizer.init(`const a123 = 5;`);
// const tokens = [];
// let token = tokenizer.getNextToken();
//
// while (token) {
//   tokens.push(token);
//   token = tokenizer.getNextToken();
// }
//
// console.log(tokens);

/**
 * graph TD
 *     Statement --> BlockStatement
 *     Statement --> EmptyStatement
 *     Statement --> VariableDeclaration
 *     Statement --> ExpressionStatement
 *     ExpressionStatement --> Expression
 *     BlockStatement --> Statement
 *     VariableDeclaration --> VariableDeclarator
 *     VariableDeclarator --> Identifier
 *     VariableDeclarator --> Expression
 *     Expression --> AssignmentExpression
 *     AssignmentExpression --> BinaryExpression
 *     BinaryExpression --> MultiplicativeExpression
 *     BinaryExpression --> PrimaryExpression
 *     PrimaryExpression --> Literal
 *     PrimaryExpression --> ParanthesizedExpression
 *     PrimaryExpression --> LeftHandSideExpression
 *     LeftHandSideExpression --> Identifier
 */
