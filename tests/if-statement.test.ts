import { test } from './variable-declaration.test';

describe('IfStatement', () => {
  it('if statement with empty block statement', () => {
    test('if (true) {}', {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'BooleanLiteral',
            value: true
          },
          consequent: {
            type: 'BlockStatement',
            body: []
          },
          alternate: null,
        }
      ]
    });
  });

  it('if statement with empty block statement and empty else statement', () => {
    test('if (true) {} else {}', {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'BooleanLiteral',
            value: true
          },
          consequent: {
            type: 'BlockStatement',
            body: []
          },
          alternate: {
            type: 'BlockStatement',
            body: []
          },
        }
      ]
    });
  });

  it('if statement with complex condition expression', () => {
    test('if (x = 1 + 2 + (3 / 4)) {}', {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'x',
            },
            right: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                  type: 'NumberLiteral',
                  value: 1
                },
                right: {
                  type: 'NumberLiteral',
                  value: 2
                }
              },
              right: {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                  type: 'NumberLiteral',
                  value: 3
                },
                right: {
                  type: 'NumberLiteral',
                  value: 4
                }
              }
            }
          },
          consequent: {
            type: 'BlockStatement',
            body: []
          },
          alternate: null,
        }
      ]
    });
  });

  it('if statement with multiple alternates', () => {
    test('if (true) {} else if (false) {} else {}', {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'BooleanLiteral',
            value: true
          },
          consequent: {
            type: 'BlockStatement',
            body: []
          },
          alternate: {
            type: 'IfStatement',
            test: {
              type: 'BooleanLiteral',
              value: false
            },
            consequent: {
              type: 'BlockStatement',
              body: []
            },
            alternate: {
              type: 'BlockStatement',
              body: []
            }
          },
        }
      ]
    });
  });
});
