import * as assert from 'assert';
import { Parser } from '../parser';

function test(program: string, expectedResult: any) {
  console.log('test')
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

test('2 + 2', {
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

test('3 + 2 + 2', {
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
