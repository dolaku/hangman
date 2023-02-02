// wait for page to load before running code
document.addEventListener("DOMContentLoaded", () => {

    const userInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit");
    const guessBankIncorrect = document.querySelector(".guess-bank[data-type=incorrect]");
    let guessedList = new Array;

    // create word bank
    const wordBank = [
        "apple",
        "orange",
        "banana",
        "melon"
    ]



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
        // TODO only allow letters -- no special characters or numbers
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

                            handleWinLose();
                        }
                    }
                })
    
            } else {
    
                // append to incorrect list
                guessedList.push(guessedLetter);
                // loop through list to display guessed letters
                guessBankIncorrect.innerHTML += `<p class="card">${guessedList[guessedList.length - 1]}</p>`;
    
            }

            updateHangman();
        }
    }

    function handleWinLose() {
        let hasBlank = Array.from(word.children).some(letter => !letter.innerText);

        if (!hasBlank) {

            // TODO reset the random word
            randomWord = newWord();
            word.innerHTML = newWordDisplay();

            // remove all incorrect letters
            guessedList = new Array;
            guessBankIncorrect.innerHTML = "";

            // update win streak
            const winStreak = document.getElementById("win-streak");
            winStreak.innerText = parseInt(winStreak.innerText) + 1;
            

            // remove hangman progression
        }
    }

    function updateHangman() {
        
    // show man hanging progression
        //left leg
        //right leg
        //body
        //left arm
        //right arm
        //head


    }
    
});
