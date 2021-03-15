const { MarkovMachine, getNextWord } = require("./markov");


describe("\n*** MarkovMachine class Methods ***", () => {
    let mm;
    let response;
    beforeEach(() => {
        mm = new MarkovMachine("The cat in the hat");
        response = {'The cat':['in'],'cat in':['the'],'in the':['hat']};
    });

    test("create proper markov chain {'The cat':['in'],...etc}",() => {
        let markovChains = mm.markovChains;
        expect(markovChains).toEqual(response)
    })

    test("get a random starting chain (key) from the markovChains dict. "+
        "value must be a two word/character string and the first word must start with "+
        "an uppercase letter",() => {
            let startingChain = mm.getStartingChain();
            let words = startingChain.split(" ");
            expect(words[0][0]).toEqual(words[0][0].toUpperCase())
            expect(words.length).toEqual(2);
            expect(startingChain).toEqual(expect.any(String));
        });
    
    test("create random auto generated string from markovChain. Number of words should be between 1-100 in length", () => {
        let text = mm.makeText();
        expect(text.length).toBeGreaterThan(1);
        expect(text.length).toBeLessThanOrEqual(102);
        expect(text).toEqual(expect.any(String));
    });
});

describe("\n*** Non-MarkovMachine functions ***", () => {
    let mm;
    let startingChain;
    let markovChains;
    let index;
    beforeEach(() => {
        mm = new MarkovMachine("The cat in the hat");
        markovChains = mm.markovChains;
        startingChain = mm.getStartingChain();
        index = 0;
    });

    test("getting the next word. Should return a single word/string",() => {
        let nextWord = getNextWord(startingChain,markovChains,index);
        expect(nextWord).toEqual(expect.any(String));
        expect(nextWord.split(" ").length).toEqual(1);
        /** This next expect can be used if you know what the response will be */
        expect(nextWord).toEqual('in');
    });

});