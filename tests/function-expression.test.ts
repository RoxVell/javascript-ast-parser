import { test } from '../src/tests.utils';

describe('Function expression', () => {
  it('simple function expression', () => {
    test(`(function name() {});`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'FunctionExpression',
            id: {
              type: 'Identifier',
              name: 'name'
            },
            async: false,
            generator: false,
            params: [],
            body: {
              type: 'BlockStatement',
              body: []
            }
          }
        }
      ]
    });
  });
});
