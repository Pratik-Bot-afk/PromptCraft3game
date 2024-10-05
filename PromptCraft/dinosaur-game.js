const dinoCanvas = document.getElementById('dinoCanvas');
const dinoContext = dinoCanvas.getContext('2d');

const dino = {
    x: 50,
    y: 300,
    width: 40,
    height: 40,
    jumping: false,
    jumpHeight: 100,
    jumpSpeed: 5,
    gravity: 0.5,
};

const obstacles = [];
let obstacleFrequency = 90;
let frameCount = 0;

let score = 0;
let gameOver = false;

function drawDino() {
    dinoContext.fillStyle = 'green';
    dinoContext.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    dinoContext.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        dinoContext.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function update() {
    if (gameOver) return;

    if (dino.jumping) {
        dino.y -= dino.jumpSpeed;
        dino.velocity -= dino.gravity;

        if (dino.y <= 300 - dino.jumpHeight) {
            dino.jumping = false;
        }
    } else {
        if (dino.y < 300) {
            dino.y += dino.jumpSpeed;
        }
    }

    if (frameCount % obstacleFrequency === 0) {
        const obstacleHeight = Math.random() * (200 - 20) + 20;
        obstacles.push({
            x: dinoCanvas.width,
            y: 300 - obstacleHeight,
            width: 20,
            height: obstacleHeight,
        });
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 6;

        if (
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.x + dino.width > obstacles[i].x &&
            dino.y + dino.height > obstacles[i].y
        ) {
            gameOver = true;
        }

        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
        }
    }

    frameCount++;
}

function draw() {
    dinoContext.clearRect(0, 0, dinoCanvas.width, dinoCanvas.height);
    drawDino();
    drawObstacles();
    document.getElementById('dinoScore').innerText = 'Score: ' + score;

    if (!gameOver) {
        requestAnimationFrame(draw);
        update();
    } else {
        dinoContext.font = '48px serif';
        dinoContext.fillText('Game Over!', dinoCanvas.width / 2 - 120, dinoCanvas.height / 2);
        dinoContext.font = '24px serif';
        dinoContext.fillText('Score: ' + score, dinoCanvas.width / 2 - 50, dinoCanvas.height / 2 + 30);
    }
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !dino.jumping && !gameOver) {
        dino.jumping = true;
    }
});

draw();
