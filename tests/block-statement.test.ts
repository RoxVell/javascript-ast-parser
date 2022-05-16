import { test } from '../src/tests.utils';

describe('Block statement', () => {
  it('simple block statement', () => {
    test('{}', {
      type: 'Program',
      body: [
        {
          type: 'BlockStatement',
          body: []
        }
      ]
    });
  });
});
