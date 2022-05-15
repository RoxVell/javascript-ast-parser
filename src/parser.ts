import { Tokenizer } from './tokenizer';
import { TokenType } from './tokens';
import { isAccessorOperator, isAssignmentOperator, isPrefixOperator, isUnaryOperator } from './tokens-utils';

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
      case TokenType.Class:
        return this.ClassDeclaration();
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
    const left = this.ConditionalExpression();

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

  // Expression '?' Expression ':' Expression
  ConditionalExpression() {
    const left = this.LogicalOrExpression();

    if (this.lookahead.type === TokenType.QuestionMark) {
      this.expect(TokenType.QuestionMark);
      const consequent = this.Expression();
      this.expect(TokenType.Colon);
      const alternate = this.Expression();

      return {
        type: 'ConditionalExpression',
        test: left,
        consequent,
        alternate,
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
      'ExponentialExpression',
      TokenType.MultiplicativeOperator
    );
  }

  ExponentialExpression() {
    return this.BinaryExpression(
      'PrefixExpression',
      TokenType.Exponentiation
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
      case TokenType.Class:
        return this.ClassExpression();
      case TokenType.OpenBracket:
        return this.ObjectExpression();
      case TokenType.Function:
        return this.FunctionExpression();
      case TokenType.New:
        return this.NewExpression();
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

  /**
   * Expression '?.' | '.' Identifier
   * Expression '?.[' | '[' Expression
   */
  MemberExpression() {
    let left = this.Literal();

    // TODO: refactor
    while (
      this.lookahead.type === TokenType.Dot || this.lookahead.type === TokenType.OptionalDot
      || this.lookahead.type === TokenType.OpenSquareBracket || this.lookahead.type === TokenType.OptionalOpenSquareBracket
      ) {
      if (this.lookahead.type === TokenType.Dot || this.lookahead.type === TokenType.OptionalDot) {
        const optional = Boolean(this.expectOptional(TokenType.OptionalDot));

        if (!optional) {
          this.expect(TokenType.Dot);
        }

        left = {
          type: 'MemberExpression',
          // @ts-ignore
          computed: false,
          object: left,
          optional,
          property: this.Identifier(),
        };
      } else {
        const optional = Boolean(this.expectOptional(TokenType.OptionalOpenSquareBracket));

        if (!optional) {
          this.expect(TokenType.OpenSquareBracket);
        }

        const expression = this.Expression();
        this.expect(TokenType.CloseSquareBracket);

        left = {
          type: 'MemberExpression',
          // @ts-ignore
          computed: true,
          object: left,
          property: expression,
          optional,
        };
      }
    }

    return left;
  }

  private ComputedProperty() {
    if (this.lookahead.type === TokenType.OpenSquareBracket) {
      return {
        isComputed: true,
        value: this.InsideSquareBrackets(this.Expression.bind(this))
      };
    }

    return {
      isComputed: false,
      value: this.Identifier(),
    };
  }

  private InsideSquareBrackets(expression) {
    this.expect(TokenType.OpenSquareBracket);
    const value = expression();
    this.expect(TokenType.CloseSquareBracket);
    return value;
  }

  private InsideParentheses(expression) {
    this.expect(TokenType.OpenParentheses);
    const value = expression();
    this.expect(TokenType.CloseParentheses);
    return value;
  }

  // '(' Expression ')'
  ParenthesesExpression() {
    return this.InsideParentheses(this.Expression.bind(this));
  }

  Literal() {
    switch (this.lookahead.type) {
      case TokenType.Null:
        return this.NullLiteral();
      case TokenType.String:
        return this.StringLiteral();
      case TokenType.Number:
        return this.NumberLiteral();
      case TokenType.Boolean:
        return this.BooleanLiteral();
      case TokenType.OpenSquareBracket:
        return this.ArrayExpression();
      case TokenType.This:
        return this.ThisExpression();
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
      value: token.value === 'true',
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

  expectOptional(tokenType: TokenType) {
    if (this.lookahead.type === tokenType) {
      return this.expect(tokenType);
    }

    return false;
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

  private ExpressionInsideSquareBrackets() {
    this.expect(TokenType.OpenSquareBracket);
    const expression = this.Expression();
    this.expect(TokenType.CloseSquareBracket);
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
    const functionInformation = this.FunctionInformation();

    if (!functionInformation.internal.hasFunctionKeyword) {
      throw new SyntaxError(`Expected function keyword`);
    }

    return {
      ...functionInformation.value,
      type: 'FunctionDeclaration',
    };
  }

  // (OPT 'async') 'function' (OPT '*') (OPT (Id | '[' Id ']')) '(' PARAMS ')' BlockStatement
  private FunctionInformation() {
    const async = Boolean(this.expectOptional(TokenType.Async));

    const hasFunctionKeyword = Boolean(this.expectOptional(TokenType.Function));

    const generator = Boolean(this.expectOptional(TokenType.MultiplicativeOperator));

    const id = this.lookahead === TokenType.OpenSquareBracket
      ? this.ExpressionInsideSquareBrackets()
      : this.lookahead.type === TokenType.Identifier
        ? this.Identifier()
        : null;

    const params = this.FunctionParams();
    const body = this.Statement();

    return {
      internal: {
        hasFunctionKeyword,
      },
      value: {
        async,
        generator,
        id,
        params,
        body,
      }
    };
  }

  FunctionParams() {
    const params = [];

    this.expect(TokenType.OpenParentheses);

    while (this.lookahead.type !== TokenType.CloseParentheses) {
      params.push(this.FunctionParam());

      if (this.lookahead.type === TokenType.Comma) {
        this.expect(TokenType.Comma);
      }
    }

    this.expect(TokenType.CloseParentheses);

    return params;
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

  private ClassDeclaration() {
    return {
      type: 'ClassDeclaration',
      ...this.Class(),
    };
  }

  private ClassExpression() {
    return {
      type: 'ClassExpression',
      ...this.Class(),
    };
  }

  private Class() {
    this.expect(TokenType.Class);
    const id = this.Identifier();
    let superClass = null;

    if (this.lookahead.type === TokenType.Extends) {
      this.expect(TokenType.Extends);
      superClass = this.Identifier();
    }

    const body = this.ClassBody();

    return {
      id,
      superClass,
      body,
    };
  }

  private ClassBody() {
    const body = [];

    this.expect(TokenType.OpenBracket);

    while (this.lookahead.type !== TokenType.CloseBracket) {
      const isStatic = Boolean(this.expectOptional(TokenType.Static));

      body.push({
        ...this.ClassProperty(),
        static: isStatic,
      });
    }

    this.expect(TokenType.CloseBracket);

    return {
      type: 'ClassBody',
      body,
    };
  }

  private _Property({ methodDefinition, propertyDefinition, assignmentOperator }) {
    if ([TokenType.Get, TokenType.Set, TokenType.Async].includes(this.lookahead.type)) {
      return methodDefinition();
    } else {
      const left = this.ComputedProperty();

      if (this.lookahead.type === assignmentOperator) {
        return propertyDefinition(left);
      } else {
        return methodDefinition(left);
      }
    }
  }

  private ClassProperty() {
    return this._Property({
      methodDefinition: this.MethodDefinition.bind(this),
      propertyDefinition: this.ClassPropertyDefinition.bind(this),
      assignmentOperator: TokenType.SimpleAssignment,
    });
  }

  private ObjectProperty() {
    const property = this._Property({
      methodDefinition: this.MethodDefinition.bind(this),
      propertyDefinition: this.ObjectPropertyDefinition.bind(this),
      assignmentOperator: TokenType.Colon,
    });

    return {
      ...property,
      type: 'ObjectProperty',
      method: property.type !== 'PropertyDefinition',
      shorthand: false, // TODO
    };
  }

  // 'async'? ('get' | 'set') '*'? Identifier '(' Params ')' Statement
  private MethodDefinition(id = { isComputed: false, value: null }) {
    const isAsync = Boolean(this.expectOptional(TokenType.Async));

    const kind = isAccessorOperator(this.lookahead.type)
      ? this.expect(this.lookahead.type).value
      : 'method';

    const generator = Boolean(this.expectOptional(TokenType.MultiplicativeOperator));

    if (!id.value) {
      id = this.ComputedProperty();
    }

    const params = this.FunctionParams();
    const body = this.Statement();

    return {
      type: 'MethodDefinition',
      kind,
      computed: id.isComputed,
      key: id.value,
      value: {
        type: 'FunctionExpression',
        id: null,
        generator,
        async: isAsync,
        expression: false,
        params,
        body,
      },
    };
  }

  private ClassPropertyDefinition(left) {
    this.expect(TokenType.SimpleAssignment);
    const right = this.Expression();
    this.expect(TokenType.Semicolon);

    return {
      type: 'PropertyDefinition',
      computed: left.isComputed,
      key: left.value,
      value: right,
    };
  }

  private ObjectPropertyDefinition(left) {
    this.expect(TokenType.Colon);
    const right = this.Expression();

    return {
      type: 'PropertyDefinition',
      computed: left.isComputed,
      key: left.value,
      value: right,
    };
  }

  private ThisExpression() {
    this.expect(TokenType.This);

    return {
      type: 'ThisExpression'
    };
  }

  private ObjectExpression() {
    this.expect(TokenType.OpenBracket);

    const properties = [];

    while (this.lookahead.type !== TokenType.CloseBracket) {
      properties.push(this.ObjectProperty());

      if (this.lookahead.type !== TokenType.CloseBracket) {
        this.expect(TokenType.Comma);
      }
    }

    this.expect(TokenType.CloseBracket);

    return {
      type: 'ObjectExpression',
      properties,
    };
  }

  private FunctionExpression() {
    return {
      ...this.FunctionDeclaration(),
      type: 'FunctionExpression',
    }
  }

  // 'new' MemberExpression
  private NewExpression() {
    this.expect(TokenType.New);

    const callExpression = this.CallExpression();

    return {
      type: 'NewExpression',
      // @ts-ignore
      callee: callExpression.callee || callExpression,
      // @ts-ignore
      arguments: callExpression.arguments || [],
    };
  }
}

const program = `
  a?.[b];
`;

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
