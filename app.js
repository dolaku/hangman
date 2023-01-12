// wait for page to load before running code
document.addEventListener("DOMContentLoaded", () => {
    
    const userInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit");
    const guessBankCorrect = document.querySelector(".guess-bank[data-type=correct]");
    const guessBankIncorrect = document.querySelector(".guess-bank[data-type=incorrect]");
    let guessedList = new Array;

    // TODO 
    // create word bank
    // show a word to guess
    // show correct guesses
    // show man hanging progression





    
    submitButton.addEventListener("click", (event) => {
        // prevent page from refreshing
        event.preventDefault();
        event.stopPropagation();
        
        // get user's guess
        let guessedLetter = userInput.value.toUpperCase();
        
        // validate not empty
        // only add unique letters -- no duplicates
        // TODO only allow letters
        if (guessedLetter && !guessedList.includes(guessedLetter)) {
            
            // append to list
            guessedList.push(guessedLetter);

            // loop through list to display guessed letters
            guessBankIncorrect.innerHTML += `<p class="card">${guessedList[guessedList.length - 1]}</p>`;
            
        }

        // remove letter after guessing && focus on userInput
        userInput.value = "";
        userInput.focus();
        
    })
        
        





});  
