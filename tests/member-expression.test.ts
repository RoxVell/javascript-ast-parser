import { test } from './variable-declaration.test';

describe('Member expression', () => {
  it('simple member expression', () => {
    test(`a.b;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: false,
            computed: false,
          }
        }
      ]
    });
  });

  it('multiple member expression', () => {
    test(`a.b.c;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'a',
              },
              property: {
                type: 'Identifier',
                name: 'b',
              },
              optional: false,
              computed: false,
            },
            property: {
              type: 'Identifier',
              name: 'c',
            },
            optional: false,
            computed: false,
          }
        }
      ]
    });
  });

  it('computed member expression', () => {
    test(`a[b];`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: false,
            computed: true,
          }
        }
      ]
    });
  });

  it('multiple computed member expression', () => {
    test(`a[b]['c'];`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'a',
              },
              property: {
                type: 'Identifier',
                name: 'b',
              },
              optional: false,
              computed: true,
            },
            property: {
              type: 'StringLiteral',
              value: 'c',
            },
            optional: false,
            computed: true,
          }
        }
      ]
    });
  });

  it('optional non-computed member chaining', () => {
    test(`a?.b;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: true,
            computed: false,
          }
        }
      ]
    });
  });

  it('optional computed member chaining', () => {
    test(`a?.[b];`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: true,
            computed: true,
          }
        }
      ]
    });
  });

  it('multiple optional computed member chaining', () => {
    test(`a?.[b]?.c;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'a',
              },
              property: {
                type: 'Identifier',
                name: 'b',
              },
              optional: true,
              computed: true,
            },
            property: {
              type: 'Identifier',
              name: 'c',
            },
            optional: true,
            computed: false,
          }
        }
      ]
    });
  });
})
