class Letter {
    constructor(letter) {
        this.letter = letter;
        this.blank = '_';
        this.isGuessed = false;
    }

    getChar() {
        return this.isGuessed ? this.letter : this.blank;
    }

    checkLetter(guessLetter) {
        return guessLetter === this.letter.toLowerCase() ? this.isGuessed = true : false;
    }
}

module.exports = Letter;