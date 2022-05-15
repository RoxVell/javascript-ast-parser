import { test } from './variable-declaration.test';

describe('Member expression', () => {
  it('simple member expression', () => {
    test(`a.b;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: false,
            computed: false,
          }
        }
      ]
    });
  });

  it('computed member expression', () => {
    test(`a[b];`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: false,
            computed: true,
          }
        }
      ]
    });
  });

  it('optional non-computed member chaining', () => {
    test(`a?.b;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: true,
            computed: false,
          }
        }
      ]
    });
  });

  it('optional computed member chaining', () => {
    test(`a?[b];`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'a',
            },
            property: {
              type: 'Identifier',
              name: 'b',
            },
            optional: true,
            computed: true,
          }
        }
      ]
    });
  });
})
