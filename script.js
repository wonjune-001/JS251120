const body = document.body;
// More snowflakes for a blizzard feel
const numSnowflakes = 400;
const snowflakes = [];

const wind = {
    x: 0,
    y: 1
};
const maxWindX = 4;

// --- Mouse Control ---
window.addEventListener('mousemove', (event) => {
    const centerX = window.innerWidth / 2;
    const influence = (event.x - centerX) / centerX;
    wind.x = influence * maxWindX * -1;
});
window.addEventListener('mouseout', () => {
    wind.x = 0;
});

// --- Snow Creation ---
function createSnowflakes() {
    for (let i = 0; i < numSnowflakes; i++) {
        const el = document.createElement('div');
        el.classList.add('snowflake');
        // Use the Unicode character for a snowflake
        el.innerHTML = '❄';
        body.appendChild(el);

        const size = Math.random() * 10 + 8; // 8px to 18px font-size

        snowflakes.push({
            el,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: size,
            speed: Math.random() * 1.5 + 0.8,
            opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
        });
    }
}

// --- Animation Loop ---
function animateSnow() {
    // Get the top of the ground snow pile
    const groundLevel = window.innerHeight - (parseFloat(groundSnow.style.height) || 0);

    for (const flake of snowflakes) {
        flake.y += wind.y * flake.speed;
        flake.x += wind.x;

        // Check if flake has "landed" on the ground pile
        if (flake.y > groundLevel - flake.size / 2) {
             // Make it fade slightly and stop vertical movement
             flake.el.style.opacity = Math.max(0, flake.opacity - 0.2);
             // Let it still drift horizontally
             flake.x += wind.x * 0.5;
        } else {
            // Reset opacity if it's in the air
            flake.el.style.opacity = flake.opacity;
        }


        // Recycle flakes that go way off-screen
        if (flake.y > window.innerHeight + 20) {
            flake.y = -20;
            flake.x = Math.random() * window.innerWidth;
        }
        if (flake.x > window.innerWidth + 20) {
            flake.x = -20;
        }
        if (flake.x < -20) {
            flake.x = window.innerWidth + 20;
        }

        // Apply styles
        flake.el.style.transform = `translate(${flake.x}px, ${flake.y}px)`;
        flake.el.style.fontSize = `${flake.size}px`;
    }

    requestAnimationFrame(animateSnow);
}

// --- Snow Accumulation ---
const groundSnow = document.querySelector('.snow-pile.ground');
const treeSnowPiles = document.querySelectorAll('.foliage .snow-pile');
let groundHeight = 5; // Start with a small base
let treeSnowHeight = 0;

function accumulateSnow() {
    // Accumulate on the ground
    groundHeight += 0.5;
    groundSnow.style.height = `${Math.min(groundHeight, 80)}px`; // Max height 80px

    // Accumulate on the tree
    if (groundHeight > 20) { // Start accumulating on tree after a while
        treeSnowHeight += 0.2;
        treeSnowPiles.forEach(pile => {
            pile.style.height = `${Math.min(treeSnowHeight, 15)}px`; // Max height 15px
        });
    }
}


createSnowflakes();
animateSnow();
// Start the accumulation after a short delay
setTimeout(() => {
    setInterval(accumulateSnow, 500); // Accumulate every half second
}, 2000);