import { test, testSingleBinaryExpression } from '../src/tests.utils';

describe('Arithmetic', () => {
  it('simple addition expression', () => {
    testSingleBinaryExpression('+');
  });

  it('chained addition expression', () => {
    test('3 + 2 + 2;', {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'NumberLiteral',
                value: 3,
              },
              right: {
                type: 'NumberLiteral',
                value: 2,
              },
            },
            right: {
              type: 'NumberLiteral',
              value: 2,
            },
          }
        }
      ]
    });
  });

  it('parenthesized expression', () => {
    test('(1 + 2) * 3;', {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '*',
            left: {
              type: 'BinaryExpression',
              operator: '+',
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
              type: 'NumberLiteral',
              value: 3,
            },
          }
        }
      ]
    });
  });
});
