# Lexer

This library can be used to generate tokens from the source code string. This will take Rules, source code as input and generates tokens. Tokenization is the first part of writing compilers.

You can extract tokens one by one by using ```next()``` function or you can toke use ```tokens()``` function to extract all tokens as array.

## Installation

```sh
npm install @msnraju/lexer
```

## API

### Lexer class

This is the class to extract tokens.

- **constructor(rules: Array<ILexRule>, input: string)**

  Lexer takes rules, input as arguments. details are in Usage section.

- **next() : IToken**

  returns the next token.
  If lexer reached end of the stream, it will return Token with type 'EOF'

- **tokens(): IToken[]**

  This static method returns all available tokens as array.

### Lex Rule interface

Rule is a simple regular expression with a name. 

- **name**

  Name of the rule, this will be assigned to token type

- **expression**

  Regular Expression to extract the token value

### RuleName enumeration

This can be used as Rule Name for the following purposes.

- **RuleName.SKIP**

  Ignores the token

- **RuleName.ERROR**
  Throws runtime error.

## Usage

The following sample code to extract tokens using lex rules.

```javascript
import { Lexer, ILexRule, RuleName } from '@msnraju/lexer';

const rules: Array<ILexRule> = [
  { name: 'VALUE', expression: /[a-zA-Z_]*/ },
  { name: 'EQUALS', expression: /=/ },
  { name: 'PLUS', expression: /\+/ },
  { name: 'NUMBER', expression: /[0-9]+/ },
  { name: 'SEMICOLON', expression: /;/ },
  { name: RuleName.SKIP, expression: /[ \t\n]/ },
  { name: RuleName.ERROR, expression: /./ },
];

const tokens = Lexer.tokens(
  rules,
  `
first = 1;
second = 2;
sum = first + second;
`
);

const tokens = Lexer.tokens(rules, code);
console.log(JSON.stringify(tokens, null));
```

### Output

```console
    [
      {
        "value": "first",
        "type": "VALUE"
      },
      {
        "value": "=",
        "type": "EQUALS"
      },
      {
        "value": "1",
        "type": "NUMBER"
      },
      {
        "value": ";",
        "type": "SEMICOLON"
      },
      ...
      {
        "value": "sum",
        "type": "VALUE"
      },
      {
        "value": "=",
        "type": "EQUALS"
      },
      {
        "value": "first",
        "type": "VALUE"
      },
      {
        "value": "+",
        "type": "PLUS"
      },
      {
        "value": "second",
        "type": "VALUE"
      },
      {
        "value": ";",
        "type": "SEMICOLON"
      }
    ]
```
