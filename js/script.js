// Initial variables
const guessedLetters = document.querySelector(".guessed-letters");
const guess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span= document.querySelector("span");
const message = document.querySelector(".message");
const hideButton = document.querySelector(".hide");
let testWord = "magnolia";
const pickedLetters = [];
let remainingGuesses = 8;

// Fetch 800-word data
const getWord = async function () {
  const request = await fetch (
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  )
  const data = await request.text();
  const wordArray = data.split("\n");
  const randomWord = Math.floor(Math.random()*wordArray.length);
  testWord = wordArray[randomWord].trim();
  placeholder(testWord);
}
getWord();

// Circles as placeholder
const placeholder = (testWord) => {
  const testArray = [];
  for (let item of testWord) {
    testArray.push("●");
  };
  wordProgress.innerText = testArray.join("");
};

// Form input check
guess.addEventListener("click", (e) => {
  e.preventDefault();
  message.innerText = "";
  const formInput = letter.value;

  const userInput = inputValue(formInput);
  if (userInput) {
    makeGuess(formInput);
  }

  letter.value = "";
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

// Prevent a duplicated letter
const makeGuess = (letter) => {
  const uppercased = letter.toUpperCase();
  if (pickedLetters.includes(uppercased)) {
    message.innerText = "You picked that letter already!";
  } else {
    pickedLetters.push(uppercased);
    playerCount(guess);
    displayLetters();
    updateWord(pickedLetters);
  }
};

// Display an inline list of guessed letters
const displayLetters = () => {
  guessedLetters.innerHTML = "";
  for (const letter of pickedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
  }
};

// Replace circles with correctly-guessed letters
const updateWord = (pickedLetters) => {
  const wordUpper = testWord.toUpperCase();
  const wordArray = wordUpper.split("");

  const cirlesArray = [];
  for (const letter of wordArray) {
    if (pickedLetters.includes(letter)) {
      cirlesArray.push(letter.toUpperCase());
    } else {
      cirlesArray.push("●");
    }
  }
  wordProgress.innerText = cirlesArray.join("");
  youWin();
};

// Check how many guesses are left
const playerCount = (guess) => {
  const upperWord = testWord.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = "The word does NOT contain that letter!";
    remainingGuesses -= 1;
  } else {
    message.innerText = "Nice, you're getting there!";
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Too bad, the word you're looking for is <span class="highlight">${testWord}</span>. Wanna retry?`;
    span.innerText = `${remainingGuesses} guesses`;
  } else if (remainingGuesses === 1) {
    span.innerText = `${remainingGuesses} guess`;
  } else {
    span.innerText = `${remainingGuesses} guesses`;
  }
};

// Check if player successfully guesses word and win the game
const youWin = () => {
  if (testWord.toUpperCase() === wordProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
}
