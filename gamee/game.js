// UI Elements
const deathOverlay = document.getElementById('deathOverlay');
const restartBtn = document.getElementById('restartBtn');
const menuBtn = document.getElementById('menuBtn');

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let isGameOver = false;

// Player setup
let player = {
  x: 400,
  y: 300,
  size: 32,
  speed: 3,
  health: 100,
  maxHealth: 100,
};

// Functions
function startGame() {
  isGameOver = false;
  player.health = player.maxHealth;
  gameLoop();
}

function gameLoop() {
  if (isGameOver) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  if (player.health <= 0) {
    endGame();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw player, bullets, enemies (example)
}

function endGame() {
  isGameOver = true;
  deathOverlay.style.display = 'flex';
}

// Restart and Menu buttons
restartBtn.onclick = () => {
  deathOverlay.style.display = 'none';
  startGame();
};

menuBtn.onclick = () => {
  window.location.href = 'start.html';  // Перенаправление обратно в стартовое меню
};

// Start the game when page is loaded
startGame();
