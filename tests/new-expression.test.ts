import { test } from '../src/tests.utils';

describe('New Expression', () => {
  it('new expression with no arguments', () => {
    test(`new SomeClass();`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            callee: {
              type: 'Identifier',
              name: 'SomeClass'
            },
            arguments: [],
          },
        }
      ]
    })
  });

  it('new expression with arguments', () => {
    test(`new SomeClass(1, null);`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            callee: {
              type: 'Identifier',
              name: 'SomeClass'
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: 1
              },
              {
                type: 'NullLiteral',
                value: null,
              },
            ],
          },
        }
      ]
    });
  });

  it('new expression with no call', () => {
    test(`new SomeClass;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            callee: {
              type: 'Identifier',
              name: 'SomeClass'
            },
            arguments: [],
          },
        }
      ]
    });
  });

  it('new expression with member expression callee', () => {
    test(`new SomeObject.SomeClass();`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'SomeObject'
              },
              property: {
                type: 'Identifier',
                name: 'SomeClass'
              },
              optional: false,
              computed: false,
            },
            arguments: [],
          },
        }
      ]
    });
  });
});
