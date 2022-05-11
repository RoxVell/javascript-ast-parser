import { Tokenizer } from './tokenizer';
import { TokenType } from './tokens';
import { isAssignmentOperator, isPrefixOperator, isUnaryOperator } from './tokens-utils';

export class Parser {
  private tokenizer = new Tokenizer();
  private lookahead;

  parse(program: string) {
    this.tokenizer.init(program);

    this.lookahead = this.tokenizer.getNextToken();

    return {
      type: 'Program',
      body: this.StatementList()
    };
  }

  StatementList(stopToken?: TokenType) {
    const statements = [];

    while (this.lookahead && this.lookahead.type !== stopToken) {
      statements.push(this.Statement());
    }

    return statements;
  }

  Statement() {
    switch (this.lookahead.type) {
      case TokenType.Function:
        return this.FunctionDeclaration();
      case TokenType.Async:
        return this.FunctionDeclaration();
      case TokenType.OpenBracket:
        return this.BlockStatement();
      case TokenType.Semicolon:
        return this.EmptyStatement();
      case TokenType.If:
        return this.IfStatement();
      case TokenType.While:
        return this.WhileStatement();
      case TokenType.Return:
        return this.ReturnStatement();
      case TokenType.For:
        return this.ForStatement();
      case TokenType.Do:
        return this.DoWhileStatement();
      case TokenType.VariableDeclaration:
        return this.VariableDeclaration();
      default:
        return this.ExpressionStatement();
    }
  }

  ExpressionStatement() {
    const statement = this.Expression();
    this.expect(TokenType.Semicolon);
    return {
      type: 'ExpressionStatement',
      expression: statement,
    };
  }

  Expression() {
    return this.AssignmentExpression();
  }

  /**
   * AdditiveExpression
   * LeftHandSideExpression AssignmentOperator AssignmentExpression
   */
  private AssignmentExpression() {
    const left = this.LogicalOrExpression();

    if (isAssignmentOperator(this.lookahead.type)) {
      const operator = this.AssignmentOperator().value;

      return {
        type: 'AssignmentExpression',
        operator,
        left: this.checkAssignmentTarget(left),
        right: this.AssignmentExpression(),
      };
    }

    return left;
  }

  LogicalOrExpression() {
    return this.BinaryExpression(
      'LogicalAndExpression',
      TokenType.LogicalOr,
      'LogicalExpression',
    );
  }

  LogicalAndExpression() {
    return this.BinaryExpression(
      'EqualityExpression',
      TokenType.LogicalAnd,
      'LogicalExpression',
    );
  }

  EqualityExpression() {
    return this.BinaryExpression(
      'RelationalExpression',
      TokenType.EqualityOperator
    );
  }

  RelationalExpression() {
    return this.BinaryExpression(
      'AdditiveExpression',
      TokenType.RelationalOperator,
    )
  }

  AdditiveExpression() {
    return this.BinaryExpression(
      'MultiplicativeExpression',
      TokenType.AdditiveOperator
    );
  }

  MultiplicativeExpression() {
    return this.BinaryExpression(
      'PrefixExpression',
      TokenType.MultiplicativeOperator
    );
  }

  PrefixExpression() {
    if (isPrefixOperator(this.lookahead.type)) {
      if (isUnaryOperator(this.lookahead.type)) {
        return this.UnaryExpression();
      }

      switch (this.lookahead.type) {
        case TokenType.Increment:
          return this.PrefixIncrementExpression();
        case TokenType.Await:
          return this.AwaitExpression();
      }
    }

    return this.PrimaryExpression();
  }

  AwaitExpression() {
    this.expect(TokenType.Await);

    return {
      type: 'AwaitExpression',
      argument: this.Expression(),
    };
  }

  UnaryExpression() {
    const operator = this.PrefixOperator().value;

    return {
      type: 'UnaryExpression',
      operator,
      prefix: true,
      argument: this.Expression(),
    };
  }

  PrefixOperator() {
    if (isPrefixOperator(this.lookahead.type)) {
      return this.expect(this.lookahead.type);
    }

    throw new Error(`Unexpected prefix operator, got: ${this.lookahead.type}`);
  }

  PrefixIncrementExpression() {
    const operator = this.PrefixOperator().value;

    return this.UpdateExpression({
      operator,
      prefix: true,
      argument: this.checkIncrementTarget(this.Expression())
    });
  }

  private UpdateExpression({ operator, prefix, argument }) {
    return {
      type: 'UpdateExpression',
      operator,
      prefix: prefix,
      argument: argument,
    };
  }

  checkIncrementTarget(expression) {
    if (expression.type === TokenType.Identifier) {
      return expression;
    }

    throw new Error(`Invalid increment target, expected: ${TokenType.Identifier}, got: ${expression.type}`);
  }

  private checkAssignmentTarget(token) {
    if (token.type !== TokenType.Identifier && token.type !== 'MemberExpression') {
      throw new Error(`Expression should be assigned to identifier`);
    }

    return token;
  }

  BinaryExpression(methodName: string, tokenType: TokenType, type?: string) {
    let left: any = this[methodName]();

    while (this.lookahead.type === tokenType) {
      const operator = this.expect(tokenType).value;

      const right = this[methodName]();

      left = {
        type: type || 'BinaryExpression',
        operator,
        left,
        right,
      };
    }

    return left;
  }

  PrimaryExpression() {
    switch (this.lookahead.type) {
      case TokenType.OpenParentheses:
        return this.ParenthesesExpression();
      default:
        return this.CallExpression();
    }
  }

  CallExpression() {
    let left = this.MemberExpression();

    while (this.lookahead.type === TokenType.OpenParentheses) {
      this.expect(TokenType.OpenParentheses);
      const params = this.ArgumentList();
      this.expect(TokenType.CloseParentheses);

      left = {
        type: 'CallExpression',
        // @ts-ignore
        callee: left,
        arguments: params,
      };
    }

    return left;
  }

  ArgumentList() {
    const params = [];

    while (this.lookahead.type !== TokenType.CloseParentheses) {
      params.push(this.Expression());

      if (this.lookahead.type === TokenType.Comma) {
        this.expect(TokenType.Comma);
      }
    }

    return params;
  }

  MemberExpression() {
    let left = this.Literal();

    while (this.lookahead.type === TokenType.Dot) {
      this.expect(TokenType.Dot);

      left = {
        type: 'MemberExpression',
        // @ts-ignore
        object: left,
        property: this.Identifier(),
        computed: false
      }
    }

    while (this.lookahead.type === TokenType.OpenSquareBracket) {
      this.expect(TokenType.OpenSquareBracket);
      const expression = this.Expression();
      this.expect(TokenType.CloseSquareBracket);

      left = {
        type: 'MemberExpression',
        // @ts-ignore
        object: left,
        property: expression,
        computed: true
      };
    }

    return left;
  }

  // '(' Expression ')'
  ParenthesesExpression() {
    this.expect(TokenType.OpenParentheses);
    const expression = this.Expression();
    this.expect(TokenType.CloseParentheses);
    return expression;
  }

  Literal() {
    switch (this.lookahead.type) {
      case TokenType.Null:
        return this.NullLiteral();
      // case TokenType.Undefined:
      //   return this.UndefinedLiteral();
      case TokenType.String:
        return this.StringLiteral();
      case TokenType.Number:
        return this.NumberLiteral();
      case TokenType.Boolean:
        return this.BooleanLiteral();
      case TokenType.OpenSquareBracket:
        return this.ArrayExpression();
      case TokenType.Identifier:
        return this.Identifier();
    }

    throw new Error(`Unknown literal type: ${this.lookahead.type}`);
  }

  // '{' StatementList '}'
  private BlockStatement() {
    this.expect(TokenType.OpenBracket);
    const statements = this.StatementList(TokenType.CloseBracket);
    this.expect(TokenType.CloseBracket);

    return {
      type: 'BlockStatement',
      body: statements,
    };
  }

  // '[' Expression, Expression, ... ']'
  private ArrayExpression() {
    this.expect(TokenType.OpenSquareBracket);

    const elements = [];

    while (this.lookahead.type !== TokenType.CloseSquareBracket) {
      const element = this.lookahead.type === TokenType.Comma
        ? null
        : this.Expression();

      elements.push(element);

      if (this.lookahead.type === TokenType.Comma) {
        this.expect(TokenType.Comma);
      }
    }

    this.expect(TokenType.CloseSquareBracket);

    return {
      type: 'ArrayExpression',
      elements,
    };
  }

  private EmptyStatement() {
    this.expect(TokenType.Semicolon);
    return {
      type: 'EmptyStatement'
    };
  }

  StringLiteral() {
    const token = this.expect(TokenType.String);

    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1),
    };
  }

  NumberLiteral() {
    const token = this.expect(TokenType.Number);

    return {
      type: 'NumberLiteral',
      value: Number(token.value),
    };
  }

  BooleanLiteral() {
    const token = this.expect(TokenType.Boolean);

    return {
      type: 'BooleanLiteral',
      value: Boolean(token.value),
    };
  }

  expect(tokenType: TokenType) {
    if (this.lookahead.type !== tokenType) {
      throw new Error(`Unexpected token type, expected: ${tokenType}, got: ${this.lookahead.type}`);
    }

    const currentToken = this.lookahead;

    this.lookahead = this.tokenizer.getNextToken();

    return currentToken;
  }

  private Identifier() {
    const name = this.expect(TokenType.Identifier).value;
    return {
      type: 'Identifier',
      name,
    };
  }

  AssignmentOperator() {
    if ([TokenType.SimpleAssignment, TokenType.ComplexAssignment].includes(this.lookahead.type)) {
      return this.expect(this.lookahead.type);
    }

    throw new Error(`Unexpected assignment operator, got: ${this.lookahead.type}`);
  }

  private VariableDeclaration() {
    const kind = this.expect(this.lookahead.type).value;

    const declarations = [this.VariableDeclarator()];

    while (this.lookahead.type === TokenType.Comma) {
      this.expect(TokenType.Comma);
      declarations.push(this.VariableDeclarator());
    }

    this.expect(TokenType.Semicolon);

    return {
      type: 'VariableDeclaration',
      kind,
      declarations,
    };
  }

  // Identifier (, | = Expression)
  VariableDeclarator() {
    const id = this.Identifier();
    let init = null;

    if (this.lookahead.type === TokenType.SimpleAssignment) {
      this.expect(TokenType.SimpleAssignment);
      init = this.Expression();
    }

    return {
      type: 'VariableDeclarator',
      id,
      init,
    };
  }

  // 'if' '(' Expression ')' Statement 'else'? Statement
  private IfStatement() {
    this.expect(TokenType.If);
    const condition = this.ExpressionInsideParentheses();
    const consequent = this.Statement();

    let alternate = null;

    if (this.lookahead?.type === TokenType.Else) {
      this.expect(TokenType.Else);
      alternate = this.Statement();
    }

    return {
      type: 'IfStatement',
      test: condition,
      consequent,
      alternate,
    };
  }

  // 'while' '(' Expression ')' Statement
  private WhileStatement() {
    this.expect(TokenType.While);
    const test = this.ExpressionInsideParentheses();
    const body = this.Statement();

    return {
      type: 'WhileStatement',
      test: test,
      body,
    };
  }

  // 'do' BlockStatement 'while' '(' Expression ')'
  DoWhileStatement() {
    this.expect(TokenType.Do);
    const body = this.Statement();
    this.expect(TokenType.While);
    const test = this.ExpressionInsideParentheses();
    return {
      type: 'DoWhileStatement',
      test,
      body
    };
  }

  private ExpressionInsideParentheses() {
    this.expect(TokenType.OpenParentheses);
    const expression = this.Expression();
    this.expect(TokenType.CloseParentheses);
    return expression;
  }

  // 'for' '(' Expression | null; Expression | null; Expression | null ')' BlockStatement
  ForStatement() {
    this.expect(TokenType.For);
    this.expect(TokenType.OpenParentheses);

    let init = null;
    let test = null;
    let update = null;

    if (this.lookahead.type !== TokenType.Semicolon) {
      init = this.Statement();
    } else {
      this.expect(TokenType.Semicolon);
    }

    if (this.lookahead.type !== TokenType.Semicolon) {
      test = this.Expression();
    }

    this.expect(TokenType.Semicolon);

    if (this.lookahead.type !== TokenType.CloseParentheses) {
      update = this.Expression();
    }

    this.expect(TokenType.CloseParentheses);

    return {
      type: 'ForStatement',
      init: init,
      test: test,
      update,
      body: this.Statement(),
    };
  }

  // 'async'? 'function' '*'? Identifier '(' Params ')' Statement
  private FunctionDeclaration() {
    let async = false;
    let generator = false;
    const params = [];

    if (this.lookahead.type === TokenType.Async) {
      this.expect(TokenType.Async);
      async = true;
    }

    this.expect(TokenType.Function);

    if (this.lookahead.type === TokenType.MultiplicativeOperator) {
      this.expect(TokenType.MultiplicativeOperator);
      generator = true;
    }

    const id = this.Identifier();

    this.expect(TokenType.OpenParentheses);

    while (this.lookahead.type !== TokenType.CloseParentheses) {
      params.push(this.FunctionParam());

      if (this.lookahead.type === TokenType.Comma) {
        this.expect(TokenType.Comma);
      }
    }

    this.expect(TokenType.CloseParentheses);

    const body = this.Statement();

    return {
      type: 'FunctionDeclaration',
      async,
      generator,
      id,
      body,
      params,
    };
  }

  FunctionParam() {
    const id = this.Identifier();

    if (this.lookahead.type === TokenType.SimpleAssignment) {
      this.expect(TokenType.SimpleAssignment);
      const expression = this.Expression();
      return {
        type: 'AssignmentPattern',
        left: id,
        right: expression
      };
    }

    return id;
  }

  NullLiteral() {
    this.expect(TokenType.Null);

    return {
      type: 'NullLiteral',
      value: null,
    };
  }

  // UndefinedLiteral() {
  //   this.expect(TokenType.Undefined);
  //
  //   return {
  //     type: 'UndefinedLiteral',
  //     value: undefined
  //   };
  // }

  // 'return' Expression
  private ReturnStatement() {
    this.expect(TokenType.Return);
    const argument = this.lookahead.type === TokenType.Semicolon ? null : this.Expression();
    this.expect(TokenType.Semicolon);

    return {
      type: 'ReturnStatement',
      argument,
    };
  }
}

// const program = `
//    func(x = 3);
// `;
//
// console.log({program})
//
// const parser = new Parser();
//
// console.log(JSON.stringify(parser.parse(program), null, 2));


// function getAllTokens(tokenizer: Tokenizer) {
//   let token = tokenizer.getNextToken();
//
//   if (!token) return [];
//
//   const tokens = [];
//
//   while (token) {
//     tokens.push(token);
//     token = tokenizer.getNextToken();
//   }
//
//   return tokens;
// }
//
// const tokenizer = new Tokenizer();
// tokenizer.init(program);
//
// console.log(getAllTokens(tokenizer));
