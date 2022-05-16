import { test } from '../src/tests.utils';

describe('For Statement', () => {
  it('for statement with nulls', () => {
    test(`for (;;) ;`, {
      type: 'Program',
      body: [
        {
          type: 'ForStatement',
          init: null,
          test: null,
          update: null,
          body: {
            type: 'EmptyStatement'
          }
        }
      ]
    });
  });

  it('for statement with arguments', () => {
    test(`for (let i = 0; i < 10; i += 1) {}`, {
      type: 'Program',
      body: [
        {
          type: 'ForStatement',
          init: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'i'
                },
                init: {
                  type: 'NumberLiteral',
                  value: 0,
                }
              }
            ]
          },
          test: {
            type: 'BinaryExpression',
            operator: '<',
            left: {
              type: 'Identifier',
              name: 'i'
            },
            right: {
              type: 'NumberLiteral',
              value: 10,
            }
          },
          update: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'Identifier',
              name: 'i'
            },
            right: {
              type: 'NumberLiteral',
              value: 1,
            }
          },
          body: {
            type: 'BlockStatement',
            body: [],
          },
        }
      ]
    });
  });

  it('for statement with only init', () => {
    test(`for (let i = 0;;) {}`, {
      type: 'Program',
      body: [
        {
          type: 'ForStatement',
          init: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'i'
                },
                init: {
                  type: 'NumberLiteral',
                  value: 0,
                }
              }
            ]
          },
          test: null,
          update: null,
          body: {
            type: 'BlockStatement',
            body: [],
          },
        }
      ]
    });
  });
})
