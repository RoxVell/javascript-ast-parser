export enum TokenType {
  Number = 'Number',
  String = 'String',
  Semicolon = 'Semicolon',
  Colon = 'Colon',
  Boolean = 'Boolean',
  OpenBracket = 'OpenBracket',
  CloseBracket = 'CloseBracket',
  AdditiveOperator = 'AdditiveOperator',
  MultiplicativeOperator = 'MultiplicativeOperator',
  OpenParentheses = 'OpenParentheses',
  CloseParentheses = 'CloseParentheses',
  OpenSquareBracket = 'OpenSquareBracket',
  OptionalOpenSquareBracket = 'OptionalOpenSquareBracket',
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
  Class = 'Class',
  Extends = 'Extends',
  Get = 'Get',
  Set = 'Set',
  Static = 'Static',
  This = 'This',
  QuestionMark = 'QuestionMark',
  New = 'New',
  OptionalDot = 'OptionalDot',
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

  // Comparisons
  { type: TokenType.EqualityOperator, pattern: /^[=!]==?/ },
  { type: TokenType.RelationalOperator, pattern: /^(\>|\<)\=?/ },

  // Logical operators
  { type: TokenType.LogicalOr, pattern: /^\|\|/ },
  { type: TokenType.LogicalAnd, pattern: /^&&/ },

  // Assignments
  { type: TokenType.SimpleAssignment, pattern: /^\=/ },
  { type: TokenType.ComplexAssignment, pattern: /^(\*|\/|\+|\-)\=/ },

  { type: TokenType.Class, pattern: /^class/ },
  { type: TokenType.New, pattern: /^new/ },
  { type: TokenType.Extends, pattern: /^extends/ },
  { type: TokenType.Get, pattern: /^get/ },
  { type: TokenType.Set, pattern: /^set/ },
  { type: TokenType.Static, pattern: /^static/ },
  { type: TokenType.This, pattern: /^this/ },

  // Comments
  { type: null, pattern: /^\/\/.*/ },
  { type: null, pattern: /^\/\*[\S\s]*?\*\// },

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

  // Signs
  { type: TokenType.Semicolon, pattern: /^;/ },
  { type: TokenType.Colon, pattern: /^:/ },
  { type: TokenType.Comma, pattern: /^,/ },
  { type: TokenType.Dot, pattern: /^\./ },
  { type: TokenType.OptionalDot, pattern: /^\?\./ },
  { type: TokenType.OptionalOpenSquareBracket, pattern: /^\?\[/ },
  { type: TokenType.QuestionMark, pattern: /^\?/ },

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
