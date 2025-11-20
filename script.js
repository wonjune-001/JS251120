const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

function createSnowflakes() {
    const snowflakeCount = 500;
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            density: Math.random() + 1,
            wind: Math.random() * 1 - 0.5
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    for (const snowflake of snowflakes) {
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveSnowflakes();
}

function moveSnowflakes() {
    for (const snowflake of snowflakes) {
        snowflake.y += snowflake.density;
        snowflake.x += snowflake.wind;

        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dx = snowflake.x - mouse.x;
            const dy = snowflake.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (50 - distance) / 50;
                snowflake.x += forceDirectionX * force * 5;
                snowflake.y += forceDirectionY * force * 5;
            }
        }

        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }
        if (snowflake.x > canvas.width) {
            snowflake.x = 0;
        }
        if (snowflake.x < 0) {
            snowflake.x = canvas.width;
        }
    }
}

function animate() {
    drawSnowflakes();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes.length = 0;
    createSnowflakes();
});

createSnowflakes();
animate();

const heading = document.querySelector('h1');

heading.addEventListener('mouseover', () => {
    heading.style.color = '#aaccff';
    heading.style.textShadow = '0 0 10px #ffffff';
});

heading.addEventListener('mouseout', () => {
    heading.style.color = 'white';
    heading.style.textShadow = 'none';
});
