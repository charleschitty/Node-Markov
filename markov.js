/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = {};

    for (let i=0; i<this.words.length; i++){
      let nextWord = [];
      chains[this.words[i]] = nextWord.push(this.words[i+1] || null);
      chains[this.words[i]] = nextWord;
    }

    return chains
  }
  //Ask about best practice for code below. static? or
  // regular function outside of class??

  static randomChoice(words){
    return words[Math.floor(Math.random() * words.length)]
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let result = [];
    let startKey = this.words[0];

    while (startKey !== null){
      result.push(startKey);
      const nextWord = randomChoice(this.chains[startKey])
      startKey = nextWord;
    }
    return result.join(" ");
  }
}
