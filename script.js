const body = document.body;
const numSnowflakes = 150;
const snowflakes = [];

// Global wind object, controlled by the mouse
const wind = {
    x: 0,
    y: 1 // Base vertical speed
};

const maxWindX = 4; // Maximum horizontal wind speed

window.addEventListener('mousemove', (event) => {
    // Calculate wind based on mouse position relative to center of the screen
    // Mouse on left half -> wind blows right. Mouse on right half -> wind blows left.
    const centerX = window.innerWidth / 2;
    const influence = (event.x - centerX) / centerX; // -1 to 1
    wind.x = influence * maxWindX * -1;
});

window.addEventListener('mouseout', () => {
    // Reset wind when mouse leaves
    wind.x = 0;
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
            // Individual speed variation
            speed: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.75 + 0.25,
        });
    }
}

function animateSnow() {
    for (const flake of snowflakes) {
        // Update position based on global wind and individual speed
        flake.y += wind.y * flake.speed;
        flake.x += wind.x;


        // Reset flakes that go off-screen
        if (flake.y > window.innerHeight) {
            flake.y = -flake.size;
            flake.x = Math.random() * window.innerWidth;
        }
        if (flake.x > window.innerWidth + 20) { // Add buffer for wind
            flake.x = -flake.size;
        }
        if (flake.x < -20) { // Add buffer for wind
            flake.x = window.innerWidth + flake.size;
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
