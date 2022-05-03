import * as assert from 'assert';
import { Parser } from '../parser';

export function test(program: string, expectedResult: any) {
  const parser = new Parser();
  const result = parser.parse(program);
  assert.deepStrictEqual(result, expectedResult);
}

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
          type: 'NumericLiteral',
          value: 2,
        },
        right: {
          type: 'NumericLiteral',
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
            type: 'NumericLiteral',
            value: 3,
          },
          right: {
            type: 'NumericLiteral',
            value: 2,
          },
        },
        right: {
          type: 'NumericLiteral',
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
            type: 'NumericLiteral',
            value: 1,
          },
          right: {
            type: 'NumericLiteral',
            value: 2,
          },
        },
        right: {
          type: 'NumericLiteral',
          value: 3,
        },
      }
    }
  ]
});
