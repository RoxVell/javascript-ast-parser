import { test } from '../variable-declaration.test';

describe('Number Literal', () => {
  it('Single quote string', () => {
    test(`'Hello World';`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'Hello World'
          },
        }
      ]
    })
  });

  it('Double quote string', () => {
    test(`"Hello World";`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'Hello World'
          },
        }
      ]
    })
  });
});
