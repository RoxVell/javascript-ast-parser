import { test, testSingleBinaryExpression } from '../src/tests.utils';

describe('Comparison operators', () => {
  it('simple equality comparison', () => {
    testSingleBinaryExpression('===');
  });

  it('simple greater than comparison', () => {
    testSingleBinaryExpression('>=');
  });

  it('negative equality', () => {
    testSingleBinaryExpression('!==');
  });

  it('correct order with equality operator and relational', () => {
    test(`x + 5 === 10 > true;`, {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "BinaryExpression",
            left: {
              type: "BinaryExpression",
              left: {
                type: "Identifier",
                name: "x"
              },
              operator: "+",
              right: {
                type: "NumberLiteral",
                value: 5,
              }
            },
            operator: "===",
            right: {
              type: "BinaryExpression",
              left: {
                type: "NumberLiteral",
                value: 10,
              },
              operator: ">",
              right: {
                type: "BooleanLiteral",
                value: true,
              }
            }
          }
        }
      ],
    });
  });
});
