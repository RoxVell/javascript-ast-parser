import { test } from '../../src/tests.utils';

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
