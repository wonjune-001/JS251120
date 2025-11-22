const body = document.body;
const numSnowflakes = 150;
const snowflakes = [];

const mouse = {
    x: null,
    y: null,
    radius: 100 // Interaction radius around the cursor
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});


function createSnowflakes() {
    for (let i = 0; i < numSnowflakes; i++) {
        const el = document.createElement('div');
        el.classList.add('snowflake');
        body.appendChild(el);

        snowflakes.push({
            el,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 2, // 2px to 6px
            speed: Math.random() * 1.5 + 0.5, // 0.5 to 2
            // Add a horizontal "wind" speed
            wind: (Math.random() - 0.5) * 1.5,
            originalWind: (Math.random() - 0.5) * 1.5,
            opacity: Math.random() * 0.75 + 0.25, // 0.25 to 1.0
        });
    }
}

function animateSnow() {
    for (const flake of snowflakes) {
        // Update position
        flake.y += flake.speed;
        flake.x += flake.wind;

        // Mouse interaction
        if (mouse.x !== null) {
            const dx = mouse.x - flake.x;
            const dy = mouse.y - flake.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                // Make the force stronger the closer the flake is
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = forceDirectionX * force * -5; // Repel force
                const directionY = forceDirectionY * force * -5;
                
                // Apply the force
                flake.x += directionX;
                flake.y += directionY;
            }
        }

        // Reset flakes that go off-screen
        if (flake.y > window.innerHeight) {
            flake.y = -flake.size;
            flake.x = Math.random() * window.innerWidth;
        }
        if (flake.x > window.innerWidth) {
            flake.x = -flake.size;
        }
        if (flake.x < -flake.size) {
            flake.x = window.innerWidth;
        }


        // Apply styles
        flake.el.style.transform = `translate(${flake.x}px, ${flake.y}px)`;
        flake.el.style.width = `${flake.size}px`;
        flake.el.style.height = `${flake.size}px`;
        flake.el.style.opacity = flake.opacity;
    }

    requestAnimationFrame(animateSnow);
}

createSnowflakes();
animateSnow();