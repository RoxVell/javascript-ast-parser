import { Tokens, TokenType } from './tokens';

export class Tokenizer {
  private parsingString = '';
  private cursor = 0;

  init(parsingString: string) {
    this.parsingString = parsingString;
    this.cursor = 0;
  }

  getNextToken(): { value: unknown; type: TokenType } | null {
    if (!this.hasMoreTokens()) {
      return null;
      // throw new Error(`No more tokens`);
    }

    const str = this.parsingString.slice(this.cursor);

    for (const token of Tokens) {
      const match = token.pattern.exec(str);

      if (!match) {
        continue;
      }

      this.cursor += match[0].length;

      if (token.type === null) {
        return this.getNextToken();
      }

      return {
        value: match[0],
        type: token.type
      };
    }

    throw new Error(`Unexpected token at index @${this.cursor}`);
  }

  private hasMoreTokens() {
    return this.cursor < this.parsingString.length;
  }
}
