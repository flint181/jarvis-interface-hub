// JARVIS Interface Hub - JavaScript

class JARVISInterface {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startStatusUpdates();
        this.animateGreeting();
    }

    setupEventListeners() {
        const cards = document.querySelectorAll('.command-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e));
            card.addEventListener('mouseover', (e) => this.handleCardHover(e));
        });
    }

    handleCardClick(event) {
        const card = event.currentTarget;
        const command = card.getAttribute('data-command');
        const title = card.querySelector('h3').textContent;

        this.executeCommand(command, title);
        this.playClickAnimation(card);
    }

    handleCardHover(event) {
        const card = event.currentTarget;
        this.playScanAnimation(card);
    }

    executeCommand(command, title) {
        const greetingText = document.getElementById('greeting-text');
        const commands = {
            '1': `System Status: All systems operational. Efficiency at 94%.`,
            '2': `Network Scan: 127 devices connected. Threat level: MINIMAL.`,
            '3': `Target Systems: Locked and ready. Coordinates calibrated.`,
            '4': `Defense Shield: Active. Firewall strength: 99.2%.`,
            '5': `Analytics: Generating comprehensive reports...`,
            '6': `Settings: Configuration panel opened. All parameters available.`
        };

        if (greetingText) {
            greetingText.textContent = commands[command] || 'Processing...';
            this.typeEffect(greetingText, commands[command]);
        }

        console.log(`Command ${command} executed: ${title}`);
    }

    typeEffect(element, text) {
        element.textContent = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 30);
            }
        };

        type();
    }

    playClickAnimation(card) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    playScanAnimation(card) {
        const scanline = document.createElement('div');
        scanline.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), transparent);
            animation: scan 0.5s ease-out;
        `;

        card.appendChild(scanline);
        setTimeout(() => scanline.remove(), 500);
    }

    animateGreeting() {
        const greetingText = document.getElementById('greeting-text');
        if (greetingText) {
            setInterval(() => {
                const greetings = [
                    'Ready to assist',
                    'Standing by',
                    'All systems operational',
                    'Awaiting commands'
                ];
                const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
                this.typeEffect(greetingText, randomGreeting);
            }, 8000);
        }
    }

    startStatusUpdates() {
        const updateStatus = () => {
            const cpuFill = document.querySelector('.footer-item:nth-child(1) .progress-fill');
            const memFill = document.querySelector('.footer-item:nth-child(2) .progress-fill');
            const netFill = document.querySelector('.footer-item:nth-child(3) .progress-fill');

            if (cpuFill) cpuFill.style.width = (50 + Math.random() * 40) + '%';
            if (memFill) memFill.style.width = (40 + Math.random() * 50) + '%';
            if (netFill) netFill.style.width = (70 + Math.random() * 25) + '%';
        };

        setInterval(updateStatus, 2000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JARVISInterface();
});

// Add ripple animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }

    @keyframes scan {
        0% {
            top: 0;
            opacity: 1;
        }
        100% {
            top: 100%;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);