
const quizData = [
  {
    emoji: "",
    title: "Привет!",
    question: "Я Барни, меня попросили кое-что тебе передать. Но сначала мне нужно проверить твой интеллект. <br> 5 + 5?",
    options: [
      "10",
      "Да"
    ],
    popup: {
      emoji: "✨",
      title: "Прекрасно!",
      message: "Тот, по чей просьбе я здесь, явно не зря выбрал тебя. Давай продолжим!"
    }
  },
  {
    emoji: "💐",
    title: "Step 2",
    question: "Pick your Valentine's gift:",
    options: [
      "Flowers and chocolates",
      "Handwritten love letter",
    ],
    popup: {
      emoji: "🖥️",
      title: "Йоу!",
      message: "Ни один исккусственный интеллект тебе не ровня!"
    }
  },
  {
    emoji: "",
    title: "Сыграем?",
    question: "Какое имя из перечисленных тебе нравится больше всего?",
    options: [
      "Костя",
      "Константин",
      "Kostya",
      "Kostiantyn"
    ],
    popup: {
      emoji: "💫",
      title: "Ммм...",
      message: "Мне нравится твой вкус"
    }
  },
  {
    emoji: "🌹",
    title: "Последний вопрос!",
    question: "Закажем суши?",
    options: [
      "Да!",
      "Нет."
    ],
    popup: {
      emoji: "💗",
      title: "Что же, я доволен твоими отвтеами!",
      message: "Костя просил передать: 'Ты будешь моей валентинкой?'"
    } 
  },
  {
    emoji: "💝",
    title: "Step 5",
    question: "Complete this: Love is...",
    options: [
      "Patient and kind",
      "An adventure",
      "Being yourself together",
      "All of the above"
    ],
    popup: {
      emoji: "💗",
      title: "Absolutely!",
      message: "You truly understand what love means!"
    }
  }
];

let currentStep = 0;
let answers = [];

function initQuiz() {
  renderStepIndicator();
  renderQuestion();
}

function renderStepIndicator() {
  const indicator = document.getElementById('stepIndicator');
  indicator.innerHTML = '';

  for (let i = 0; i < quizData.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'step-dot';
    if (i < currentStep) dot.classList.add('completed');
    if (i === currentStep) dot.classList.add('active');
    indicator.appendChild(dot);
  }
}

function renderQuestion() {
  const content = document.getElementById('quizContent');
  const data = quizData[currentStep];

  if (currentStep == 1) {
    content.innerHTML = `
                <h2>Крестики-нолики!</h2>
      <h2>Ты первая.</h2>
    `;
    document.querySelector('.board').classList.add('grid')
  } else {
    content.innerHTML = `
                <div class="emoji">${data.emoji}</div>
                <h2>${data.title}</h2>
                <p class="question">${data.question}</p>
                <div class="options">
                    ${data.options.map((option, index) => `
                        <button class="option-btn" onclick="selectAnswer(${index})">${option}</button>
                    `).join('')}
                </div>
            `;
  }

}

function selectAnswer(answerIndex) {
  answers.push(answerIndex); // Всегда добавляем ответ

  if (answerIndex === 1 && currentStep !== 2) {
    showPopupLoose();
  }
  else if (currentStep == 3) {
    document.querySelector('.popup-btn').onclick = null;
    document.querySelector('.popup-btn').innerHTML = 'ДА!';
    const data = quizData[currentStep];
    showPopup(data.popup);
  }
  else {
    // Show popup
    const data = quizData[currentStep];
    showPopup(data.popup);
  }
}

function showPopup(popupData) {
  document.getElementById('popupEmoji').textContent = popupData.emoji;
  document.getElementById('popupTitle').textContent = popupData.title;
  document.getElementById('popupMessage').textContent = popupData.message;
  document.getElementById('popupOverlay').classList.add('show');
}

function showPopupLoose() {
  document.querySelector('.popup-overlay-loose').classList.add('show');
}

function closePopup() {
  document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.classList.remove('show');
  });

  setTimeout(() => {
    currentStep++;

    if (currentStep < quizData.length) {
      // Animate card transition
      const card = document.getElementById('quizCard');
      card.classList.add('fade-out');

      setTimeout(() => {
        card.classList.remove('fade-out');
        renderStepIndicator();
        renderQuestion();
      }, 400);
    } else {
      showResults();
    }
  }, 300);
}

function showResults() {
  const card = document.getElementById('quizCard');
  card.classList.add('fade-out');

  setTimeout(() => {
    card.classList.remove('fade-out');
    document.getElementById('stepIndicator').style.display = 'none';
    document.getElementById('quizContent').innerHTML = `
                    <div class="results">
                        <div class="emoji">💕</div>
                        <h2>You're a True Romantic! 🌹</h2>
                        <p>Your answers show you have a beautiful understanding of love and romance. Your valentine is lucky to have someone as thoughtful as you!</p>
                        <button class="restart-btn" onclick="restartQuiz()">Take Quiz Again</button>
                    </div>
                `;
  }, 400);
}

function restartQuiz() {

  document.querySelector('.popup-overlay-loose').classList.remove('show');
  resetGame();
  document.querySelector('.board').classList.remove('grid')
  currentStep = 0;
  answers = [];
  console.log('Quiz restarted');
  console.log(currentStep, answers);
  document.getElementById('stepIndicator').style.display = 'flex';

  const card = document.getElementById('quizCard');
  card.classList.add('fade-out');

  setTimeout(() => {
    card.classList.remove('fade-out');
    initQuiz();
  }, 400);
}

// Initialize quiz on page load
initQuiz();











const boardEl = document.getElementById("board");
const board = Array(9).fill(null);

let current = "X"; // человек всегда X
let gameOver = false;

const wins = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(Boolean)) return "draw";
  return null;
}

function endGame(result) {
  gameOver = true;


  if (result === "O" || result === "draw") {
    showPopupLoose();
  } else {
    document.querySelector('.board').classList.remove('grid')
    showPopup(quizData[1].popup);
  }
}

function playerMove(i, cell) {
  if (board[i] || gameOver) return;

  board[i] = "X";
  cell.textContent = "X";

  const result = checkWinner();
  if (result) return endGame(result);

  setTimeout(botMove, 400);
}

function botMove() {
  if (gameOver) return;


  const move =
    findBestMove("O") ||
    findBestMove("X") ||
    randomMove();

  board[move] = "O";
  const cell = boardEl.children[move];
  cell.textContent = "O";
  cell.classList.add("bot");

  const result = checkWinner();
  if (result) endGame(result);
}

function findBestMove(player) {
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = player;
      const win = checkWinner() === player;
      board[i] = null;
      if (win) return i;
    }
  }
  return null;
}

function randomMove() {
  const empty = board
    .map((v, i) => v ? null : i)
    .filter(v => v !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}

board.forEach((_, i) => {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.addEventListener("click", () => playerMove(i, cell));
  boardEl.appendChild(cell);
});

function resetGame() {
  board.fill(null);
  gameOver = false;
  current = "X";

  [...boardEl.children].forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("bot");
  });
}








