import { test, testSingleBinaryExpression } from '../src/tests.utils';

describe('Remainder operator', () => {
  it('single remainder operator', () => {
    testSingleBinaryExpression('%');
  });

  it('correct precedence', () => {
    test(`2 + 3 % 2 * 7;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumberLiteral',
              value: 2,
            },
            right: {
              type: 'BinaryExpression',
              operator: '*',
              left: {
                type: 'BinaryExpression',
                operator: '%',
                left: {
                  type: 'NumberLiteral',
                  value: 3,
                },
                right: {
                  type: 'NumberLiteral',
                  value: 2,
                }
              },
              right: {
                type: 'NumberLiteral',
                value: 7,
              }
            }
          }
        }
      ]
    });
  });
});
