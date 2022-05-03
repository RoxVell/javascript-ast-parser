export enum TokenType {
  Number = 'Number',
  String = 'String',
  Semicolon = 'Semicolon',
  OpenBlock = 'OpenBlock',
  CloseBlock = 'CloseBlock',
  OpenBracket = 'OpenBracket',
  CloseBracket = 'CloseBracket',
  AdditiveOperator = 'AdditiveOperator',
  MultiplicativeOperator = 'MultiplicativeOperator',
  VariableDeclaration = 'VariableDeclaration',
  SimpleAssignment = 'SimpleAssignment',
  ComplexAssignment = 'ComplexAssignment',
  Identifier = 'Identifier',
  Comma = 'Comma',
  If = 'If',
  Else = 'Else',
  Boolean = 'Boolean',
  RelationalOperator = 'RelationalOperator',
}

const TokenRules: [RegExp, TokenType | null][] = [
  /** Literals */
  // Number
  [/^\d+/, TokenType.Number],

  // String
  [/^"[^"]*"/, TokenType.String],
  [/^'[^']*'/, TokenType.String],

  // Boolean
  [/^true|false/, TokenType.Boolean],

  // Comments
  [/^\/\/.*/, null],
  [/^\/\*[\s\S]*?\*\//, null],

  [/^;/, TokenType.Semicolon],

  // Block
  [/^\{/, TokenType.OpenBlock],
  [/^\}/, TokenType.CloseBlock],

  // Brackets
  [/^\(/, TokenType.OpenBracket],
  [/^\)/, TokenType.CloseBracket],

  // Assignment
  [/^\=/, TokenType.SimpleAssignment],
  [/^[\+\-\*\/]=/, TokenType.ComplexAssignment],

  [/^\,/, TokenType.Comma],

  // Variable
  [/^\b(var|let|const)\b/, TokenType.VariableDeclaration],

  // Operators
  [/^[\+|\-]/, TokenType.AdditiveOperator],
  [/^[\*|\/]/, TokenType.MultiplicativeOperator],
  [/^(>|<)?=/, TokenType.RelationalOperator],

  // Condition
  [/^if/, TokenType.If],
  [/^else/, TokenType.Else],

  /** Skip tokens */
  // Whitespaces
  [/^\s+/, null],

  // Identifier
  [/^[A-z]+[0-9]*/, TokenType.Identifier],
];

export type Token = {
  type: TokenType;
  value: string;
}

export class Tokenizer {
  private cursor = 0;
  private str = '';

  public init(str: string) {
    this.str = str;
    this.cursor = 0;
  }

  private hasMoreTokens(): boolean {
    return this.cursor < this.str.length;
  }

  public getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }

    for (const [regexp, tokenType] of TokenRules) {
      const strToProcessed = this.str.slice(this.cursor);
      const match = this.match(regexp, strToProcessed);

      if (!match) {
        continue;
      }

      // console.log({
      //   str: strToProcessed,
      //   cursor: this.cursor,
      //   regexp,
      //   tokenType,
      //   match
      // });

      if (tokenType === null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: match,
      };
    }

    throw new Error(`Unexpected token "${this.str[this.cursor]}" at ${this.cursor} index`);
  }

  private match(regexp: RegExp, str: string) {
    const matched = regexp.exec(str);

    if (matched === null) {
      return matched;
    }

    const matchedValue = matched[0];
    this.cursor += matchedValue.length;
    return matchedValue;
  }
}
