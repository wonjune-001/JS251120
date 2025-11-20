document.addEventListener('DOMContentLoaded', () => {

    // 1. Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        // Use transform for better performance
        cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // 2. Main Title Animation on Load
    const mainTitle = document.querySelector('.main-title');
    // We use a small timeout to ensure the CSS is loaded before we change the class
    setTimeout(() => {
        mainTitle.classList.remove('hidden');
        mainTitle.classList.add('visible');
    }, 100);

    // 3. Scroll-based Animations for Cards
    const observerOptions = {
        root: null, // use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => {
        // Don't observe the main title again, it's already handled
        if (!el.classList.contains('main-title')) {
            observer.observe(el);
        }
    });

});
