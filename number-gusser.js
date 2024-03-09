let lower = 1;
let higher = 10;
let correctAnswer;
let chances = 3;

function startGame() {
    resetGame();
    correctAnswer = generateRandomNumber(lower, higher);
    document.getElementById('lower').textContent = lower;
    document.getElementById('higher').textContent = higher;
    document.getElementById('guess').disabled = false;
    document.getElementById('guessBtn').addEventListener('click', checkGuess);
    document.getElementById('guess').focus();
}

function resetGame() {
    chances = 3;
    document.getElementById('chances').textContent = `Chances left: ${chances}`;
    document.getElementById('result').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('guess').disabled = false;
    document.getElementById('guessBtn').textContent = 'Guess';
    document.getElementById('guessBtn').classList.remove('bg-green-500', 'hover:bg-green-700');
    document.getElementById('guessBtn').removeEventListener('click', restartGame);
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    if (isNaN(guess) || guess < lower || guess > higher) {
        alert(`Please enter a number between ${lower} and ${higher}.`);
        return;
    }

    if (guess === correctAnswer) {
        document.getElementById('result').innerHTML = '<span class="text-green-500 font-bold">🎉 Congratulations! You win!</span>';
        disableGame();
    } else {
        chances--;
        document.getElementById('chances').textContent = `Chances left: ${chances}`;
        if (chances === 0) {
            document.getElementById('result').innerHTML = `<span class="text-red-500 font-bold">😔 Sorry! You lose. The correct answer was ${correctAnswer}.</span>`;
            disableGame();
        } else {
            alert(guess < correctAnswer ? 'Correct answer is greater!' : 'Correct answer is smaller!');
        }
    }
}

function disableGame() {
    document.getElementById('guess').disabled = true;
    document.getElementById('guessBtn').textContent = 'Restart';
    document.getElementById('guessBtn').classList.add('bg-green-500', 'hover:bg-green-700');
    document.getElementById('guessBtn').removeEventListener('click', checkGuess);
    document.getElementById('guessBtn').addEventListener('click', restartGame);
}

function restartGame() {
    location.reload();
}

startGame();