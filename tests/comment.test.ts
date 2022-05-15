import { test } from './variable-declaration.test';

describe('Comments', () => {
  it('ignore single line comment', () => {
    test(`// some comment`, {
      type: 'Program',
      body: []
    });
  });

  it('ignore single line comment as a part of the expression', () => {
    test(`let a = 5; // some comment`, {
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
    });
  });

  it('multiline comments', () => {
    test(`
      /*
        Some comment that 
        takes 2 lines
      */
    `, {
      type: 'Program',
      body: []
    });
  });

  it('comments inside class body', () => {
    test(`
      class A {
        // single line comment
        /*
          Multiline comment
        */
        a = 5;
      }
    `, {
      type: 'Program',
      body: [
        {
          type: 'ClassDeclaration',
          superClass: null,
          id: {
            type: 'Identifier',
            name: 'A'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'PropertyDefinition',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'a'
                },
                value: {
                  type: 'NumberLiteral',
                  value: 5,
                }
              }
            ]
          }
        }
      ]
    })
  })
});
