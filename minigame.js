// Mini-game: Skillshot Dodge
class SkillshotDodgeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.score = 0;
        this.gameSpeed = 1;
        this.lastTime = 0;
        
        // Game objects
        this.player = {
            x: 50,
            y: this.canvas.height / 2,
            width: 30,
            height: 30,
            speed: 5,
            color: '#c89b3c'
        };
        
        this.skillshots = [];
        this.particles = [];
        this.powerups = [];
        
        // Game settings
        this.skillshotSpawnRate = 0.02;
        this.powerupSpawnRate = 0.005;
        this.maxSkillshots = 8;
        
        this.init();
    }
    
    init() {
        this.setupControls();
        this.setupGameEvents();
        this.resizeCanvas();
        
        // Initial draw
        this.draw();
    }
    
    setupControls() {
        // Mouse controls
        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.gameRunning) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const mouseY = e.clientY - rect.top;
            
            this.player.y = Math.max(0, Math.min(this.canvas.height - this.player.height, mouseY - this.player.height / 2));
        });
        
        // Touch controls for mobile
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.gameRunning) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const touchY = touch.clientY - rect.top;
            
            this.player.y = Math.max(0, Math.min(this.canvas.height - this.player.height, touchY - this.player.height / 2));
        });
        
        // Keyboard controls
        this.keys = {};
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }
    
    setupGameEvents() {
        const startButton = document.getElementById('startGame');
        const closeButton = document.getElementById('closeMiniGame');
        
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startGame();
            });
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.stopGame();
                const modal = document.getElementById('miniGameModal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Close modal when clicking outside
        const modal = document.getElementById('miniGameModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.stopGame();
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
    
    resizeCanvas() {
        // Ensure canvas maintains aspect ratio
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const aspectRatio = 600 / 400;
        
        this.canvas.width = Math.min(600, containerWidth - 40);
        this.canvas.height = this.canvas.width / aspectRatio;
        
        // Update player position if needed
        this.player.y = Math.min(this.player.y, this.canvas.height - this.player.height);
    }
    
    startGame() {
        this.gameRunning = true;
        this.score = 0;
        this.gameSpeed = 1;
        this.skillshots = [];
        this.particles = [];
        this.powerups = [];
        
        // Reset player position
        this.player.x = 50;
        this.player.y = this.canvas.height / 2;
        
        this.updateScore();
        this.gameLoop();
        
        // Update start button
        const startButton = document.getElementById('startGame');
        if (startButton) {
            startButton.textContent = 'Game Running...';
            startButton.disabled = true;
        }
    }
    
    stopGame() {
        this.gameRunning = false;
        
        // Reset start button
        const startButton = document.getElementById('startGame');
        if (startButton) {
            startButton.textContent = getTranslation('minigame.start');
            startButton.disabled = false;
        }
        
        // Show game over effect
        this.showGameOverEffect();
    }
    
    gameLoop(currentTime = 0) {
        if (!this.gameRunning) return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.draw();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        // Update player with keyboard controls
        if (this.keys['ArrowUp'] || this.keys['w'] || this.keys['W']) {
            this.player.y = Math.max(0, this.player.y - this.player.speed);
        }
        if (this.keys['ArrowDown'] || this.keys['s'] || this.keys['S']) {
            this.player.y = Math.min(this.canvas.height - this.player.height, this.player.y + this.player.speed);
        }
        
        // Spawn skillshots
        if (Math.random() < this.skillshotSpawnRate && this.skillshots.length < this.maxSkillshots) {
            this.spawnSkillshot();
        }
        
        // Spawn powerups occasionally
        if (Math.random() < this.powerupSpawnRate) {
            this.spawnPowerup();
        }
        
        // Update skillshots
        this.skillshots.forEach((skillshot, index) => {
            skillshot.x -= skillshot.speed * this.gameSpeed;
            
            // Remove skillshots that are off-screen
            if (skillshot.x + skillshot.width < 0) {
                this.skillshots.splice(index, 1);
                this.score += 10; // Points for surviving
                this.updateScore();
            }
        });
        
        // Update powerups
        this.powerups.forEach((powerup, index) => {
            powerup.x -= 2 * this.gameSpeed;
            powerup.rotation += 0.1;
            
            // Remove powerups that are off-screen
            if (powerup.x + powerup.size < 0) {
                this.powerups.splice(index, 1);
            }
        });
        
        // Update particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            particle.alpha = particle.life;
            
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Increase game speed over time
        this.gameSpeed += 0.0005;
        
        // Increase spawn rate over time
        this.skillshotSpawnRate = Math.min(0.05, this.skillshotSpawnRate + 0.00001);
    }
    
    spawnSkillshot() {
        const types = ['linear', 'homing', 'bouncing'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const skillshot = {
            x: this.canvas.width,
            y: Math.random() * (this.canvas.height - 40),
            width: 60,
            height: 20,
            speed: 3 + Math.random() * 2,
            type: type,
            color: this.getSkillshotColor(type),
            angle: 0,
            targetY: this.player.y
        };
        
        this.skillshots.push(skillshot);
    }
    
    spawnPowerup() {
        const powerup = {
            x: this.canvas.width,
            y: Math.random() * (this.canvas.height - 30),
            size: 25,
            type: 'shield',
            color: '#0596aa',
            rotation: 0
        };
        
        this.powerups.push(powerup);
    }
    
    getSkillshotColor(type) {
        switch (type) {
            case 'linear': return '#ff6b6b';
            case 'homing': return '#f38ba8';
            case 'bouncing': return '#fab387';
            default: return '#ff6b6b';
        }
    }
    
    checkCollisions() {
        // Check skillshot collisions
        this.skillshots.forEach((skillshot, index) => {
            if (this.isColliding(this.player, skillshot)) {
                // Game over
                this.stopGame();
                this.createExplosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
            }
        });
        
        // Check powerup collisions
        this.powerups.forEach((powerup, index) => {
            if (this.isColliding(this.player, powerup)) {
                this.powerups.splice(index, 1);
                this.score += 50;
                this.updateScore();
                this.createPowerupEffect(powerup.x, powerup.y);
            }
        });
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + (rect2.width || rect2.size) &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + (rect2.height || rect2.size) &&
               rect1.y + rect1.height > rect2.y;
    }
    
    createExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                alpha: 1,
                color: '#ff6b6b',
                size: Math.random() * 5 + 2
            });
        }
    }
    
    createPowerupEffect(x, y) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1,
                alpha: 1,
                color: '#0596aa',
                size: Math.random() * 3 + 1
            });
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background grid
        this.drawGrid();
        
        // Draw player
        this.drawPlayer();
        
        // Draw skillshots
        this.skillshots.forEach(skillshot => {
            this.drawSkillshot(skillshot);
        });
        
        // Draw powerups
        this.powerups.forEach(powerup => {
            this.drawPowerup(powerup);
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.drawParticle(particle);
        });
        
        // Draw UI
        this.drawUI();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(200, 155, 60, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    drawPlayer() {
        // Player glow effect
        this.ctx.shadowColor = this.player.color;
        this.ctx.shadowBlur = 15;
        
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        
        // Player details
        this.ctx.fillStyle = '#f0e6d2';
        this.ctx.fillRect(this.player.x + 5, this.player.y + 5, this.player.width - 10, this.player.height - 10);
    }
    
    drawSkillshot(skillshot) {
        this.ctx.save();
        
        // Skillshot glow effect
        this.ctx.shadowColor = skillshot.color;
        this.ctx.shadowBlur = 10;
        
        this.ctx.fillStyle = skillshot.color;
        
        if (skillshot.type === 'linear') {
            this.ctx.fillRect(skillshot.x, skillshot.y, skillshot.width, skillshot.height);
        } else if (skillshot.type === 'homing') {
            // Draw diamond shape for homing skillshots
            this.ctx.translate(skillshot.x + skillshot.width / 2, skillshot.y + skillshot.height / 2);
            this.ctx.rotate(Math.PI / 4);
            this.ctx.fillRect(-skillshot.width / 2, -skillshot.height / 2, skillshot.width, skillshot.height);
        } else if (skillshot.type === 'bouncing') {
            // Draw circle for bouncing skillshots
            this.ctx.beginPath();
            this.ctx.arc(skillshot.x + skillshot.width / 2, skillshot.y + skillshot.height / 2, skillshot.width / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
    
    drawPowerup(powerup) {
        this.ctx.save();
        
        this.ctx.translate(powerup.x + powerup.size / 2, powerup.y + powerup.size / 2);
        this.ctx.rotate(powerup.rotation);
        
        // Powerup glow effect
        this.ctx.shadowColor = powerup.color;
        this.ctx.shadowBlur = 15;
        
        this.ctx.fillStyle = powerup.color;
        this.ctx.fillRect(-powerup.size / 2, -powerup.size / 2, powerup.size, powerup.size);
        
        // Inner detail
        this.ctx.fillStyle = '#f0e6d2';
        this.ctx.fillRect(-powerup.size / 4, -powerup.size / 4, powerup.size / 2, powerup.size / 2);
        
        this.ctx.restore();
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.alpha;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
    
    drawUI() {
        if (!this.gameRunning) return;
        
        // Score display
        this.ctx.fillStyle = '#c89b3c';
        this.ctx.font = 'bold 20px Orbitron';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
        
        // Speed indicator
        this.ctx.fillStyle = '#f0e6d2';
        this.ctx.font = '14px Rajdhani';
        this.ctx.fillText(`Speed: ${this.gameSpeed.toFixed(1)}x`, 10, 55);
        
        // Instructions
        if (this.score < 100) {
            this.ctx.fillStyle = 'rgba(240, 230, 210, 0.7)';
            this.ctx.font = '12px Rajdhani';
            this.ctx.fillText('Use mouse/touch to move, arrow keys also work', 10, this.canvas.height - 10);
        }
    }
    
    showGameOverEffect() {
        // Create game over screen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Game over text
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = 'bold 36px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 40);
        
        // Final score
        this.ctx.fillStyle = '#c89b3c';
        this.ctx.font = 'bold 24px Rajdhani';
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2);
        
        // Restart instruction
        this.ctx.fillStyle = '#f0e6d2';
        this.ctx.font = '16px Rajdhani';
        this.ctx.fillText('Click "Start Game" to play again', this.canvas.width / 2, this.canvas.height / 2 + 40);
        
        this.ctx.textAlign = 'left';
    }
    
    updateScore() {
        const scoreElement = document.getElementById('gameScore');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    }
}

// Initialize mini-game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Create mini-game instance
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            window.miniGame = new SkillshotDodgeGame('gameCanvas');
            console.log('✅ Mini-game initialized');
        } else {
            console.warn('⚠️ Game canvas not found');
        }
        
        // Setup modal triggers
        const ctaButton = document.querySelector('.cta-button');
        const gameNavBtn = document.querySelector('a[href="#game"]');
        const playGameBtn = document.getElementById('playGameBtn');
        const miniGameModal = document.getElementById('miniGameModal');
        
        // Function to open game modal
        const openGameModal = () => {
            try {
                if (miniGameModal) {
                    miniGameModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // Resize canvas when modal opens
                    setTimeout(() => {
                        if (window.miniGame && typeof window.miniGame.resizeCanvas === 'function') {
                            window.miniGame.resizeCanvas();
                        }
                    }, 100);
                }
            } catch (error) {
                console.error('❌ Game modal error:', error);
            }
        };
        
        // Add event listeners to all game buttons
        if (ctaButton) {
            ctaButton.addEventListener('click', openGameModal);
        }
        
        if (gameNavBtn) {
            gameNavBtn.addEventListener('click', (e) => {
                // Don't prevent default for navigation links
                setTimeout(openGameModal, 500); // Delay to allow scroll
            });
        }
        
        if (playGameBtn) {
            playGameBtn.addEventListener('click', openGameModal);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            try {
                if (window.miniGame && typeof window.miniGame.resizeCanvas === 'function') {
                    window.miniGame.resizeCanvas();
                }
            } catch (error) {
                console.error('❌ Game resize error:', error);
            }
        });
        
    } catch (error) {
        console.error('❌ Mini-game initialization error:', error);
    }
});
