const guessedLetters = document.querySelector(".guessed-letters");
const guess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span= document.querySelector("span");
const message = document.querySelector(".message");
const hideButton = document.querySelector(".hide");
const testWord = "magnolia";

const placeholder = (testWord) => {
  const testArray = [];
  for (let item of testWord) {
    testArray.push("●");
  };
  wordProgress.innerText = testArray.join("");
};
placeholder(testWord);
