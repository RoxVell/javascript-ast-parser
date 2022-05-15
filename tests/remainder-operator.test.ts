import { test } from './variable-declaration.test';

describe('Remainder operator', () => {
  it('single remainder operator', () => {
    test(`5 % 2;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '%',
            left: {
              type: 'NumberLiteral',
              value: 5,
            },
            right: {
              type: 'NumberLiteral',
              value: 2,
            }
          }
        }
      ]
    });
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
