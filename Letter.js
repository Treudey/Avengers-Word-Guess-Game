class Letter {
    constructor(letter) {
        this.letter = letter;
        this.blank = '_';
        this.isGuessed = false;
    }

    getChar() {
        return this.isGuessed ? this.letter : this.blank;
    }

    checkIfLetter(guessLetter) {
        return guessLetter === this.letter ? this.isGuessed = true : this.isGuessed;
    }
}

module.exports = Letter;