const Letter = require('./Letter');

class Word {
    constructor(letterArr) {
        // stores an array of characters converted to Letter objects, unless it is a space
        this.letterArr = letterArr.map(el => el !== ' ' ? new Letter(el) : el);
    }

    getWordAsString() {
        // goes through letter array and returns the character, unless it is a space
        let charArray = this.letterArr.map(el => el !== ' ' ? el.getChar() : el);
        // concatinates that array to return it
        return charArray.join(' ');
    }

    checkWordForLetter(guessLetter) {
        let correctGuess = false;
        this.letterArr.forEach(el => { 
            if (el !== ' ') {
                if (el.checkLetter(guessLetter)) {
                    correctGuess = true;
                }
            }
        });
        return correctGuess;
    }

    allLettersGuessed() {
        return this.letterArr.every(el => el !== ' ' ? el.isGuessed : true);
    }
}

module.exports = Word;