import { ILexRule } from "./models"
import { Lexer } from ".";

const rules: Array<ILexRule> = [
    { name: 'TokenType.VALUE', expression: /[a-zA-Z_]*/ },
    { name: 'TokenType.PIPE', expression: /\|/ },
    { name: 'TokenType.PLUS', expression: /[+]/ },
    { name: 'TokenType.QUESTION', expression: /[?]/ },
    { name: 'TokenType.STAR', expression: /[*]/ },
    { name: 'TokenType.LEFT_PAREN', expression: /\(/ },
    { name: 'TokenType.RIGHT_PAREN', expression: /\)/ },
    { name: 'TokenType.LEFT_BRACE', expression: /\{/ },
    { name: 'TokenType.RIGHT_BRACE', expression: /\}/ },
    { name: 'TokenType.LEFT_BRACKET', expression: /\[/ },
    { name: 'TokenType.RIGHT_BRACKET', expression: /\]/ },
    { name: 'TokenType.COMMA', expression: /,/ },
    { name: 'RuleName.SKIP', expression: /[ \t\n]/ },
    { name: 'RuleName.ERROR', expression: /./ }
];

Lexer.tokens(rules, "OBJECT_HEADER BODY_SEGMENT");