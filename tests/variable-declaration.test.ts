import { Parser } from '../src/parser';

export function test(program: string, expectedResult) {
  const parser = new Parser();
  const ast = parser.parse(program);
  return expect(ast).toStrictEqual(expectedResult);
}

describe('Variable declaration', () => {
  it('single let variable declaration', () => {
    test('let a = 5;', {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a'
              },
              init: {
                type: 'NumberLiteral',
                value: 5
              }
            }
          ]
        }
      ]
    })
  });

  it('single let variable with complex declaration', () => {
    test('let a = 5 + 5;', {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a'
              },
              init: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                  type: 'NumberLiteral',
                  value: 5,
                },
                right: {
                  type: 'NumberLiteral',
                  value: 5,
                },
              }
            }
          ]
        }
      ]
    })
  });

  it('single const variable declaration with no initialization', () => {
    test('const a;', {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a'
              },
              init: null,
            }
          ]
        }
      ]
    })
  });

  it('multiple let variable declarations', () => {
    test('let a = 5, b = 10;', {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a'
              },
              init: {
                type: 'NumberLiteral',
                value: 5
              }
            },
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'b'
              },
              init: {
                type: 'NumberLiteral',
                value: 10
              }
            }
          ]
        }
      ]
    })
  });
});
