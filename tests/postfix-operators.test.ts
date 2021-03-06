import { test } from '../src/tests.utils';

describe('Postfix operators', () => {
  it(`postfix increment`, () => {
    test(`x++;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            operator: '++',
            prefix: false,
            argument: {
              type: 'Identifier',
              name: 'x'
            }
          },
        }
      ]
    });
  });

  it(`prefix and postfix increment`, () => {
    test(`x--;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            operator: '--',
            prefix: false,
            argument: {
              type: 'Identifier',
              name: 'x'
            },
          },
        }
      ]
    });
  });
});
