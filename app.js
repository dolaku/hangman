// wait for page to load before running code
document.addEventListener("DOMContentLoaded", () => {
    
    const userInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit");
    const guessBankCorrect = document.querySelector(".guess-bank[data-type=correct]");
    const guessBankIncorrect = document.querySelector(".guess-bank[data-type=incorrect]");
    let guessedList = new Array;
    
    // prevent page from refreshing
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        // get user's guess
        let guessedLetter = userInput.value;

        guessedList.push(`<p class="card">${guessedLetter}</p>`);

        // loop through list to display guessed letters
        guessedList.forEach(item => {
            // TODO fix display bug
            guessBankIncorrect.innerHTML += item;
        })

    })




});  
