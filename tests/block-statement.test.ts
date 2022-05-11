import { test } from './variable-declaration.test';

test('{}', {
  type: 'Program',
  body: [
    {
      type: 'BlockStatement',
      body: []
    }
  ]
});

test('2 + 2;', {
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
          type: 'NumberLiteral',
          value: 2,
        },
      }
    }
  ]
});

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
