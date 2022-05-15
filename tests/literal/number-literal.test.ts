import { test } from '../variable-declaration.test';

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
