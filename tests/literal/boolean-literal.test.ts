import { test } from '../variable-declaration.test';

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

test(`false;`, {
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
