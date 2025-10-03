// FRESH WORKING FUNCTIONS - NO CONFLICTS

// Game variables
let gameActive = false;
let gameScore = 0;
let gameTimer = null;

// Simple working game
function openGame() {
    document.getElementById('gameModal').style.display = 'block';
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
    if (gameTimer) {
        clearInterval(gameTimer);
        gameActive = false;
    }
}

function startSkillshotGame() {
    if (gameActive) return;
    
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('startGame');
    
    gameActive = true;
    gameScore = 0;
    btn.textContent = 'Playing...';
    btn.disabled = true;
    
    let player = { x: 50, y: 200, w: 20, h: 20 };
    let enemies = [];
    
    gameTimer = setInterval(() => {
        ctx.clearRect(0, 0, 600, 400);
        
        // Add enemy
        if (Math.random() < 0.03) {
            enemies.push({ x: 600, y: Math.random() * 380, w: 15, h: 15 });
        }
        
        // Move enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            enemies[i].x -= 3;
            
            if (enemies[i].x < -15) {
                enemies.splice(i, 1);
                gameScore += 10;
                continue;
            }
            
            // Collision
            if (enemies[i].x < player.x + player.w &&
                enemies[i].x + enemies[i].w > player.x &&
                enemies[i].y < player.y + player.h &&
                enemies[i].y + enemies[i].h > player.y) {
                
                clearInterval(gameTimer);
                gameActive = false;
                btn.textContent = 'Start Game';
                btn.disabled = false;
                alert('Game Over! Score: ' + gameScore);
                return;
            }
        }
        
        // Draw
        ctx.fillStyle = '#c89b3c';
        ctx.fillRect(player.x, player.y, player.w, player.h);
        
        ctx.fillStyle = '#dc3545';
        enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));
        
        document.getElementById('gameScore').textContent = 'Score: ' + gameScore;
        
    }, 20);
    
    // Mouse control
    canvas.onmousemove = (e) => {
        if (gameActive) {
            const rect = canvas.getBoundingClientRect();
            player.x = e.clientX - rect.left - 10;
            player.y = e.clientY - rect.top - 10;
        }
    };
}

// Simple working multilingual
function changeLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Navigation
    const nav = document.querySelectorAll('.nav-links a');
    nav[0].textContent = t.navHome;
    nav[1].textContent = t.navChampions;
    nav[2].textContent = t.navQuiz;
    nav[3].textContent = t.navGame;
    
    // Hero
    document.querySelector('.hero-title').textContent = t.heroTitle;
    document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
    
    // Sections
    const sections = document.querySelectorAll('.section-title');
    sections[0].textContent = t.championsTitle;
    sections[1].textContent = t.quizTitle;
    sections[2].textContent = t.gameTitle;
    
    // Game section
    document.querySelector('#game h3').textContent = t.gameSubtitle;
    document.querySelector('#game p').textContent = t.gameDescription;
    document.querySelector('#game .play-btn').textContent = t.gamePlay;
}
