import { test } from '../src/tests.utils';

describe('Class', () => {
  describe('Definition', () => {
    it('simple class declaration', () => {
      test(`class A {}`, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: []
            }
          }
        ]
      })
    });

    it('simple class declaration with inheritance', () => {
      test(`class A extends B {}`, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: {
              type: 'Identifier',
              name: 'B'
            },
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: []
            }
          }
        ]
      })
    });
  });

  describe('Property definition', () => {
    it('class with simple property definition', () => {
      test(`
        class A {
          a = 5;
        }
      `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'PropertyDefinition',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  value: {
                    type: 'NumberLiteral',
                    value: 5,
                  }
                }
              ]
            }
          }
        ]
      })
    });

    it('class with static property definition', () => {
      test(`
      class A {
        static a = 5;
      }
    `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'PropertyDefinition',
                  static: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  value: {
                    type: 'NumberLiteral',
                    value: 5,
                  }
                }
              ]
            }
          }
        ]
      })
    });

    it('class with computed property definition', () => {
      test(`
      class A {
        ['3' + 2] = 5;
      }
    `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'PropertyDefinition',
                  static: false,
                  computed: true,
                  key: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'StringLiteral',
                      value: '3'
                    },
                    right: {
                      type: 'NumberLiteral',
                      value: 2
                    }
                  },
                  value: {
                    type: 'NumberLiteral',
                    value: 5,
                  }
                }
              ]
            }
          }
        ]
      })
    });

    it('class with static computed property definition', () => {
      test(`
      class A {
        static ['3' + 2] = 5;
      }
    `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'PropertyDefinition',
                  static: true,
                  computed: true,
                  key: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'StringLiteral',
                      value: '3'
                    },
                    right: {
                      type: 'NumberLiteral',
                      value: 2
                    }
                  },
                  value: {
                    type: 'NumberLiteral',
                    value: 5,
                  }
                }
              ]
            }
          }
        ]
      })
    });
  });

  describe('Method definition', () => {
    it('class with simple method definition', () => {
      test(`
      class A {
        func() {}
      }
    `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  static: false,
                  computed: false,
                  kind: 'method',
                  key: {
                    type: 'Identifier',
                    name: 'func'
                  },
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    expression: false,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    }
                  }
                }
              ]
            }
          }
        ]
      })
    });

    it('class with async method definition', () => {
      test(`
      class A {
        async func(x, y = 3) {}
      }
    `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  static: false,
                  computed: false,
                  kind: 'method',
                  key: {
                    type: 'Identifier',
                    name: 'func'
                  },
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    expression: false,
                    generator: false,
                    async: true,
                    params: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        right: {
                          type: 'NumberLiteral',
                          value: 3
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    }
                  }
                }
              ]
            }
          }
        ]
      })
    });

    it('class with set method definition', () => {
      test(`
      class A {
        set func(x) {}
      }
    `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  static: false,
                  computed: false,
                  kind: 'set',
                  key: {
                    type: 'Identifier',
                    name: 'func'
                  },
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    expression: false,
                    generator: false,
                    async: false,
                    params: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    }
                  }
                }
              ]
            }
          }
        ]
      })
    });

    it('class with get method definition', () => {
      test(`
      class A {
        get func(x) {}
      }
    `, {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            superClass: null,
            id: {
              type: 'Identifier',
              name: 'A'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  static: false,
                  computed: false,
                  kind: 'get',
                  key: {
                    type: 'Identifier',
                    name: 'func'
                  },
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    expression: false,
                    generator: false,
                    async: false,
                    params: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    }
                  }
                }
              ]
            }
          }
        ]
      })
    });
  });


  describe('Expression', () => {
    it('class expression', () => {
      test(`5 + class A {};`, {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'NumberLiteral',
                value: 5
              },
              right: {
                type: 'ClassExpression',
                superClass: null,
                id: {
                  type: 'Identifier',
                  name: 'A'
                },
                body: {
                  type: 'ClassBody',
                  body: []
                }
              }
            }
          }
        ]
      })
    });

    it('class expression with inheritance', () => {
      test(`5 + class A extends B {};`, {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'NumberLiteral',
                value: 5
              },
              right: {
                type: 'ClassExpression',
                superClass: {
                  type: 'Identifier',
                  name: 'B'
                },
                id: {
                  type: 'Identifier',
                  name: 'A'
                },
                body: {
                  type: 'ClassBody',
                  body: []
                }
              }
            }
          }
        ]
      })
    });
  });
});
