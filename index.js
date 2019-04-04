const inquirer = require('inquirer');
const Word = require('./Word');

let randomNum, currentWord, totalGuesses, superHeroList, guessedLetters;

const gameInit = () => {
    totalGuesses = 10;
    superHeroList = ['Black Panther', 'Captain America', 'Black Widow', 'Doctor Strange', 'Hawkeye', 'Spiderman', 'Vision', 'Scarlet Witch', 'Quicksilver', 'Iron Man', 'War Machine', 'Rocket Racoon', 'Gamora', 'Winter Soldier', 'Falcon'];
    guessedLetters = [];
    randomNum = Math.floor(Math.random() * superHeroList.length);
    currentWord = new Word(superHeroList[randomNum].split(''));
    superHeroList.splice(randomNum, 1); 
    console.log(currentWord.getWordAsString() + '\n');
    getGuessLetter();
};

const getGuessLetter = () => {
    
    inquirer.prompt([
        {
            type: 'text',
            message: 'Guess a letter!',
            name: 'letter'
        }
    ]).then(inquirerResponse => {
        // check if string entered is a letter
        if (inquirerResponse.letter.length === 1 && inquirerResponse.letter.match(/[a-z]/i)) {

            // if the letter hasn't been guessed yet we deal with a correct/incorrect guess
            if (guessedLetters.includes(inquirerResponse.letter)) {
                // if it has, we tell the user and prompt them for another guess
                console.log('\n' + currentWord.getWordAsString() + '\n');
                console.log('You\'ve already guessed that letter! Guess another one! \n');
                getGuessLetter();
            } else {
                    
                // if the letter hasn't been guessed yet we deal with a correct/incorrect guess
                if (currentWord.checkWordForLetter(inquirerResponse.letter)) {
                    
                    console.log('\n' + currentWord.getWordAsString() + '\n');
                    console.log('\x1b[32m%s\x1b[0m', '\nCORRECT!!!!! \n');

                    // we check if whole word has now been correctly guessed
                    if (!currentWord.allLettersGuessed()) {
                        // if it hasn't we prompt the player for another letter
                        guessedLetters.push(inquirerResponse.letter);
                        getGuessLetter();
                    } else {
                        // if it has then we re-initialize the game
                        console.log('You got it right! Next Word!\n');
                        gameInit();
                    }
                } else {
                    console.log('\n' + currentWord.getWordAsString() + '\n');
                    console.log('\x1b[31m%s\x1b[0m', '\nINCORRECT!!!!!\n');
                    totalGuesses--;
                    console.log(`${totalGuesses} guesses remaining!!! \n`);

                    // we check if all guesses have been used up
                    if (!totalGuesses) {
                        // if they have, restart the game
                        console.log('YOU LOSE!! Play again! \n');
                        gameInit();
                    } else {
                        // if it hasn't we prompt the player for another letter
                        guessedLetters.push(inquirerResponse.letter);
                        getGuessLetter();
                    }
                }
            } 
        } else {
            // if it's not a letter
            console.log('\n' + currentWord.getWordAsString() + '\n');
            console.log('Not a letter! Please guess a letter! \n');
            getGuessLetter();
        }
    });
};

/* MAIN PROCESS
**********************************/
console.log('Guess the Avenger! \n');
gameInit();