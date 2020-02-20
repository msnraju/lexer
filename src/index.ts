import Lexer from "./lexer";
import { ILexRule } from "./models";
import { RuleName } from "./enums";

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
console.log(JSON.stringify(tokens, null, 0));
