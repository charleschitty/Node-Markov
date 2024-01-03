"use strict";

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
      let chainsWords = [];
      if (chains[this.words[i]]){
        chainsWords = chains[this.words[i]];
      }
      chainsWords.push(this.words[i+1] || null);
      chains[this.words[i]] = chainsWords;
    }

    return chains
  }

  //Ask about best practice for code below. static? or
  // regular function outside of class??

  /** Takes in an array of words and return a word at a random index. */

  static randomChoice(words){ //non-static method and use underscore (internal use)
    return words[Math.floor(Math.random() * words.length)]
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    let result = [];
    let startKey = this.words[0]; //TODO:rename to "key" / "currWord"

    while (startKey !== null){
      result.push(startKey);
      const nextWord = MarkovMachine.randomChoice(this.chains[startKey])
      startKey = nextWord;
    }

    return result.join(" ");
  }
}

//CommonJs module might be ES module?

module.exports = {
  MarkovMachine,
};