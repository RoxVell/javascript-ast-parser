import { test, testSingleBinaryExpression } from '../src/tests.utils';

describe('Logical operators', () => {
  it('simple && operator', () => {
    testSingleBinaryExpression('&&', 'LogicalExpression');
  });

  it('simple || operator', () => {
    testSingleBinaryExpression('||', 'LogicalExpression');
  });

  it('logical operator inside complex expression', () => {
    test(`x > 5 === 5 || y < 5;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '||',
            left: {
              type: 'BinaryExpression',
              operator: '===',
              left: {
                type: 'BinaryExpression',
                operator: '>',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'NumberLiteral',
                  value: 5
                },
              },
              right: {
                type: 'NumberLiteral',
                value: 5
              }
            },
            right: {
              type: 'BinaryExpression',
              operator: '<',
              left: {
                type: 'Identifier',
                name: 'y'
              },
              right: {
                type: 'NumberLiteral',
                value: 5
              },
            },
          }
        }
      ]
    });
  });

  it('nullish coalescing', () => {
    testSingleBinaryExpression('??', 'LogicalExpression');
  });

  it('chained nullish coalescing', () => {
    test(`null ?? true ?? false;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '??',
            left: {
              type: 'LogicalExpression',
              operator: '??',
              left: {
                type: 'NullLiteral',
                value: null,
              },
              right: {
                type: 'BooleanLiteral',
                value: true,
              }
            },
            right: {
              type: 'BooleanLiteral',
              value: false,
            }
          }
        }
      ]
    });
  });
});
