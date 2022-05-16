import { test } from '../variable-declaration.test';

describe('Null literal', () => {
  it('simple null expression', () => {
    test(`null;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NullLiteral',
            value: null
          }
        }
      ]
    });
  });
});
