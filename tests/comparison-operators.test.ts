import { test } from './variable-declaration.test';

describe('Comparison operators', () => {
  it('simple equality comparison', () => {
    test(`5 === 5;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '===',
            left: {
              type: 'NumberLiteral',
              value: 5
            },
            right: {
              type: 'NumberLiteral',
              value: 5
            },
          }
        }
      ]
    })
  });

  it('simple greater than comparison', () => {
    test(`5 >= 5;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '>=',
            left: {
              type: 'NumberLiteral',
              value: 5
            },
            right: {
              type: 'NumberLiteral',
              value: 5
            },
          }
        }
      ]
    })
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
    })
  });

  it('negative equality', () => {
    test(`5 !== null;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '!==',
            left: {
              type: "NumberLiteral",
              value: 5,
            },
            right: {
              type: 'NullLiteral',
              value: null
            }
          }
        }
      ]
    })
  })
});
