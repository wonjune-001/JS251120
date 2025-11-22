function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    const size = Math.random() * 5 + 2; // 2px to 7px
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.opacity = Math.random();
    
    const animationDuration = Math.random() * 5 + 5; // 5 to 10 seconds
    snowflake.style.animationDuration = `${animationDuration}s`;
    
    const animationDelay = Math.random() * 5; // 0 to 5 seconds
    snowflake.style.animationDelay = `${animationDelay}s`;

    document.body.appendChild(snowflake);

    // Remove snowflake after it falls
    setTimeout(() => {
        snowflake.remove();
    }, (animationDuration + animationDelay) * 1000);
}

function createSnowfall(numberOfSnowflakes) {
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }
}

// Create new snowflakes periodically
createSnowfall(50);
setInterval(() => createSnowfall(10), 1000);
