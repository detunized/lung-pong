const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballSize = 10; // Side length for the square ball
let cigaretteHeight = 10;
let cigaretteWidth = 100;
let cigaretteX = (canvas.width - cigaretteWidth) / 2;
let cigaretteY = (canvas.height - cigaretteHeight) * 7 / 8;
let rightPressed = false;
let leftPressed = false;
let waitForStart = true;

const brickLeft = 70;
const brickTop = 50;
const brickSize = 10;
const brickPadding = 1;

let bricks = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
];

let brickAnimationState = bricks.map(row => row.map(() => 0));

// Event listeners for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function reset() {
    x = canvas.width / 2;
    y = cigaretteY - ballSize;
    dx = 2;
    dy = -2;
    cigaretteX = (canvas.width - cigaretteWidth) / 2;
    waitForStart = true;
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        waitForStart = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
        waitForStart = false;
    } else if (e.keyCode === 32 && waitForStart) {
        waitForStart = false;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Function to draw the square ball
function drawBall() {
    ctx.beginPath();
    ctx.rect(x, y, ballSize, ballSize); // Draw a square instead of a circle
    ctx.fillStyle = "#FFFFFF"; // Make the ball white
    ctx.fill();
    ctx.closePath();
}

// Function to draw the cigarette bat
function drawCigarette() {
    // Main body of the cigarette
    ctx.beginPath();
    ctx.rect(cigaretteX, cigaretteY, cigaretteWidth, cigaretteHeight);
    ctx.fillStyle = "#F8F8FF"; // Light color for the cigarette paper
    ctx.fill();
    ctx.closePath();

    // Filter of the cigarette
    ctx.beginPath();
    ctx.rect(cigaretteX, cigaretteY, cigaretteWidth * 0.2, cigaretteHeight);
    ctx.fillStyle = "#FFDAB9"; // Peach color for the filter
    ctx.fill();
    ctx.closePath();

    // Burning tip of the cigarette
    ctx.beginPath();
    ctx.rect(cigaretteX + cigaretteWidth - (cigaretteWidth * 0.05), cigaretteY, cigaretteWidth * 0.05, cigaretteHeight);
    ctx.fillStyle = "#FF4500"; // Orange color for the burning tip
    ctx.fill();
    ctx.closePath();
}

function getBrickX(row, col) {
    return (col * (brickSize + brickPadding)) + brickPadding + brickLeft;
}

function getBrickY(row, col) {
    return (row * (brickSize + brickPadding)) + brickPadding + brickTop;
}

function getBrickFromCoordinates(x, y) {
    let col = Math.floor((x - brickLeft) / (brickSize + brickPadding));
    let row = Math.floor((y - brickTop) / (brickSize + brickPadding));

    if (col < 0 || row < 0 || row >= bricks.length || col >= bricks[row].length) {
        return undefined;
    }

    return {row, col};
}

function drawBricks() {
    for (let i = 0; i < bricks.length; i++) {
        for (let j = 0; j < bricks[i].length; j++) {
            if (bricks[i][j]) {
                let brickX = getBrickX(i, j);
                let brickY = getBrickY(i, j);
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickSize, brickSize);
                ctx.fillStyle = "#FFFFFF";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawCigarette();

    if (!waitForStart) {
        update();
    }

    requestAnimationFrame(draw);
}

function update() {
    if (rightPressed && cigaretteX < canvas.width - cigaretteWidth) {
        cigaretteX += 5;
    }
    else if (leftPressed && cigaretteX > 0) {
        cigaretteX -= 5;
    }

    let newX = x + dx;
    let newY = y + dy;
    let ballCenterX = newX + (ballSize / 2);
    let ballCenterY = newY + (ballSize / 2);
    let ballCornersX = [newX, newX + ballSize, newX, newX + ballSize];
    let ballCornersY = [newY, newY, newY + ballSize, newY + ballSize];

    let bricksAtCorners = ballCornersX.map((x, i) => getBrickFromCoordinates(x, ballCornersY[i]));
    for (let i = 0; i < 4; i++) {
        let brickRC = bricksAtCorners[i];
        if (!brickRC) {
            continue;
        }

        let brick = bricks[brickRC.row][brickRC.col];
        if (!brick) {
            continue;
        }

        let brickX = getBrickX(brickRC.row, brickRC.col);
        let brickY = getBrickY(brickRC.row, brickRC.col);

        let brickCenterX = brickX + (brickSize / 2);
        let brickCenterY = brickY + (brickSize / 2);

        let overlapX = Math.abs(ballCenterX - brickCenterX);
        let overlapY = Math.abs(ballCenterY - brickCenterY);

        if (overlapX < (ballSize + brickSize) / 2 && overlapY < (ballSize + brickSize) / 2) {
            bricks[brickRC.row][brickRC.col] = 0;
            brickAnimationState[brickRC.row][brickRC.col] = 0;

            if (overlapX >= overlapY) {
                dx = -dx;
            } else {
                dy = -dy;
            }

            break;
        }
    }

    x += dx;
    y += dy;

    // Detect wall collision for x-axis
    if(x + dx > canvas.width - ballSize || x + dx < 0) {
        dx = -dx;
    }

    // Detect wall collision for y-axis
    if (y + dy < 0) {
        dy = -dy;
    } else if (y + ballSize <= cigaretteY && y + dy + ballSize >= cigaretteY) {
        if(x > cigaretteX && x < cigaretteX + cigaretteWidth) {
            dy = -dy;
        }
    } else if (y + dy > canvas.height) {
        // Implement game over condition or ball reset logic here
        reset();
    }
}

// Set the background color of the canvas
canvas.style.background = "#000000";

reset();
waitForStart = false;
draw(); // Call the draw function to start the game loop
