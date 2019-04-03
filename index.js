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
        if (currentWord.checkWordForLetter(inquirerResponse.letter)) {
            console.log('correct!');
        } else {
            console.log('incorrect!');
        }
        console.log(currentWord.getWordAsString());
        if (!currentWord.allLettersGuessed()) {
            getGuessLetter();
        } else {
            gameInit();
        }
    });
};

const gameInit = () => {
    totalGuesses = 10;
    superHeroList = ['Black Panther', 'Captain America', 'Black Widow', 'Doctor Strange', 'Hawkeye', 'Spiderman', 'Vision', 'Scarlet Witch', 'Quicksilver', 'Iron Man', 'War Machine', 'Rocket Racoon', 'Gamora', 'Winter Soldier', 'Falcon'];
    randomNum = Math.floor(Math.random() * superHeroList.length);
    currentWord = new Word(superHeroList[randomNum].split(''));
    superHeroList.splice(randomNum, 1);
    console.log('Guess the Avenger! \n' + currentWord.getWordAsString());
    getGuessLetter();
};

/* MAIN PROCESS
**********************************/
gameInit();