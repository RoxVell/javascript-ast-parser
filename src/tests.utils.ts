import { Parser } from './parser';

export function test(program: string, expectedResult) {
  const parser = new Parser();
  const ast = parser.parse(program);
  return expect(ast).toStrictEqual(expectedResult);
}

export function testSingleBinaryExpression(binaryOperator, type = 'BinaryExpression') {
  return test(`1 ${binaryOperator} 2;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type,
          operator: binaryOperator,
          left: {
            type: 'NumberLiteral',
            value: 1,
          },
          right: {
            type: 'NumberLiteral',
            value: 2,
          },
        }
      }
    ]
  });
}
