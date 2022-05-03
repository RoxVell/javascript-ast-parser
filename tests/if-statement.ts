import { test } from './block-statement';

test(`if (5) {}`, {
  "type": "Program",
  "body": [
    {
      "type": "IfStatement",
      "test": {
        "type": "NumericLiteral",
        "value": 5,
      },
      "consequent": {
        "type": "BlockStatement",
        "body": []
      },
      "alternate": null
    }
  ],
});

test(`
  if (true) {
    let a = 5;
  } else {
    let a = 10;
  }
`, {
  "type": "Program",
  "body": [
    {
      "type": "IfStatement",
      "test": {
        "type": "BooleanLiteral",
        "value": true,
      },
      "consequent": {
        type: "BlockStatement",
        "body": [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'a'
                },
                init: {
                  type: 'NumericLiteral',
                  value: 5
                }
              }
            ]
          }
        ]
      },
      "alternate": null
    }
  ],
});
