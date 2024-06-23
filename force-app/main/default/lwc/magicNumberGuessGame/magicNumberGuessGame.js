import { LightningElement, track } from 'lwc';
import initGame from '@salesforce/apex/MagicNumberGuessGameController.initGame';
import setGoalNumber from '@salesforce/apex/MagicNumberGuessGameController.setGoalNumber';

export default class MagicNumberGuessGame extends LightningElement {
    @track guess;
    @track feedback = '';
    @track attempts = 0;
    @track history = [];
    goalNumber;

    connectedCallback() {
        this.startGame();
    }

    startGame() {
        initGame()
            .then(() => {
                return setGoalNumber();
            })
            .then(result => {
                this.goalNumber = result;
                this.resetGame();
            })
            .catch(error => {
                this.feedback = 'Error initializing game: ' + error.body.message;
            });
    }

    resetGame() {
        this.guess = null;
        this.feedback = '';
        this.attempts = 0;
        this.history = [];
    }

    handleGuessChange(event) {
        this.guess = event.target.value;
    }

    handleGuess() {
        if (!this.guess) {
            this.feedback = 'Please enter a number.';
            return;
        }

        this.attempts++;
        let guessValue = parseInt(this.guess, 10);
        let feedbackMessage = '';

        if (guessValue === this.goalNumber) {
            feedbackMessage = 'Correct!';
        } else if (guessValue < this.goalNumber) {
            feedbackMessage = 'Too low!';
        } else {
            feedbackMessage = 'Too high!';
        }

        this.feedback = feedbackMessage;
        this.history = [...this.history, { id: this.attempts, guess: guessValue, feedback: feedbackMessage }];
    }

    restartGame() {
        this.startGame();
    }
}
