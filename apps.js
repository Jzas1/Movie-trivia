const displayQuestions = document.getElementById("questions");
const displayAnswer = document.getElementById("answer");
const displayHint = document.getElementById("hint");
const displayScore = document.getElementById("score");
const timeEl = document.getElementById("time");
const displayGameOver = document.getElementById("game-over");
const playAgain = document.getElementById("play-again");
const endgameMessage = document.getElementById("endgame");
let time = 20;

let input = document.getElementById("input");
let guessedLetters = [];
let guessedLettersString = [];
let answers = [];
let questions = [];
let score = 0;
// input.addEventListener("input");
// API
async function calculate() {
  const reponse = await fetch(
    `https://opentdb.com/api.php?amount=50&category=11&difficulty=easy&type=multiple`
  )
    .then((res) => res.json())
    .then((data) => {
      let randomNumber = Math.floor(Math.random() * 50);
      console.log(data);
      let question = data.results[randomNumber].question;
      let answer = data.results[randomNumber].correct_answer;
      const newEl = document.create;
      questions.push(question);
      answers.push(answer);
      Updatescore();

      displayQuestions.innerHTML = data.results[randomNumber].question;
      hint();
      // hint element & function

      return data;
    });
}
calculate();

console.log(answers);

function guessWord() {
  guessedLetters.push(input.value.toLowerCase().split(""));
  guessedLetters.push(input.value.toUpperCase().split(""));
  console.log(guessedLetters.toString());
  hint();
  if (input.value.toLowerCase() === answers[0].toLowerCase()) {
    input.value = "";
    score++;
    answers = [];
    questions = [];
    guessedLetters = [];
    calculate();
    Updatescore();
    time += 10;
  }
}
function Updatescore() {
  displayScore.textContent = `Score: ${score}`;
  console.log(displayScore.innerText);
  console.log(score);
}

playAgain.addEventListener("click", newGame);

input.addEventListener("input", guessWord);

function hint() {
  let puzzle = "";
  let hint = answers[0].split("");

  hint.forEach(function (letter) {
    if (
      guessedLetters.toString().includes(letter) ||
      letter === " " ||
      letter === "." ||
      letter === "-"
    ) {
      puzzle += letter;
    } else {
      puzzle += `<span class="letters"> </span>`;
    }
    return (displayHint.innerHTML = `Hint: ${puzzle}`);
  });
}

function gameOver() {
  displayGameOver.classList.add("show");
  endgameMessage.textContent = `Game Over! Your score was ${score}`;
}

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerHTML = `time: ${time}`;

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}
function newGame() {
  // displayGameOver.classList.remove("show");
  // console.log("working");
  // time = 20;
  location.reload();
}
