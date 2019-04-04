const inquirer = require("inquirer");
const Word = require('./Word');

let randomNum, currentWord, totalGuesses, superHeroList;

const getGuessLetter = () => {
    
    inquirer.prompt([
        {
            type: 'text',
            message: 'Guess a letter!',
            name: 'letter'
        }
    ]).then(inquirerResponse => {
        // we deal with a correct/incorrect guess
        if (currentWord.checkWordForLetter(inquirerResponse.letter)) {
            console.log(currentWord.getWordAsString());
            console.log('CORRECT!!!!!');
            
            // we check if whole word has been guessed
            if (!currentWord.allLettersGuessed()) {
                // if it hasn't we prompt the player for another letter
                getGuessLetter();
            } else {
                // if it has then we re-initialize the game
                console.log('You got it right! Next Word!');
                gameInit();
            }
        } else {
            console.log(currentWord.getWordAsString());
            console.log('INCORRECT!!!!!');
            totalGuesses--;
            console.log(`${totalGuesses} guesses remaining!!!`);

            // we check if all guesses have been used up
            if (!totalGuesses) {
                // if they have, restart the game
                console.log('YOU LOSE!! Play again!');
                gameInit();
            } else {
                // if it hasn't we prompt the player for another letter
                getGuessLetter();
            }
        }
    });
};

const gameInit = () => {
    totalGuesses = 10;
    superHeroList = ['Black Panther', 'Captain America', 'Black Widow', 'Doctor Strange', 'Hawkeye', 'Spiderman', 'Vision', 'Scarlet Witch', 'Quicksilver', 'Iron Man', 'War Machine', 'Rocket Racoon', 'Gamora', 'Winter Soldier', 'Falcon'];
    randomNum = Math.floor(Math.random() * superHeroList.length);
    currentWord = new Word(superHeroList[randomNum].split(''));
    superHeroList.splice(randomNum, 1); 
    console.log(currentWord.getWordAsString());
    getGuessLetter();
};

/* MAIN PROCESS
**********************************/
console.log('Guess the Avenger!');
gameInit();

// currentWord.checkWordForLetter('a')
// currentWord.checkWordForLetter('b')
// currentWord.checkWordForLetter('e')
// currentWord.checkWordForLetter('f')