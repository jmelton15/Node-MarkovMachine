/** Textual markov chain generator */
const shuffle = require('shuffle-array');

class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.markovChains = this.makeChains();
    }
  
  /**
   * 
   * This function makes the dictionary of chains.
   * It's a moded version of the assignments from the further study section
   * It stores two word keys for more precise sentences.
   * 
   */
    makeChains() {
        let chains = {};
        this.words.forEach((word,i) => {
            if (!this.words[i+2]){
               return chains;
            }
            let prevWord = this.words[i+1];
            let storedWord = word + " " + prevWord;
            if (storedWord in chains && chains[storedWord] != prevWord) {
                chains[storedWord].push(this.words[i+2]);
            }
            else {
                chains[storedWord] = [];
                prevWord ? chains[storedWord].push(this.words[i+2]) : chains[prevWord].push(null);
            }
        });
        return chains;
    }
  
    /**
     * 
     * This function is used to get a starting chain (two word combo) from the dict.
     * It makes sure to return a chain in which the starting letter of the first word
     * is capitalized and makes sure that the character is a letter.
     * 
     */
    getStartingChain() {
        let keys = shuffle(Object.keys(this.markovChains));
        return keys.find((key) => {
            if (key[0] == key[0].toUpperCase() && key[0].match(/[a-z]/i)) {
                return key;
            }
        });
    }

    /** return random text from chains */
    
    makeText(numWords = 100) {
        let nextWord;
        let startingChain = this.getStartingChain();
        for (let i = 0; i<numWords;i++) {
            nextWord = getNextWord(startingChain,this.markovChains,i);
            if (nextWord == null) {
                return startingChain;
            } 
            startingChain = startingChain + " " + nextWord;
        }
        console.log(" \n")
        return startingChain;
    }
}

/**
 * 
 *This function is used to get the word that follows a given chain (two word combo)
 * from the dictionary.
 * It returns a single word
 * 
 */
function getNextWord(startingChain,markovChains,index) {
    let lastChain;
    let numberOfWords;
    let randIndex;
    let nextWord;
    if (index === 0) {
        numberOfWords = markovChains[startingChain].length;
        randIndex = Math.floor(Math.random() * numberOfWords);
        nextWord = markovChains[startingChain][randIndex]; 
    }
    else {
        lastChain = startingChain.split(" ")[index] + " " + startingChain.split(" ")[index+1];
        try {
            numberOfWords = markovChains[lastChain].length;
            randIndex = Math.floor(Math.random() * numberOfWords);
            nextWord = markovChains[lastChain][randIndex];
        }catch (e) {
            return null;
        }
    }
    return nextWord;
}

module.exports = {MarkovMachine};
