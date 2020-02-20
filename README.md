# Lexer
Generates stream of tokens based on the LexRules


## Installation
```sh
npm install @msnraju\lexer
```
## API

### Lexer class

- **constructor(rules: Array<ILexRule>, input: string)**

   Lexer takes rules, input as arguments. details are in Usage section.

- **next() : IToken**

   returns the next token.
   If lexer reached end of the stream, it will return Token with type 'EOF'

- **tokens(): IToken[]**

   This static method returns all available tokens as array.

### Lex Rule interface

This is input to lexer to extract tokens. 

- **name** 
   
   Name of the rule, this will be assigned to token type

- **expression**

   Regular Expression to extract the token value

### RuleName enumeration
This can be use as Rule Name for the following purposes.

- **RuleName.SKIP**
   
   Ignores the token

- **RuleName.ERROR**
   
   Throws runtime error.

## Usage
Sample code to generate tokens from code variable using lex rules.

```javascript
import { Lexer, ILexRule, RuleName } from "@msnraju/lexer";

const rules: Array<ILexRule> = [
    { name: 'ID', expression: '[a-zA-Z]+' },
    { name: 'INTEGER', expression: '[0-9]+' },
    { name: 'PLUS', expression: '[+]' },
    { name: 'MINUS', expression: '[-]' },
    { name: 'MUL', expression: '[*]' },
    { name: 'DIV', expression: '[/]' },
    { name: 'LPAREN', expression: '\\(' },
    { name: 'RPAREN', expression: '\\)' },
    { name: 'SEMICOLON', expression: ';' },
    { name: 'COMMA', expression: ',' },
    { name: 'DOT', expression: '\\.' },
    { name: 'ASSIGNMENT', expression: ':=' },
    { name: RuleName.SKIP, expression: '[ \\t\\n]' },
    { name: RuleName.ERROR, expression: '.' }
];

const code = `
    customer.age := 40;
    nextYearsAge := customer.age + 1;
    customer.age := nextYearsAge;
    customer.printAge();
`;

const tokens = Lexer.tokens(rules, code);
console.log(JSON.stringify(tokens, null));

```
### Output
```console
[{"value":"customer","type":"ID"},{"value":".","type":"DOT"},{"value":"age","type":"ID"},{"value":":=","type":"ASSIGNMENT"},{"value":"40","type":"INTEGER"},{"value":";","type":"SEMICOLON"},{"value":"nextYearsAge","type":"ID"},{"value":":=","type":"ASSIGNMENT"},{"value":"customer","type":"ID"},{"value":".","type":"DOT"},{"value":"age","type":"ID"},{"value":"+","type":"PLUS"},{"value":"1","type":"INTEGER"},{"value":";","type":"SEMICOLON"},{"value":"customer","type":"ID"},{"value":".","type":"DOT"},{"value":"age","type":"ID"},{"value":":=","type":"ASSIGNMENT"},{"value":"nextYearsAge","type":"ID"},{"value":";","type":"SEMICOLON"},{"value":"customer","type":"ID"},{"value":".","type":"DOT"},{"value":"printAge","type":"ID"},{"value":"(","type":"LPAREN"},{"value":")","type":"RPAREN"},{"value":";","type":"SEMICOLON"}]

```