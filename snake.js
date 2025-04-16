/* Selezione elementi */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

/* Variabili principali */
const boxSize = 20; // Dimensione della casella
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
};
let gameInterval;

/* Disegna un rettangolo */
function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, boxSize, boxSize);
}

/* Disegna il serpente */
function drawSnake() {
    snake.forEach(segment => drawRect(segment.x, segment.y, "#32cd32")); // Verde per il serpente
}

/* Disegna il cibo */
function drawFood() {
    drawRect(food.x, food.y, "#ff0000"); // Rosso per il cibo
}

/* Controlla se il serpente ha mangiato il cibo */
function checkFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({}); // Aggiungi segmento
        food.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
        food.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    } else {
        snake.pop(); // Rimuovi segmento
    }
}

/* Controlla collisioni */
function checkCollision() {
    const head = snake[0];
    // Collisione con i bordi
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Collisione con il corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

/* Muovi il serpente */
function moveSnake() {
    const head = { ...snake[0] }; // Copia della testa del serpente
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    snake.unshift(head); // Nuova testa
    checkFood();
    if (checkCollision()) {
        clearInterval(gameInterval); // Ferma il gioco
        alert("Game Over!");
    }
}

/* Controlli con la tastiera */
document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

/* Disegna il gioco */
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci lo schermo
    drawFood();
    drawSnake();
    moveSnake();
}

/* Avvia il gioco al clic del pulsante */
startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // Nascondi il pulsante
    canvas.style.display = "block"; // Mostra il canvas
    gameInterval = setInterval(drawGame, 100); // Imposta la velocità del gioco
});
