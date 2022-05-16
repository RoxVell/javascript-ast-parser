import { test } from '../../src/tests.utils';

describe('Boolean literal', () => {
  it('true literal', () => {
    test(`true;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BooleanLiteral',
            value: true,
          }
        }
      ]
    });
  });

  it('false literal', () => {
    test(`false;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BooleanLiteral',
            value: false,
          }
        }
      ]
    });
  });
});
