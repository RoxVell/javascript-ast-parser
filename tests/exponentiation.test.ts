import { test, testSingleBinaryExpression } from '../src/tests.utils';

describe('Exponentiation', () => {
  it('single exponentiation', () => {
    testSingleBinaryExpression('**');
  });

  it('multiple exponentiation', () => {
    test(`5 ** 2 ** 3;`,  {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '**',
            left: {
              type: 'BinaryExpression',
              operator: '**',
              left: {
                type: 'NumberLiteral',
                value: 5,
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
