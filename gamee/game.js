// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 400,
  y: 300,
  size: 20,
  speed: 4,
  color: "lime",
  hp: 100,
  maxHp: 100
};

let enemies = [];
let bullets = [];
let keys = {};
let kills = 0;
let upgradeReady = false;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}

function drawHPBar() {
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 100, 10);
  ctx.fillStyle = "lime";
  ctx.fillRect(10, 10, (player.hp / player.maxHp) * 100, 10);
  ctx.strokeStyle = "white";
  ctx.strokeRect(10, 10, 100, 10);
}

function update() {
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  // Enemies and bullets update
  bullets.forEach((b, i) => {
    b.x += b.vx;
    b.y += b.vy;
    enemies.forEach((e, j) => {
      if (Math.abs(b.x - e.x) < 15 && Math.abs(b.y - e.y) < 15) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        kills++;
        if (kills % 10 === 0) {
          upgradeReady = true;
          document.getElementById("upgradeOverlay").style.display = "flex";
        }
      }
    });
  });

  enemies.forEach(e => {
    const dx = player.x - e.x;
    const dy = player.y - e.y;
    const dist = Math.hypot(dx, dy);
    const speed = 1;
    e.x += (dx / dist) * speed;
    e.y += (dy / dist) * speed;

    if (dist < 20) player.hp -= 1;
  });

  if (player.hp <= 0) {
    alert("Game Over!");
    document.location.reload();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawHPBar();

  ctx.fillStyle = "red";
  enemies.forEach(e => ctx.fillRect(e.x - 10, e.y - 10, 20, 20));

  ctx.fillStyle = "white";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 4));
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function spawnEnemy() {
  let e = { x: Math.random() * 800, y: Math.random() * 600 };
  enemies.push(e);
  setTimeout(spawnEnemy, 2000);
}

function shoot() {
  bullets.push({ x: player.x, y: player.y, vx: 5, vy: 0 });
}

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " ") shoot();
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

spawnEnemy();
gameLoop();