import { test } from '../../src/tests.utils';

describe('Number Literal', () => {
  it('Integer literal', () => {
    test(`5;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumberLiteral',
            value: 5
          },
        }
      ]
    })
  })
})
