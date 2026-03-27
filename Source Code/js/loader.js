/**
 * Filename: loader.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: 2026-03-26
 * License: MIT
 *
 * Tech Stack: JavaScript (DOM Orchestration)
 *
 * Description: 
 * Initialization sequence controller for the terminal workspace. 
 * Orchestrates kernel-level status updates and view transitions.
 */

class TerminalLoader {
    constructor(loaderId, statusId) {
        this.loader = document.getElementById(loaderId);
        this.statusText = document.getElementById(statusId);
    }

    async boot() {
        console.log("Terminal Kernel: Initiating boot sequence...");
        if (!this.loader || !this.statusText) {
            console.warn("Terminal Kernel: Loader elements missing, bypassing.");
            return Promise.resolve();
        }

        // Failsafe: Force hide after 5 seconds regardless of progress
        const timeout = setTimeout(() => {
            console.warn("Terminal Kernel: Boot sequence timed out. Force-revealing UI.");
            this.loader.classList.add('hidden');
        }, 5000);

        const bootSteps = [
            { text: "INITIALIZING KERNEL...", progress: 25 },
            { text: "MOUNTING REGISTRY...", progress: 50 },
            { text: "CALIBRATING SYMMETRY...", progress: 85 },
            { text: "TECHNICAL SYNC COMPLETE.", progress: 100 }
        ];

        let currentProgress = 0;
        try {
            for (const step of bootSteps) {
                while (currentProgress < step.progress) {
                    currentProgress++;
                    this.statusText.innerHTML = `${step.text} <span class="loader-percent">(${currentProgress}%)</span>`;
                    const jitter = Math.random() * 15;
                    await this.delay(8 + jitter);
                }
                await this.delay(300);
            }
        } catch (e) {
            console.error("Terminal Kernel: Boot failure.", e);
        } finally {
            clearTimeout(timeout);
            await this.delay(200);
            this.loader.classList.add('hidden');
            console.log("Terminal Kernel: Boot sequence finalized.");
        }
        return this.delay(600); 
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
