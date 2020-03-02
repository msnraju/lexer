import { Lexer, ILexRule, RuleName } from '../src';

describe('Lexer Test', () => {
  it('Token Count', () => {
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
    expect(tokens.length).toEqual(14);
  });

  it('Error / restricted token', () => {
    const rules: Array<ILexRule> = [
      { name: 'VALUE', expression: /[a-zA-Z_]*/ },
      { name: 'EQUALS', expression: /=/ },
      { name: 'PLUS', expression: /\+/ },
      { name: 'NUMBER', expression: /[0-9]+/ },
      { name: 'SEMICOLON', expression: /;/ },
      { name: RuleName.SKIP, expression: /[ \t\n]/ },
      { name: RuleName.ERROR, expression: /./ },
    ];

    let message = '';
    try {
      Lexer.tokens(
        rules,
        `
        first = 1;
        second = 2;
        sum = first + second;
        a: () => {};
      `
      );
    } catch (err) {
      message = err.message;
    }

    expect(message).toEqual('Unexpected token  :');
  });

  it('When rule not found', () => {
    const rules: Array<ILexRule> = [
      { name: 'VALUE', expression: /[a-zA-Z_]*/ },
      { name: 'EQUALS', expression: /=/ },
      { name: 'PLUS', expression: /\+/ },
      { name: 'NUMBER', expression: /[0-9]+/ },
      { name: 'SEMICOLON', expression: /;/ },
      { name: RuleName.SKIP, expression: /[ \t\n]/ },
    ];

    let message = '';
    try {
      Lexer.tokens(
        rules,
        `
        first = 1;
        second = 2;
        sum = first + second;
        a: () => {};
      `
      );
    } catch (err) {
      message = err.message;
    }

    expect(message).toEqual('Unexpected token ');
  });
});
