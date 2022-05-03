import { test } from './block-statement';

test('let y;', {
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
            name: 'y'
          },
          init: null,
        }
      ]
    }
  ]
});

test('let x, y;', {
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
            name: 'x'
          },
          init: null,
        },
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'y'
          },
          init: null,
        }
      ]
    }
  ]
});

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
            type: 'NumericLiteral',
            value: 5,
          },
        }
      ]
    }
  ]
});

test('let a, b = 5;', {
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
          init: null
        },
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'b'
          },
          init: {
            type: 'NumericLiteral',
            value: 5,
          },
        }
      ]
    }
  ]
})


