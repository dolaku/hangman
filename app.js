// wait for page to load before running code
document.addEventListener("DOMContentLoaded", () => {

    const userInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit");
    const guessBankIncorrect = document.querySelector(".guess-bank[data-type=incorrect]");
    let guessedList = new Array;
    let hangmanProgress = 0;
    const hanger = document.getElementById("hanger");

    // create word bank
    const wordBank = [
        "apple",
        "orange",
        "banana",
        "melon"
    ];



    // show a word to guess
    const word = document.getElementById("word");
    let randomWord = newWord();
    word.innerHTML = newWordDisplay();

    
    submitButton.addEventListener("click", (event) => {
        // prevent page from refreshing
        event.preventDefault();
        event.stopPropagation();
        
        handleGuess();

        // remove letter after guessing && focus on userInput
        userInput.value = "";
        userInput.focus();
        
    })

    // only allow letters A-Z
    userInput.addEventListener("keyup", (event) => {
        const letterRegex = /^[A-Z]$/;
        if (letterRegex.test(event.key.toUpperCase())) {
            userInput.value = event.key.toUpperCase();
        } else {
            userInput.value = "";
        }
    })

    function newWord() {
        // -- pick random word
        let randomIndex = Math.floor(Math.random() * wordBank.length);
        return wordBank[randomIndex].toUpperCase();
    }

    function newWordDisplay() {
        // -- show characters as blank cards
        let blankCards = "";
        for (let i = 0; i < randomWord.length; i++) {
            blankCards += `<p class="card"></p>`;
        }
        return blankCards;
    }

    function handleGuess() {

        // get user's guess
        let guessedLetter = userInput.value.toUpperCase();
        
        // validate not empty
        // only add unique letters -- no duplicates
        if (guessedLetter && !guessedList.includes(guessedLetter)) {
            
            // handle guesses
            if (randomWord.includes(guessedLetter)) {
                // show correct letters
    
                Array.from(word.children).forEach((letter, i) => {
                    // check if blank
                    if (!letter.innerText) {
                        // update correct letters
                        if (randomWord[i] === guessedLetter) {
                            letter.innerText = guessedLetter;

                            handleWin();
                        }
                    }
                })
    
            } else {
    
                // append to incorrect list
                guessedList.push(guessedLetter);
                // loop through list to display guessed letters
                guessBankIncorrect.innerHTML += `<p class="card">${guessedList[guessedList.length - 1]}</p>`;
    
                handleLose();
            }
        }
    }

    function handleWin() {
        let hasBlank = Array.from(word.children).some(letter => !letter.innerText);

        if (!hasBlank) {
            resetGame(true);
        }
    }

    function handleLose() {
        
    // show man hanging progression
        // 0 head
        // 1 body
        // 2 left arm
        // 3 right arm
        // 4 left leg
        // 5 right leg

        // check progression
        if (hangmanProgress > 4) {
            // lose
            resetGame(false);

        } else {
            // update hangman --- show body parts
            hangmanProgress += 1;
            document.querySelector(`.overlay-${hangmanProgress - 1}`).classList.add("d-none");
        }
    }
    
    function resetGame(isWin) {

            // reset the random word
            randomWord = newWord();
            word.innerHTML = newWordDisplay();

            // remove all incorrect letters
            guessedList = new Array;
            guessBankIncorrect.innerHTML = "";

            // update win streak
            const winStreak = document.getElementById("win-streak");
            if (isWin) {
                winStreak.innerText = parseInt(winStreak.innerText) + 1;
            } else {
                winStreak.innerText = 0;
            }

            // reset
            hangmanProgress = 0;
            
            // remove hangman progression
            Array.from(hanger.querySelectorAll("div")).forEach(overlay => overlay.classList.remove("d-none"));

            modal(isWin);
    }

    function modal(isWin) {
        const gameArea = document.getElementById("game-area");
        const div = document.createElement("div");
        div.id = "modal";
        div.innerHTML = isWin ? "You win!" : "You lose!";

        gameArea.insertAdjacentElement("beforeend", div);

        // remove after some time
        setTimeout(() => {
            div.remove();
        }, 1500)
    }

});
