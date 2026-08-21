# JARVIS Interface Hub

A sleek, futuristic interface inspired by JARVIS from Iron Man. Features smooth animations, glowing effects, and interactive modules including a Random Joke Generator.

## 🎯 Main Features

### **Main Interface (index.html)**
- ✨ Sleek UI design with dark cyberpunk aesthetic
- 🎭 Smooth animations (flickering glow, pulsing effects, wave animations)
- 🎮 6 interactive command cards
- 📊 Real-time system status display
- 📱 Fully responsive design

### **Random Joke Generator (joke-generator.html)** NEW!
- 😂 Fetches random jokes from Official Joke API
- 🎪 Multiple joke categories (General, Programming, Knock-Knock)
- ⭐ Add jokes to favorites (saved in localStorage)
- 📈 Real-time statistics tracking
- 🎨 Smooth animations and transitions
- 💾 Persistent storage of favorite jokes

## 📁 Files

```
jarvis-interface-hub/
├── index.html              # Main JARVIS interface
├── style.css              # Main interface styling
├── script.js              # Main interface interactivity
├── joke-generator.html    # Joke generator page
├── joke-style.css         # Joke generator styling
├── joke-script.js         # Joke generator functionality
└── README.md              # This file
```

## 🚀 How to Use

### Main Interface
1. Open `index.html` in your browser
2. Click on any command card to execute commands
3. Hover over cards to see scanning effects
4. Watch system status update in real-time

### Joke Generator
1. Open `joke-generator.html` in your browser
2. Click "🎭 Get Random Joke" to fetch a random joke
3. Click "🎪 Choose Category" to select specific joke types
4. Click "❤️ Favorites" to view or manage saved jokes
5. Click "⭐ Add to Favorites" on a joke to save it
6. Double-click the Favorites button to clear all saved jokes

## 🎨 Customization

### Colors
Edit CSS variables in `style.css` or `joke-style.css`:
```css
:root {
    --primary-blue: #0099ff;
    --accent-blue: #00d4ff;
    --dark-bg: #0a0e27;
    --success-color: #00ff00;
}
```

### Add More Joke Types
Edit the `mapJokeType()` function in `joke-script.js` and add new buttons to `joke-generator.html`:
```javascript
mapJokeType(type) {
    const typeMap = {
        'general': 'General',
        'programming': 'Programming',
        'knock-knock': 'Knock-Knock',
        'your-type': 'YourType'  // Add new type
    };
    return typeMap[type] || 'Any';
}
```

## 🔌 External APIs

**Official Joke API**
- Endpoint: `https://v2.jokeapi.dev/joke/`
- Free to use, no authentication required
- Supports multiple categories and formats
- [API Documentation](https://jokeapi.dev/)

## 💾 Local Storage

Favorite jokes are saved in browser's localStorage under `favoriteJokes`:
```javascript
localStorage.getItem('favoriteJokes')  // Retrieve favorites
localStorage.removeItem('favoriteJokes')  // Clear favorites
```

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (Responsive)

## ⚡ Performance

- GPU-accelerated animations
- Efficient CSS animations (60fps)
- Minimal DOM manipulation
- Lightweight API calls with error handling

## 🔄 Updates

**Version 1.1 - Added Features:**
- Random Joke Generator module
- Favorites system with localStorage
- Statistics tracking
- Multiple joke categories
- Error handling

## 📝 Notes

- Jokes are fetched from the Official Joke API
- Favorites persist across browser sessions
- Statistics reset on page refresh
- Requires internet connection for joke fetching

---

**Enjoy your JARVIS Interface Hub with Humor Module!** 🤖✨