// Random Joke Generator - JavaScript

class JokeGenerator {
    constructor() {
        this.jokeCount = 0;
        this.favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStatistics();
        this.displayFavorites();
    }

    setupEventListeners() {
        document.getElementById('getJokeBtn').addEventListener('click', () => this.fetchRandomJoke());
        document.getElementById('getJokeTypeBtn').addEventListener('click', () => this.toggleJokeSelector());
        document.getElementById('favoriteBtn').addEventListener('click', () => this.toggleFavorites());
        document.getElementById('favoriteBtn').addEventListener('dblclick', () => this.clearFavorites());

        // Joke type buttons
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => this.fetchJokeByType(btn.getAttribute('data-type')));
        });
    }

    async fetchRandomJoke() {
        this.showLoading(true);
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
            const data = await response.json();
            this.displayJoke(data);
        } catch (error) {
            console.error('Error fetching joke:', error);
            document.getElementById('jokeText').textContent = 'Error loading joke. Please try again!';
            document.getElementById('jokePunchline').style.display = 'none';
        } finally {
            this.showLoading(false);
        }
    }

    async fetchJokeByType(type) {
        this.showLoading(true);
        this.toggleJokeSelector(); // Hide selector

        try {
            const response = await fetch(`https://v2.jokeapi.dev/joke/${this.mapJokeType(type)}?type=single`);
            const data = await response.json();
            this.displayJoke(data);
        } catch (error) {
            console.error('Error fetching joke:', error);
            document.getElementById('jokeText').textContent = 'Error loading joke. Please try again!';
            document.getElementById('jokePunchline').style.display = 'none';
        } finally {
            this.showLoading(false);
        }
    }

    mapJokeType(type) {
        const typeMap = {
            'general': 'General',
            'programming': 'Programming',
            'knock-knock': 'Knock-Knock'
        };
        return typeMap[type] || 'Any';
    }

    displayJoke(data) {
        const jokeText = document.getElementById('jokeText');
        const jokePunchline = document.getElementById('jokePunchline');

        if (data.type === 'single') {
            jokeText.textContent = data.joke;
            jokePunchline.style.display = 'none';
        } else if (data.type === 'twopart') {
            jokeText.textContent = data.setup;
            jokePunchline.textContent = data.delivery;
            jokePunchline.style.display = 'block';
        }

        this.jokeCount++;
        this.updateStatistics();
        this.addFavoriteButton(data);
    }

    addFavoriteButton(jokeData) {
        const content = document.getElementById('jokeContent');
        const existingBtn = content.querySelector('.add-favorite-btn');
        if (existingBtn) existingBtn.remove();

        const jokeText = jokeData.type === 'single' 
            ? jokeData.joke 
            : `${jokeData.setup} ${jokeData.delivery}`;

        const btn = document.createElement('button');
        btn.className = 'add-favorite-btn';
        btn.textContent = '⭐ Add to Favorites';
        btn.style.cssText = `
            margin-top: 20px;
            padding: 8px 15px;
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid #00ff00;
            color: #00ff00;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            transition: all 0.3s ease;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(0, 255, 0, 0.2)';
            btn.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(0, 255, 0, 0.1)';
            btn.style.boxShadow = 'none';
        });

        btn.addEventListener('click', () => this.addToFavorites(jokeText));
        content.appendChild(btn);
    }

    addToFavorites(joke) {
        if (!this.favorites.includes(joke)) {
            this.favorites.push(joke);
            localStorage.setItem('favoriteJokes', JSON.stringify(this.favorites));
            this.updateStatistics();
            this.showNotification('✓ Added to favorites!');
        } else {
            this.showNotification('⚠ Already in favorites!');
        }
    }

    showNotification(message) {
        const notif = document.createElement('div');
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 0, 0.2);
            border: 2px solid #00ff00;
            color: #00ff00;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }

    displayFavorites() {
        const list = document.getElementById('favoritesList');
        if (this.favorites.length === 0) {
            list.innerHTML = '<p class="empty-message">No favorites yet!</p>';
            return;
        }

        list.innerHTML = this.favorites.map((joke, index) => `
            <div class="favorite-item">
                <p>${joke}</p>
                <button class="remove-favorite" onclick="jokeGen.removeFavorite(${index})">Remove</button>
            </div>
        `).join('');
    }

    removeFavorite(index) {
        this.favorites.splice(index, 1);
        localStorage.setItem('favoriteJokes', JSON.stringify(this.favorites));
        this.displayFavorites();
        this.updateStatistics();
    }

    clearFavorites() {
        if (this.favorites.length > 0 && confirm('Clear all favorites? (Double-click the button again to confirm)')) {
            this.favorites = [];
            localStorage.removeItem('favoriteJokes');
            this.displayFavorites();
            this.updateStatistics();
        }
    }

    toggleJokeSelector() {
        const selector = document.getElementById('jokeSelector');
        selector.style.display = selector.style.display === 'none' ? 'block' : 'none';
    }

    toggleFavorites() {
        const section = document.getElementById('favoritesSection');
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
        this.displayFavorites();
    }

    updateStatistics() {
        document.getElementById('jokeCount').textContent = this.jokeCount;
        document.getElementById('favoriteCount').textContent = this.favorites.length;
        document.getElementById('laughCount').textContent = Math.floor(this.jokeCount * 1.5);
    }

    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        const content = document.getElementById('jokeContent');
        if (show) {
            spinner.style.display = 'flex';
            content.style.display = 'none';
        } else {
            spinner.style.display = 'none';
            content.style.display = 'block';
        }
    }
}

// Add slideInRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
let jokeGen;
document.addEventListener('DOMContentLoaded', () => {
    jokeGen = new JokeGenerator();
});