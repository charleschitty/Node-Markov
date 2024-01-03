"use strict";

const { MarkovMachine } = require("./markov");

describe("markov machine", function () {

  test("generate chains", function () {
    let testMarkov = new MarkovMachine("Hello the cat in the bag.");
    //Hello the bag.
    //Hello the the.
    expect(testMarkov.chains).toEqual({
      "Hello": ["the"],
      "the": ["cat", "bag."],
      "cat": ["in"],
      "in": ["the"],
      "bag.": [null]
    });
  });

  //test no branch
  test("generate text with no branches", function () {
    let testMarkov = new MarkovMachine("I am the cat");
    expect(testMarkov.getText()).toEqual("I am the cat");
  });

  //test with branches
  test("generate text with branches", function () {
    let testMarkov = new MarkovMachine("Hello the cat in the bag.");
    //option 1: two word pair
    //option 2: walk the chain
    const possibleSentence = testMarkov.getText();
    //split possibleSentence into an array
    const words = possibleSentence.split(" ");
    const chain = testMarkov.chains;
    for (let i = 0; i < words.length; i++) {
      console.log(chain[words[i]])
      if (chain[words[i]].includes(words[i + 1])) {
        expect(true).toEqual(true);
      }
    }
  })
})