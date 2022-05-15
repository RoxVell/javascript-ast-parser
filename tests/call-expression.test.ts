import { test } from './variable-declaration.test';

describe('CallExpression', () => {
  it('identifier call with no arguments', () => {
    test(`func();`, {
      type: "Program",
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'func'
            },
            arguments: []
          }
        }
      ]
    });
  });

  it('member expression call', () => {
    test(`console.log();`, {
      type: "Program",
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'console'
              },
              property: {
                type: 'Identifier',
                name: 'log'
              },
              computed: false,
            },
            arguments: [],
          }
        }
      ]
    });
  });

  it('single identifier call with arguments', () => {
    test(`func(1, x);`, {
      type: "Program",
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'func'
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: 1,
              },
              {
                type: 'Identifier',
                name: 'x'
              }
            ]
          }
        }
      ]
    });
  });

  it('chained function calls', () => {
    test(`func()();`, {
      type: "Program",
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'func'
              },
              arguments: []
            },
            arguments: []
          }
        }
      ]
    });
  });
});
