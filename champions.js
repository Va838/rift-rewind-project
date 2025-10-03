// Champions data
const championsData = [
    {
        id: 1,
        name: "Yasuo",
        role: "assassin",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
        description: "An Ionian of deep resolve, Yasuo is an agile swordsman who wields the air itself against his enemies.",
        abilities: ["Steel Tempest", "Wind Wall", "Sweeping Blade", "Last Breath"],
        lore: "Yasuo is a man of resolve, an agile warrior who wields the power of the wind itself to cut down his enemies. This once-proud warrior has been disgraced by false accusations and forced into a desperate fight for survival.",
        skins: ["High Noon", "PROJECT", "Blood Moon", "Spirit Blossom"]
    },
    {
        id: 2,
        name: "Ahri",
        role: "mage",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
        description: "Innately connected to the latent power of Runeterra, Ahri is a vastaya who can reshape magic into orbs of raw energy.",
        abilities: ["Orb of Deception", "Fox-Fire", "Charm", "Spirit Rush"],
        lore: "Ahri is a vastaya who feeds off the life essence of others. She roams the world in search of more victims, but has begun to feel remorse for her actions.",
        skins: ["Popstar", "Arcade", "K/DA", "Spirit Blossom"]
    },
    {
        id: 3,
        name: "Garen",
        role: "tank",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg",
        description: "A proud and noble warrior, Garen fights as one of the Dauntless Vanguard. He is popular among his fellows, and respected well enough among his enemies.",
        abilities: ["Decisive Strike", "Courage", "Judgment", "Demacian Justice"],
        lore: "Garen is a warrior of Demacia who has devoted his life to defending his homeland and its ideals. He is the embodiment of Demacian values.",
        skins: ["Steel Legion", "Commando", "Dreadknight", "God King"]
    },
    {
        id: 4,
        name: "Soraka",
        role: "support",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Soraka_0.jpg",
        description: "A healer gifted with the magic of the stars, Soraka holds the lives of her allies in her hands.",
        abilities: ["Starcall", "Astral Infusion", "Equinox", "Wish"],
        lore: "Soraka is a being of the celestial realm who gave up her immortality to help the mortals of Runeterra.",
        skins: ["Dryad", "Divine", "Star Guardian", "Nightbringer"]
    },
    {
        id: 5,
        name: "Zed",
        role: "assassin",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg",
        description: "The master of shadows, Zed is the leader of the Order of Shadow and the most deadly assassin in all of Ionia.",
        abilities: ["Razor Shuriken", "Living Shadow", "Shadow Slash", "Death Mark"],
        lore: "Zed is the first ninja in over a century to unlock the ancient, forbidden ways. He defied his clan and master, casting off the balance and discipline that had shackled him all his life.",
        skins: ["Shockblade", "PROJECT", "Championship", "Galaxy Slayer"]
    },
    {
        id: 6,
        name: "Lux",
        role: "mage",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
        description: "Luxanna Crownguard hails from Demacia, an insular realm where magical abilities are viewed with fear and suspicion.",
        abilities: ["Light Binding", "Prismatic Barrier", "Lucent Singularity", "Final Spark"],
        lore: "Born to the prestigious Crownguards, Lux was destined for a life of privilege, but her magical abilities marked her as different.",
        skins: ["Steel Legion", "Star Guardian", "Elementalist", "Cosmic"]
    }
];

// Champion functionality
class ChampionManager {
    constructor() {
        this.champions = championsData;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderChampions();
        this.setupFilters();
        this.setupChampionModal();
    }

    renderChampions(filter = 'all') {
        const grid = document.getElementById('championsGrid');
        if (!grid) return;

        const filteredChampions = filter === 'all' 
            ? this.champions 
            : this.champions.filter(champion => champion.role === filter);

        grid.innerHTML = '';

        filteredChampions.forEach((champion, index) => {
            const championCard = this.createChampionCard(champion, index);
            grid.appendChild(championCard);
        });

        // Animate cards in
        gsap.from('.champion-card', {
            duration: 0.6,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    getColorForRole(role) {
        const colors = {
            'assassin': 'ff6b6b',
            'mage': '4ecdc4', 
            'tank': '45b7d1',
            'support': '96ceb4'
        };
        return colors[role] || 'c89b3c';
    }

    createChampionCard(champion, index) {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.dataset.role = champion.role;
        card.dataset.championId = champion.id;

        const roleColor = this.getColorForRole(champion.role);
        
        card.innerHTML = `
            <img src="${champion.image}" alt="${champion.name}" class="champion-image" 
                 onerror="this.src='https://via.placeholder.com/300x200/${roleColor}/ffffff?text=${champion.name}'">
            <div class="champion-info">
                <h3 class="champion-name">${champion.name}</h3>
                <p class="champion-role">${champion.role.toUpperCase()}</p>
                <p class="champion-description">${champion.description}</p>
            </div>
        `;

        // Add 3D hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(card, {
                duration: 0.3,
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                rotationX: 0,
                rotationY: 0,
                ease: "power2.out"
            });
        });

        // Add click handler for modal
        card.addEventListener('click', () => {
            this.showChampionDetail(champion);
            this.playSound('click');
        });

        // Add hover sound
        card.addEventListener('mouseenter', () => {
            this.playSound('hover');
        });

        return card;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value and render champions
                const filter = button.dataset.filter;
                this.currentFilter = filter;
                this.renderChampions(filter);
                
                this.playSound('click');
            });
        });
    }

    setupChampionModal() {
        const modal = document.getElementById('championModal');
        const closeBtn = document.getElementById('closeChampion');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll
            }
        });
    }

    showChampionDetail(champion) {
        const modal = document.getElementById('championModal');
        const championInfo = document.getElementById('championInfo');
        
        if (!modal || !championInfo) return;

        championInfo.innerHTML = `
            <div class="champion-detail-content">
                <div class="champion-detail-header">
                    <img src="${champion.image}" alt="${champion.name}" class="champion-detail-image" 
                         onerror="this.src='https://via.placeholder.com/250x350/${this.getColorForRole(champion.role)}/ffffff?text=${champion.name}'">
                    <div class="champion-detail-info">
                        <h2>${champion.name}</h2>
                        <p class="champion-detail-role">${champion.role.toUpperCase()}</p>
                        <p class="champion-detail-description">${champion.description}</p>
                    </div>
                </div>
                
                <div class="champion-abilities">
                    <h3>Abilities</h3>
                    <div class="abilities-grid">
                        ${champion.abilities.map(ability => `
                            <div class="ability-item">
                                <i class="fas fa-magic"></i>
                                <span>${ability}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="champion-lore">
                    <h3>Lore</h3>
                    <p>${champion.lore}</p>
                </div>
                
                <div class="champion-skins">
                    <h3>Skins</h3>
                    <div class="skins-grid">
                        ${champion.skins.map(skin => `
                            <div class="skin-item">
                                <i class="fas fa-tshirt"></i>
                                <span>${skin}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Animate modal content
        gsap.from('.champion-detail-content', {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.7)"
        });
    }

    playSound(type) {
        const audio = document.getElementById(type + 'Sound');
        if (audio && !audio.muted) {
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Handle autoplay restrictions
            });
        }
    }

    // Method to get random champion for hero section
    getRandomChampion() {
        return this.champions[Math.floor(Math.random() * this.champions.length)];
    }

    // Method to update hero champion periodically
    startHeroRotation() {
        const heroChampion = document.getElementById('heroChampion');
        if (!heroChampion) return;

        setInterval(() => {
            const randomChampion = this.getRandomChampion();
            
            gsap.to(heroChampion, {
                duration: 0.5,
                opacity: 0,
                scale: 0.8,
                onComplete: () => {
                    heroChampion.src = randomChampion.image;
                    heroChampion.alt = randomChampion.name;
                    
                    gsap.to(heroChampion, {
                        duration: 0.5,
                        opacity: 1,
                        scale: 1,
                        ease: "back.out(1.7)"
                    });
                }
            });
        }, 5000); // Change every 5 seconds
    }
}

// Initialize champion manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.championManager = new ChampionManager();
        
        // Start hero champion rotation after a delay
        setTimeout(() => {
            if (window.championManager && typeof window.championManager.startHeroRotation === 'function') {
                window.championManager.startHeroRotation();
            }
        }, 3000);
        
        console.log('✅ Champion system initialized');
    } catch (error) {
        console.error('❌ Champion system error:', error);
    }
});
