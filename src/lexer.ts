import { RuleName } from "./enums";
import { Labels } from "./labels";
import { ILexRule, IToken } from "./models";

export default class Lexer {
    private input: string;
    private current: number;
    private rules: Array<ILexRule>;

    constructor(rules: Array<ILexRule>, input: string) {
        this.rules = rules;
        this.input = input;
        this.current = 0;
    }

    static tokens(rules: Array<ILexRule>, input: string): Array<IToken> {
        const tokens : Array<IToken> = [];
        const lex = new Lexer(rules, input);
        let token = lex.next();
        while (token.type != 'EOF') {
            tokens.push(token);
            token = lex.next();
        }        

        return tokens;
    }

    next(): IToken {
        while (this.current < this.input.length) {
            let found = false;

            for (var i = 0; i < this.rules.length; i++) {
                const rule = this.rules[i];

                const expr = new RegExp(rule.expression, 'g');
                expr.lastIndex = this.current;
                const match = expr.exec(this.input);
                if (match && match.index == this.current) {
                    found = true;

                    const value = match[0];
                    this.current += value.length;
                    if (rule.name == RuleName.SKIP)
                        break;
                    else if (rule.name == RuleName.ERROR)
                        throw new Error(`${Labels.UnexpectedToken} ${value}`);
                    else
                        return { value: value, type: rule.name };
                }
            }

            if (found == false)
                throw new Error(Labels.UnexpectedToken);
        }

        return { value: '', type: 'EOF' };
    }
}