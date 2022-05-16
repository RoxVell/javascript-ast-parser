import { test } from '../src/tests.utils';

describe('Conditional expression', () => {
  it('simple conditional expression', () => {
    test(`2 + 2 === 4 ? 'Right' : 'Wrong';`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'BinaryExpression',
              operator: '===',
              left: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                  type: 'NumberLiteral',
                  value: 2,
                },
                right: {
                  type: 'NumberLiteral',
                  value: 2,
                },
              },
              right: {
                type: 'NumberLiteral',
                value: 4,
              }
            },
            consequent: {
              type: 'StringLiteral',
              value: 'Right'
            },
            alternate: {
              type: 'StringLiteral',
              value: 'Wrong'
            },
          }
        }
      ]
    });
  });

  it('nested conditional expressions', () => {
    test(`
      true 
        ? false
          ? 1
          : 2
        : 5
          ? true
          : false;
    `, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'BooleanLiteral',
              value: true,
            },
            consequent: {
              type: 'ConditionalExpression',
              test: {
                type: 'BooleanLiteral',
                value: false,
              },
              consequent: {
                type: 'NumberLiteral',
                value: 1,
              },
              alternate: {
                type: 'NumberLiteral',
                value: 2,
              },
            },
            alternate: {
              type: 'ConditionalExpression',
              test: {
                type: 'NumberLiteral',
                value: 5,
              },
              consequent: {
                type: 'BooleanLiteral',
                value: true,
              },
              alternate: {
                type: 'BooleanLiteral',
                value: false,
              },
            },
          }
        }
      ]
    })
  });
})
