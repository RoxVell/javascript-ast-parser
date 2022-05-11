import { test } from './variable-declaration.test';

describe('WhileStatement', () => {
  it('simple while statement', () => {
    test('while (true) {}', {
      type: 'Program',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'BooleanLiteral',
            value: true,
          },
          body: {
            type: 'BlockStatement',
            body: []
          }
        },
      ]
    })
  });

  it('simple while statement with body empty statement', () => {
    test('while (true) ;', {
      type: 'Program',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'BooleanLiteral',
            value: true,
          },
          body: {
            type: 'EmptyStatement',
          }
        },
      ]
    })
  });

  it('simple do while statement', () => {
    test(`do {} while (true)`, {
      type: 'Program',
      body: [
        {
          type: 'DoWhileStatement',
          test: {
            type: 'BooleanLiteral',
            value: true,
          },
          body: {
            type: 'BlockStatement',
            body: []
          }
        },
      ]
    })
  });

  it('simple do while statement with body empty statement', () => {
    test(`do ; while (true)`, {
      type: 'Program',
      body: [
        {
          type: 'DoWhileStatement',
          test: {
            type: 'BooleanLiteral',
            value: true,
          },
          body: {
            type: 'EmptyStatement',
          }
        },
      ]
    })
  });
})
