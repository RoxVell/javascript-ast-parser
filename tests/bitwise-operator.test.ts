import { test, testSingleBinaryExpression } from '../src/tests.utils';

describe('Bitwise operator', () => {
  it('bitwise and (&)', () => {
    testSingleBinaryExpression('&', 'LogicalExpression');
  });

  it('bitwise or (|)', () => {
    testSingleBinaryExpression('|', 'LogicalExpression');
  });

  it('bitwise xor (^)', () => {
    testSingleBinaryExpression('^', 'LogicalExpression');
  });

  it('correct order', () => {
    test(`1 & 2 | 3 ^ 4;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '|',
            left: {
              type: 'LogicalExpression',
              operator: '&',
              left: {
                type: 'NumberLiteral',
                value: 1,
              },
              right: {
                type: 'NumberLiteral',
                value: 2,
              },
            },
            right: {
              type: 'LogicalExpression',
              operator: '^',
              left: {
                type: 'NumberLiteral',
                value: 3,
              },
              right: {
                type: 'NumberLiteral',
                value: 4,
              },
            },
          }
        }
      ]
    });
  });

  it('correct order', () => {
    test(`1 | 2 & 3 ^ 4;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '|',
            left: {
              type: 'NumberLiteral',
              value: 1,
            },
            right: {
              type: 'LogicalExpression',
              operator: '^',
              left: {
                type: 'LogicalExpression',
                operator: '&',
                left: {
                  type: 'NumberLiteral',
                  value: 2,
                },
                right: {
                  type: 'NumberLiteral',
                  value: 3,
                },
              },
              right: {
                type: 'NumberLiteral',
                value: 4,
              },
            },
          }
        }
      ]
    });
  });
});
