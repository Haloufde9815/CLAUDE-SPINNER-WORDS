/**
 * Filename: navigation.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: 2026-03-27
 * License: MIT
 *
 * Tech Stack: JavaScript (DOM Navigation)
 *
 * Description: 
 * Handles page navigation aesthetics and scroll behaviors.
 * Implements the "Back to Top" reveal logic and smooth scrolling orchestration.
 */

document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = `
        <span class="btn-label">TOP</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4l-8 8h16l-8-8z" fill="currentColor"/>
        </svg>
    `;
    document.body.appendChild(backToTopBtn);

    // Visibility toggle based on scroll threshold
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('reveal');
        } else {
            backToTopBtn.classList.remove('reveal');
        }
    });

    // Smooth scroll execution
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
