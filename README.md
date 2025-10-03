# 🎮 Riot Legends - Champion Arena

A visually striking, multilingual Riot Games-inspired website built for the AWS Builder Center Rift Rewind Hackathon. This project showcases modern web development techniques with pure HTML, CSS, and JavaScript.

## 🌟 Features

### 🌍 Multilingual Support
- **6 Languages**: English, Telugu, Hindi, Japanese, Korean, Spanish
- **Seamless Switching**: No page reload required
- **Persistent Preference**: Language choice saved locally
- **Complete Translation**: All UI elements, content, and interactive text

### 🎨 Visual Design
- **Dark/Light Themes**: Toggle between Red/Black and White/Gold themes
- **3D Card Effects**: Interactive champion cards with mouse-based 3D rotation
- **Smooth Animations**: GSAP-powered transitions and effects
- **Particle System**: Dynamic floating particles in hero section
- **Responsive Design**: Optimized for all device sizes

### 🎯 Interactive Features

#### 🏆 Champion Selector
- **3D Flip Cards**: Hover effects with parallax rotation
- **Role Filtering**: Filter by Assassin, Mage, Tank, Support
- **Detailed Modals**: Champion lore, abilities, and skins
- **Dynamic Loading**: Smooth animations and transitions

#### 🧠 Interactive Quiz
- **Dynamic Questions**: Multilingual quiz system
- **Visual Feedback**: Animated correct/incorrect responses
- **Progress Tracking**: Real-time progress bar
- **Score System**: Performance-based feedback with animations

#### 🎮 Mini-Game: Skillshot Dodge
- **Canvas-based**: Smooth 60fps gameplay
- **Multiple Controls**: Mouse, touch, and keyboard support
- **Dynamic Difficulty**: Increasing speed and spawn rates
- **Particle Effects**: Explosions and power-up effects
- **Score Tracking**: Real-time score display

#### 🏛️ Motivational Wall
- **Inspirational Quotes**: Gaming and life motivation
- **Multilingual Content**: Translated quotes for each language
- **Interactive Cards**: Hover effects and animations
- **Dynamic Loading**: Content changes based on selected language

### 🎵 Audio & Sound
- **Background Music**: Toggle-able ambient music
- **Sound Effects**: Hover and click audio feedback
- **Volume Control**: Global mute/unmute functionality
- **Autoplay Handling**: Graceful fallback for browser restrictions

### 🎪 Extra "Wow" Features
- **Konami Code**: Hidden rainbow animation easter egg
- **Scroll Animations**: Intersection Observer-based reveals
- **Theme Persistence**: Remembers user preferences
- **Performance Optimized**: Efficient animations and rendering
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone or Download** the project files
2. **Set up a local server** (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Open in browser**: Navigate to `http://localhost:8000`

### File Structure
```
riot-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS with themes and animations
├── script.js           # Main application logic
├── translations.js     # Multilingual translation system
├── champions.js        # Champion data and 3D card functionality
├── quiz.js            # Interactive quiz system
├── minigame.js        # Canvas-based skillshot dodge game
├── assets/            # Audio files directory
│   └── README.md      # Audio setup instructions
└── README.md          # This file
```

## 🎯 Key Implementation Highlights

### Multilingual System
```javascript
// Dynamic language switching without page reload
function setLanguage(lang) {
    currentLanguage = lang;
    updatePageTranslations();
    // Updates all elements with data-translate attributes
}
```

### 3D Card Effects
```css
/* CSS 3D transforms with GSAP animation */
.champion-card:hover {
    transform: translateY(-10px) rotateY(5deg);
    transform-style: preserve-3d;
}
```

### Theme System
```css
/* CSS custom properties for dynamic theming */
:root {
    --primary-bg: #0a0e27;
    --accent-color: #c89b3c;
}

[data-theme="light"] {
    --primary-bg: #f0e6d2;
    --accent-color: #c89b3c;
}
```

### Canvas Game Engine
```javascript
// 60fps game loop with collision detection
gameLoop(currentTime) {
    this.update(deltaTime);
    this.draw();
    requestAnimationFrame((time) => this.gameLoop(time));
}
```

## 🎨 Customization

### Adding New Languages
1. Add translations to `translations.js`
2. Add language option to HTML dropdown
3. Update language selector in `script.js`

### Modifying Themes
1. Update CSS custom properties in `styles.css`
2. Add new theme variants in the theme system
3. Update theme toggle functionality

### Adding Champions
1. Add champion data to `champions.js`
2. Include champion images (placeholder URLs provided)
3. Update quiz questions if desired

## 🏆 AWS Deployment Ready

This website is designed to be deployed on AWS within Free Tier limits:

- **S3 Static Hosting**: All files are static HTML/CSS/JS
- **CloudFront CDN**: Global distribution for fast loading
- **Route 53**: Custom domain support
- **No Server Required**: Pure client-side application

## 🎮 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Performance Features

- **Lazy Loading**: Images and content loaded as needed
- **Efficient Animations**: Hardware-accelerated CSS and GSAP
- **Optimized Assets**: Compressed images and minimal dependencies
- **Caching Strategy**: LocalStorage for preferences
- **Responsive Images**: Placeholder service with proper sizing

## 🎯 Hackathon Compliance

### Challenge 1 Requirements ✅
- ✅ Riot Games-inspired design
- ✅ Dark-themed with vibrant visuals
- ✅ Smooth CSS animations
- ✅ Interactive elements (character selector, news feed)
- ✅ Unique layout and responsive design
- ✅ Creative features (theme toggle, mini-game)

### Multilingual Support ✅
- ✅ Telugu, Hindi, English, Japanese core languages
- ✅ Korean, Spanish for wider reach
- ✅ No page reload language switching
- ✅ Complete UI translation

### Innovation Features ✅
- ✅ 3D interactive champion cards
- ✅ Canvas-based mini-game
- ✅ Dynamic theme system
- ✅ Particle effects and animations
- ✅ Audio integration
- ✅ Easter eggs and hidden features

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive grid layouts
- Optimized touch controls for mini-game
- Mobile-specific animations
- Reduced motion options

## 🎵 Audio Setup

Audio files are optional but enhance the experience:
1. Add MP3 files to `/assets/` directory
2. Files needed: `bg-music.mp3`, `hover.mp3`, `click.mp3`
3. See `/assets/README.md` for detailed instructions

## 🚀 Future Enhancements

- WebXR AR preview feature
- Real Riot Games API integration
- User accounts and progress saving
- Multiplayer mini-game modes
- Advanced particle systems
- Voice narration for accessibility

## 📄 License

This project is created for the AWS Builder Center Rift Rewind Hackathon. All Riot Games references are used for educational and demonstration purposes.

---

**Built with ❤️ for the AWS Builder Center Rift Rewind Hackathon**

*"Victory belongs to the most persevering."* - Napoleon Bonaparte
