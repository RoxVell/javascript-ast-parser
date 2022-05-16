import { test } from '../src/tests.utils';

function testAssignmentExpression(operator: string) {
  it(operator, () => {
    test(`x ${operator} 3;`, {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: operator,
            left: {
              type: 'Identifier',
              name: 'x'
            },
            right: {
              type: 'NumberLiteral',
              value: 3
            }
          }
        }
      ]
    });
  });
}

const ASSIGNMENT_OPERATORS = ['=', '+=', '-=', '*=', '/=', '%=', '**=', '<<=', '>>=', '>>>=', '&=', '^=', '|=', '&&=', '||=', '??='];

describe('Assignment expression', () => {
  for (const operator of ASSIGNMENT_OPERATORS) {
    testAssignmentExpression(operator);
  }
});
