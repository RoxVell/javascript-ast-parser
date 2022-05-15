import { test } from './variable-declaration.test';

describe('Object expression', () => {
  it('simple object expression', () => {
    test(`({});`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ObjectExpression',
            properties: [],
          }
        }
      ]
    })
  });

  it('simple object expression with property', () => {
    test(`({ name: 'Anton' });`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'ObjectProperty',
                method: false,
                shorthand: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'name'
                },
                value: {
                  type: 'StringLiteral',
                  value: 'Anton',
                },
              }
            ],
          }
        }
      ]
    })
  });

  it('simple object expression with computed property', () => {
    test(`({ [name]: 'Anton' });`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'ObjectProperty',
                method: false,
                shorthand: false,
                computed: true,
                key: {
                  type: 'Identifier',
                  name: 'name'
                },
                value: {
                  type: 'StringLiteral',
                  value: 'Anton',
                },
              }
            ],
          }
        }
      ]
    })
  });

  it('simple object expression with method', () => {
    test(`({ func: function() {} });`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'ObjectProperty',
                method: false,
                shorthand: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'func'
                },
                value: {
                  type: 'FunctionExpression',
                  id: null,
                  async: false,
                  generator: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  }
                },
              }
            ],
          }
        }
      ]
    })
  });
});
