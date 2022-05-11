export enum TokenType {
  Number = 'Number',
  String = 'String',
  Semicolon = 'Semicolon',
  Boolean = 'Boolean',
  OpenBracket = 'OpenBracket',
  CloseBracket = 'CloseBracket',
  AdditiveOperator = 'AdditiveOperator',
  MultiplicativeOperator = 'MultiplicativeOperator',
  OpenParentheses = 'OpenParentheses',
  CloseParentheses = 'CloseParentheses',
  OpenSquareBracket = 'OpenSquareBracket',
  CloseSquareBracket = 'CloseSquareBracket',
  Comma = 'Comma',
  SimpleAssignment = 'SimpleAssignment',
  ComplexAssignment = 'ComplexAssignment',
  Identifier = 'Identifier',
  VariableDeclaration = 'VariableDeclaration',
  If = 'If',
  Else = 'Else',
  While = 'While',
  Function = 'Function',
  Async = 'Async',
  FunctionGeneratorMark = 'FunctionGeneratorMark',
  EqualityOperator = 'EqualityOperator',
  RelationalOperator = 'RelationalOperator',
  Null = 'Null',
  // Undefined = 'Undefined',
  LogicalOr = 'LogicalOr',
  LogicalAnd = 'LogicalAnd',
  Increment = 'Increment',
  Exclamation = 'Exclamation',
  Void = 'Void',
  Typeof = 'Typeof',
  Await = 'Await',
  Delete = 'Delete',
  Do = 'Do',
  For = 'For',
  Return = 'Return',
  Dot = 'Dot',
}

export const Tokens: { type: TokenType | null, pattern: RegExp }[] = [
  /**
   * Literals
   */
  // Numbers
  { type: TokenType.Number, pattern: /^\d+/ },

  // Strings
  { type: TokenType.String, pattern: /^'[^']*'/ },
  { type: TokenType.String, pattern: /^"[^"]*"/ },

  // Boolean
  { type: TokenType.Boolean, pattern: /^(true|false)/ },

  // Null
  { type: TokenType.Null, pattern: /^null/ },
  // { type: TokenType.Undefined, pattern: /^undefined/ },

  // Comparisons
  { type: TokenType.EqualityOperator, pattern: /^[=!]==?/ },
  { type: TokenType.RelationalOperator, pattern: /^(\>|\<)\=?/ },

  // Logical operators
  { type: TokenType.LogicalOr, pattern: /^\|\|/ },
  { type: TokenType.LogicalAnd, pattern: /^&&/ },

  // Assignments
  { type: TokenType.SimpleAssignment, pattern: /^\=/ },
  { type: TokenType.ComplexAssignment, pattern: /^(\*|\/|\+|\-)\=/ },

  /**
   * Math operators
   */
  // Prefix
  { type: TokenType.Increment, pattern: /^((\+\+)|(\-\-))/ },
  { type: TokenType.Exclamation, pattern: /^!/ },
  { type: TokenType.Void, pattern: /^void/ },
  { type: TokenType.Typeof, pattern: /^typeof/ },
  { type: TokenType.Await, pattern: /^await/ },
  { type: TokenType.Delete, pattern: /^delete/ },

  { type: TokenType.AdditiveOperator, pattern: /^(\+|\-)/ },
  { type: TokenType.MultiplicativeOperator, pattern: /^(\*|\/)/ },

  // Whitespaces
  { type: null, pattern: /^\s+/ },

  // Comments
  { type: null, pattern: /^\/\/.*/ },
  { type: null, pattern: /^\/\*[\S\s]*\*\// },

  // Signs
  { type: TokenType.Semicolon, pattern: /^;/ },
  { type: TokenType.Comma, pattern: /^,/ },
  { type: TokenType.Dot, pattern: /^\./ },

  // Brackets
  { type: TokenType.OpenBracket, pattern: /^\{/ },
  { type: TokenType.CloseBracket, pattern: /^\}/ },
  { type: TokenType.OpenParentheses, pattern: /^\(/ },
  { type: TokenType.CloseParentheses, pattern: /^\)/ },
  { type: TokenType.OpenSquareBracket, pattern: /^\[/ },
  { type: TokenType.CloseSquareBracket, pattern: /^\]/ },

  // Variable
  { type: TokenType.VariableDeclaration, pattern: /^(var|let|const)/ },

  // Conditions
  { type: TokenType.If, pattern: /^if/ },
  { type: TokenType.Else, pattern: /^else/ },

  // Loops
  { type: TokenType.While, pattern: /^while/ },
  { type: TokenType.Do, pattern: /^do/ },
  { type: TokenType.For, pattern: /^for/ },

  // Functions
  { type: TokenType.Function, pattern: /^function/ },
  { type: TokenType.Async, pattern: /^async/ },
  { type: TokenType.FunctionGeneratorMark, pattern: /^\*/ },
  { type: TokenType.Return, pattern: /^return/ },

  // Identifiers
  { type: TokenType.Identifier, pattern: /^\w+/ },
];