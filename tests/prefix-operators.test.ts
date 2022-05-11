import { test } from './variable-declaration.test';

describe('Unary operators', () => {
  it('single increment prefix operator', () => {
    test(`++x;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            operator: '++',
            prefix: true,
            argument: {
              type: 'Identifier',
              name: 'x'
            },
          }
        }
      ]
    });
  });

  it('single decrement prefix operator', () => {
    test(`--x;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            operator: '--',
            prefix: true,
            argument: {
              type: 'Identifier',
              name: 'x'
            },
          }
        }
      ]
    });
  });

  it('single exclamation prefix operator', () => {
    test(`!x;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            prefix: true,
            argument: {
              type: 'Identifier',
              name: 'x'
            },
          }
        }
      ]
    });
  });

  it('single void prefix operator', () => {
    test(`void x;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'void',
            prefix: true,
            argument: {
              type: 'Identifier',
              name: 'x'
            },
          }
        }
      ]
    });
  });

  it('single typeof prefix operator', () => {
    test(`typeof x;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'typeof',
            prefix: true,
            argument: {
              type: 'Identifier',
              name: 'x'
            },
          }
        }
      ]
    });
  });

  it('single unary increment operator', () => {
    test(`+x;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '+',
            prefix: true,
            argument: {
              type: 'Identifier',
              name: 'x'
            },
          }
        }
      ]
    });
  });

  it('additive expression with unary decrement operator', () => {
    test(`5 + -x;`, {
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
              type: 'UnaryExpression',
              operator: '-',
              prefix: true,
              argument: {
                type: 'Identifier',
                name: 'x'
              },
            },
          }
        }
      ]
    });
  });

  it('additive expression with unary operator', () => {
    test(`5 + !x;`, {
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
              type: 'UnaryExpression',
              operator: '!',
              prefix: true,
              argument: {
                type: 'Identifier',
                name: 'x'
              },
            },
          }
        }
      ]
    });
  });

  it('single await expression', () => {
    test(`await 5;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AwaitExpression',
            argument: {
              type: 'NumberLiteral',
              value: 5
            },
          }
        }
      ]
    });
  });

  it('single delete expression', () => {
    test(`delete 5;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            prefix: true,
            argument: {
              type: 'NumberLiteral',
              value: 5
            },
          }
        }
      ]
    });
  });
});
