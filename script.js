// Game elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const finalScoreDisplay = document.getElementById('final-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const mainMenu = document.getElementById('main-menu');
const winsCounter = document.getElementById('wins-counter');
const winsDisplay = document.getElementById('wins-display');
const previewCanvas = document.getElementById('preview-canvas');
const previewCtx = previewCanvas.getContext('2d');

// Buttons
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const playButton = document.getElementById('play-button');
const dressingRoomButton = document.getElementById('dressing-room-button');
const howToPlayButton = document.getElementById('how-to-play-button');
const dressingRoom = document.getElementById('dressing-room');
const backToMenuButton = document.getElementById('back-to-menu-button');
const saveCustomizationButton = document.getElementById('save-customization-button');
const howToPlayScreen = document.getElementById('how-to-play-screen');
const backFromHowToButton = document.getElementById('back-from-howto-button');
const menuButton = document.getElementById('menu-button');

// Game variables
let gameRunning = false;
let gameSpeed = 7.7; // Bunny normal speed (30% slower, still 10% faster than fox)
let normalGameSpeed = 7.7; // Store the normal game speed
let gravity = 0.5;
let score = 0;
let highScore = 0;
let lastSpawnTime = 0;
let groundLevel = canvas.height - 50;
let obstacleFrequency = 1800; // Time in ms between obstacle spawns (increased for slower game)
let lastObstacleTime = 0;

// Obstacles array
const obstacles = [];

// Bunny variables
const bunny = {
    x: 300,
    y: groundLevel,
    width: 40,
    height: 40,
    jumpStrength: -15,
    velocityY: 0,
    isJumping: false,
    color: '#FFFFFF'
};

// Background variables
const ground = {
    y: groundLevel,
    height: 50,
    color: '#8B4513'
};

// Predefined bunny variable for preview
const previewBunny = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    pattern: 'white',
    hat: 'none',
    accessory: 'none'
};

// Create obstacle function
function createObstacle(xPosition = canvas.width) {
    const isHighObstacle = Math.random() > 0.6;
    
    let height, width, y, color;
    
    if (isHighObstacle) {
        height = Math.random() * 60 + 40;
        width = Math.random() * 15 + 35;
        y = groundLevel - height;
        color = '#FF5733';
    } else {
        height = Math.random() * 30 + 15;
        width = Math.random() * 20 + 40;
        y = groundLevel - height;
        color = '#33FF57';
    }
    
    obstacles.push({
        x: xPosition,
        y: y,
        width: width,
        height: height,
        color: color,
        highObstacle: isHighObstacle
    });
}

// Draw background
function drawBackground() {
    // Sky
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ground
    ctx.fillStyle = ground.color;
    ctx.fillRect(0, ground.y, canvas.width, ground.height);
    
    // Grass
    ctx.fillStyle = '#7CFC00';
    ctx.fillRect(0, ground.y, canvas.width, 5);
}

// Draw bunny
function drawBunny() {
    ctx.fillStyle = bunny.color;
    ctx.beginPath();
    
    // Body
    ctx.ellipse(bunny.x, bunny.y - 15, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.ellipse(bunny.x + 10, bunny.y - 25, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears
    ctx.beginPath();
    ctx.ellipse(bunny.x + 5, bunny.y - 40, 5, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(bunny.x + 15, bunny.y - 40, 5, 15, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Draw obstacles
function drawObstacles() {
    for (const obstacle of obstacles) {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// Update bunny
function updateBunny() {
    // Apply gravity
    bunny.velocityY += gravity;
    bunny.y += bunny.velocityY;
    
    // Check for ground collision
    if (bunny.y >= groundLevel) {
        bunny.y = groundLevel;
        bunny.velocityY = 0;
        bunny.isJumping = false;
    }
}

// Update obstacles
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= gameSpeed;
        
        // Remove obstacles that are off screen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
        }
    }
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    drawBackground();
    
    // Draw and update bunny
    drawBunny();
    updateBunny();
    
    // Draw and update obstacles
    drawObstacles();
    updateObstacles();
    
    // Spawn new obstacles
    const currentTime = Date.now();
    if (currentTime - lastObstacleTime > obstacleFrequency) {
        createObstacle();
        lastObstacleTime = currentTime;
    }
    
    // Continue game loop
    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game function
function startGame() {
    // Reset game state
    gameRunning = true;
    score = 0;
    obstacles.length = 0;
    bunny.y = groundLevel;
    bunny.velocityY = 0;
    bunny.isJumping = false;
    
    // Hide menus
    mainMenu.style.display = 'none';
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    // Show score
    scoreDisplay.style.display = 'block';
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Create initial obstacles
    createObstacle(canvas.width + 100);
    createObstacle(canvas.width + 300);
    
    // Start game loop
    gameLoop();
}

// Jump function
function jump() {
    if (!bunny.isJumping) {
        bunny.velocityY = bunny.jumpStrength;
        bunny.isJumping = true;
    }
}

// Event listener for jumping
document.addEventListener('keydown', function(event) {
    if ((event.code === 'Space' || event.code === 'ArrowUp') && gameRunning) {
        jump();
    }
});

// Show dressing room function
function showDressingRoom() {
    mainMenu.style.display = 'none';
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    scoreDisplay.style.display = 'none';
    dressingRoom.style.display = 'flex';
    howToPlayScreen.style.display = 'none';
}

// Show how to play screen function
function showHowToPlay() {
    mainMenu.style.display = 'none';
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    scoreDisplay.style.display = 'none';
    dressingRoom.style.display = 'none';
    howToPlayScreen.style.display = 'block';
}

// Back to main menu function
function backToMainMenu() {
    mainMenu.style.display = 'flex';
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    scoreDisplay.style.display = 'none';
    dressingRoom.style.display = 'none';
    howToPlayScreen.style.display = 'none';
    
    // Stop game if it's running
    gameRunning = false;
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
playButton.addEventListener('click', startGame);

dressingRoomButton.addEventListener('click', showDressingRoom);
howToPlayButton.addEventListener('click', showHowToPlay);

backToMenuButton.addEventListener('click', backToMainMenu);
backFromHowToButton.addEventListener('click', backToMainMenu);
menuButton.addEventListener('click', backToMainMenu);

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    backToMainMenu(); // Start at main menu
});