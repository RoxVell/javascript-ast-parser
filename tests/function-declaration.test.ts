import { test } from '../src/tests.utils';

describe('FunctionDeclaration', () => {
  it('simple function with empty body', () => {
    test('function name() {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
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
      ]
    });
  });

  it('simple async function with empty body', () => {
    test('async function name() {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'name'
          },
          async: true,
          generator: false,
          params: [],
          body: {
            type: 'BlockStatement',
            body: []
          }
        }
      ]
    });
  });

  it('simple generator function with empty body', () => {
    test('function* name() {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'name'
          },
          async: false,
          generator: true,
          params: [],
          body: {
            type: 'BlockStatement',
            body: []
          }
        }
      ]
    });
  });

  it('async generator function', () => {
    test('async function* name() {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'name'
          },
          async: true,
          generator: true,
          params: [],
          body: {
            type: 'BlockStatement',
            body: []
          }
        }
      ]
    });
  });

  it('function with single param', () => {
    test('function name(a) {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'name'
          },
          async: false,
          generator: false,
          params: [
            {
              type: 'Identifier',
              name: 'a'
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          }
        }
      ]
    });
  });

  it('function with single assignment param', () => {
    test('function name(a = 5) {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'name'
          },
          async: false,
          generator: false,
          params: [
            {
              type: 'AssignmentPattern',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'NumberLiteral',
                value: 5
              }
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          }
        }
      ]
    });
  });

  it('function with multiple arguments', () => {
    test('function name(a, b) {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'name'
          },
          async: false,
          generator: false,
          params: [
            {
              type: 'Identifier',
              name: 'a'
            },
            {
              type: 'Identifier',
              name: 'b'
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          }
        }
      ]
    });
  })

  it('function with multiple arguments', () => {
    test('function name(a, b = 5, c) {}', {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'name'
          },
          async: false,
          generator: false,
          params: [
            {
              type: 'Identifier',
              name: 'a'
            },
            {
              type: 'AssignmentPattern',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'NumberLiteral',
                value: 5
              }
            },
            {
              type: 'Identifier',
              name: 'c'
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          }
        }
      ]
    });
  });
})
