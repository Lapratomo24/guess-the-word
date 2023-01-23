// Initial variables
const guessedLetters = document.querySelector(".guessed-letters");
const guess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span= document.querySelector("span");
const message = document.querySelector(".message");
const hideButton = document.querySelector(".hide");
const testWord = "magnolia";

// Circles as placeholder
const placeholder = (testWord) => {
  const testArray = [];
  for (let item of testWord) {
    testArray.push("●");
  };
  wordProgress.innerText = testArray.join("");
};
placeholder(testWord);

// Form input check
guess.addEventListener("click", (e) => {
  e.preventDefault();
  message.innerText = "";
  const formInput = letter.value;
  console.log(formInput);
  letter.value = "";


  const userInput = inputValue(formInput);
  console.log(userInput);
});

// Validate player input
const inputValue = (input) => {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Did you enter a letter?";
  } else if (input.length > 1) {
    message.innerText = "One letter at a time!";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Enter a valid letter!";
  } else {
    return input;
  }
};
