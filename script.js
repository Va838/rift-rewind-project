// Game variables (declare at top to avoid conflicts)
let gameRunning = false;
let score = 0;
let gameInterval = null;
let currentLanguage = 'en';
let currentTheme = 'dark';
let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let gameRunning = false;
let gameScore = 0;

// Complete Translations
const translations = {
    en: {
        title: "Riot Legends - Gaming Website",
        logo: "RIOT LEGENDS",
        nav: {
            home: "Home",
            champions: "Champions", 
            quiz: "Quiz",
            game: "Game",
            news: "News"
        },
        hero: {
            title: "ENTER THE RIFT",
            subtitle: "Master the Legends, Conquer the Battlefield",
            cta: "START YOUR JOURNEY"
        },
        champions: {
            title: "CHOOSE YOUR CHAMPION",
            all: "All",
            assassin: "Assassin",
            mage: "Mage", 
            tank: "Tank",
            support: "Support",
            role: "Role:",
            description: "Description:",
            abilities: "Abilities:",
            lore: "Lore:"
        },
        quiz: {
            title: "CHAMPION KNOWLEDGE QUIZ",
            score: "Score:",
            start: "Start Quiz",
            next: "Next",
            complete: "Quiz Complete!",
            finalScore: "Your final score:",
            restart: "Restart Quiz"
        },
        game: {
            title: "SKILLSHOT DODGE GAME",
            subtitle: "Test Your Reflexes!",
            description: "Dodge incoming skillshots and survive as long as possible.",
            play: "🎮 PLAY NOW",
            modal: {
                title: "Skillshot Dodge",
                start: "Start Game",
                score: "Score:",
                instructions: "Use mouse or WASD keys to move",
                gameOver: "Game Over! Final Score:",
                running: "Game Running..."
            }
        },
        news: {
            title: "LATEST UPDATES"
        }
    },
    te: {
        title: "రైట్ లెజెండ్స్ - గేమింగ్ వెబ్‌సైట్",
        logo: "రైట్ లెజెండ్స్",
        nav: {
            home: "హోమ్",
            champions: "చాంపియన్స్",
            quiz: "క్విజ్",
            game: "గేమ్",
            news: "వార్తలు"
        },
        hero: {
            title: "రిఫ్ట్‌లోకి ప్రవేశించండి",
            subtitle: "లెజెండ్స్‌ను మాస్టర్ చేయండి, యుద్ధభూమిని జయించండి",
            cta: "మీ ప్రయాణం ప్రారంభించండి"
        },
        champions: {
            title: "మీ చాంపియన్‌ను ఎంచుకోండి",
            all: "అన్నీ",
            assassin: "హంతకుడు",
            mage: "మాంత్రికుడు",
            tank: "ట్యాంక్",
            support: "మద్దతు",
            role: "పాత్ర:",
            description: "వివరణ:",
            abilities: "సామర్థ్యాలు:",
            lore: "కథ:"
        },
        quiz: {
            title: "చాంపియన్ జ్ఞాన పరీక్ష",
            score: "స్కోర్:",
            start: "క్విజ్ ప్రారంభించండి",
            next: "తదుపరి",
            complete: "క్విజ్ పూర్తయింది!",
            finalScore: "మీ చివరి స్కోర్:",
            restart: "మళ్లీ ప్రయత్నించండి"
        },
        game: {
            title: "స్కిల్‌షాట్ డాడ్జ్ గేమ్",
            subtitle: "మీ రిఫ్లెక్స్‌లను పరీక్షించండి!",
            description: "వచ్చే స్కిల్‌షాట్‌లను తప్పించండి మరియు వీలైనంత కాలం జీవించండి।",
            play: "🎮 ఇప్పుడే ఆడండి",
            modal: {
                title: "స్కిల్‌షాట్ డాడ్జ్",
                start: "గేమ్ ప్రారంభించండి",
                score: "స్కోర్:",
                instructions: "కదలడానికి మౌస్ లేదా WASD కీలను ఉపయోగించండి",
                gameOver: "గేమ్ ముగిసింది! చివరి స్కోర్:",
                running: "గేమ్ నడుస్తోంది..."
            }
        },
        news: {
            title: "తాజా అప్‌డేట్‌లు"
        }
    },
    hi: {
        title: "रायट लेजेंड्स - गेमिंग वेबसाइट",
        logo: "रायट लेजेंड्स",
        nav: {
            home: "होम",
            champions: "चैंपियन्स",
            quiz: "क्विज़",
            game: "गेम",
            news: "समाचार"
        },
        hero: {
            title: "रिफ्ट में प्रवेश करें",
            subtitle: "लेजेंड्स को मास्टर करें, युद्धक्षेत्र को जीतें",
            cta: "अपनी यात्रा शुरू करें"
        },
        champions: {
            title: "अपना चैंपियन चुनें",
            all: "सभी",
            assassin: "हत्यारा",
            mage: "जादूगर",
            tank: "टैंक",
            support: "सहायता",
            role: "भूमिका:",
            description: "विवरण:",
            abilities: "क्षमताएं:",
            lore: "कहानी:"
        },
        quiz: {
            title: "चैंपियन ज्ञान क्विज़",
            score: "स्कोर:",
            start: "क्विज़ शुरू करें",
            next: "अगला",
            complete: "क्विज़ पूरा!",
            finalScore: "आपका अंतिम स्कोर:",
            restart: "फिर से शुरू करें"
        },
        game: {
            title: "स्किलशॉट डॉज गेम",
            subtitle: "अपने रिफ्लेक्स का परीक्षण करें!",
            description: "आने वाले स्किलशॉट्स से बचें और जितनी देर हो सके जीवित रहें।",
            play: "🎮 अभी खेलें",
            modal: {
                title: "स्किलशॉट डॉज",
                start: "गेम शुरू करें",
                score: "स्कोर:",
                instructions: "चलने के लिए माउस या WASD कीज़ का उपयोग करें",
                gameOver: "गेम ओवर! अंतिम स्कोर:",
                running: "गेम चल रहा है..."
            }
        },
        news: {
            title: "नवीनतम अपडेट"
        }
    },
    ja: {
        title: "ライオットレジェンズ - ゲーミングウェブサイト",
        logo: "ライオットレジェンズ",
        nav: {
            home: "ホーム",
            champions: "チャンピオン",
            quiz: "クイズ",
            game: "ゲーム",
            news: "ニュース"
        },
        hero: {
            title: "リフトに入る",
            subtitle: "レジェンドをマスターし、戦場を征服する",
            cta: "旅を始める"
        },
        champions: {
            title: "チャンピオンを選ぶ",
            all: "すべて",
            assassin: "アサシン",
            mage: "メイジ",
            tank: "タンク",
            support: "サポート",
            role: "役割:",
            description: "説明:",
            abilities: "アビリティ:",
            lore: "ストーリー:"
        },
        quiz: {
            title: "チャンピオン知識クイズ",
            score: "スコア:",
            start: "クイズ開始",
            next: "次へ",
            complete: "クイズ完了！",
            finalScore: "最終スコア:",
            restart: "再開始"
        },
        game: {
            title: "スキルショット回避ゲーム",
            subtitle: "反射神経をテスト！",
            description: "飛んでくるスキルショットを避けて、できるだけ長く生き残ろう。",
            play: "🎮 今すぐプレイ",
            modal: {
                title: "スキルショット回避",
                start: "ゲーム開始",
                score: "スコア:",
                instructions: "移動にはマウスまたはWASDキーを使用",
                gameOver: "ゲームオーバー！最終スコア:",
                running: "ゲーム実行中..."
            }
        },
        news: {
            title: "最新アップデート"
        }
    },
    ko: {
        title: "라이엇 레전드 - 게이밍 웹사이트",
        logo: "라이엇 레전드",
        nav: {
            home: "홈",
            champions: "챔피언",
            quiz: "퀴즈",
            game: "게임",
            news: "뉴스"
        },
        hero: {
            title: "리프트에 입장하세요",
            subtitle: "레전드를 마스터하고 전장을 정복하세요",
            cta: "여정을 시작하세요"
        },
        champions: {
            title: "챔피언을 선택하세요",
            all: "전체",
            assassin: "암살자",
            mage: "마법사",
            tank: "탱커",
            support: "서포터",
            role: "역할:",
            description: "설명:",
            abilities: "스킬:",
            lore: "스토리:"
        },
        quiz: {
            title: "챔피언 지식 퀴즈",
            score: "점수:",
            start: "퀴즈 시작",
            next: "다음",
            complete: "퀴즈 완료!",
            finalScore: "최종 점수:",
            restart: "다시 시작"
        },
        game: {
            title: "스킬샷 피하기 게임",
            subtitle: "반사신경을 테스트하세요!",
            description: "날아오는 스킬샷을 피하고 최대한 오래 살아남으세요.",
            play: "🎮 지금 플레이",
            modal: {
                title: "스킬샷 피하기",
                start: "게임 시작",
                score: "점수:",
                instructions: "이동하려면 마우스나 WASD 키를 사용하세요",
                gameOver: "게임 오버! 최종 점수:",
                running: "게임 실행 중..."
            }
        },
        news: {
            title: "최신 업데이트"
        }
    },
    es: {
        title: "Riot Legends - Sitio Web de Juegos",
        logo: "RIOT LEGENDS",
        nav: {
            home: "Inicio",
            champions: "Campeones",
            quiz: "Quiz",
            game: "Juego",
            news: "Noticias"
        },
        hero: {
            title: "ENTRA EN LA GRIETA",
            subtitle: "Domina las Leyendas, Conquista el Campo de Batalla",
            cta: "COMIENZA TU VIAJE"
        },
        champions: {
            title: "ELIGE TU CAMPEÓN",
            all: "Todos",
            assassin: "Asesino",
            mage: "Mago",
            tank: "Tanque",
            support: "Apoyo",
            role: "Rol:",
            description: "Descripción:",
            abilities: "Habilidades:",
            lore: "Historia:"
        },
        quiz: {
            title: "QUIZ DE CONOCIMIENTO DE CAMPEONES",
            score: "Puntuación:",
            start: "Iniciar Quiz",
            next: "Siguiente",
            complete: "¡Quiz Completado!",
            finalScore: "Tu puntuación final:",
            restart: "Reiniciar Quiz"
        },
        game: {
            title: "JUEGO DE ESQUIVAR HABILIDADES",
            subtitle: "¡Pon a Prueba tus Reflejos!",
            description: "Esquiva las habilidades entrantes y sobrevive el mayor tiempo posible.",
            play: "🎮 JUGAR AHORA",
            modal: {
                title: "Esquivar Habilidades",
                start: "Iniciar Juego",
                score: "Puntuación:",
                instructions: "Usa el ratón o las teclas WASD para moverte",
                gameOver: "¡Juego Terminado! Puntuación Final:",
                running: "Juego en Ejecución..."
            }
        },
        news: {
            title: "ÚLTIMAS ACTUALIZACIONES"
        }
    }
    te: {
        title: "రైట్ లెజెండ్స్",
        heroTitle: "రిఫ్ట్‌లోకి ప్రవేశించండి",
        heroSubtitle: "లెజెండ్స్‌ను మాస్టర్ చేయండి, యుద్ధభూమిని జయించండి",
        heroCta: "మీ ప్రయాణం ప్రారంభించండి",
        championsTitle: "మీ చాంపియన్‌ను ఎంచుకోండి",
        quizTitle: "చాంపియన్ జ్ఞాన పరీక్ష",
        gameTitle: "స్కిల్‌షాట్ డాడ్జ్ గేమ్",
        newsTitle: "తాజా అప్‌డేట్‌లు"
    },
    hi: {
        title: "रायट लेजेंड्स",
        heroTitle: "रिफ्ट में प्रवेश करें",
        heroSubtitle: "लेजेंड्स को मास्टर करें, युद्धक्षेत्र को जीतें",
        heroCta: "अपनी यात्रा शुरू करें",
        championsTitle: "अपना चैंपियन चुनें",
        quizTitle: "चैंपियन ज्ञान क्विज़",
        gameTitle: "स्किलशॉट डॉज गेम",
        newsTitle: "नवीनतम अपडेट"
    },
    ja: {
        title: "ライオットレジェンズ",
        heroTitle: "リフトに入る",
        heroSubtitle: "レジェンドをマスターし、戦場を征服する",
        heroCta: "旅を始める",
        championsTitle: "チャンピオンを選ぶ",
        quizTitle: "チャンピオン知識クイズ",
        gameTitle: "スキルショット回避ゲーム",
        newsTitle: "最新アップデート"
    },
    ko: {
        title: "라이엇 레전드",
        heroTitle: "리프트에 입장하세요",
        heroSubtitle: "레전드를 마스터하고 전장을 정복하세요",
        heroCta: "여정을 시작하세요",
        championsTitle: "챔피언을 선택하세요",
        quizTitle: "챔피언 지식 퀴즈",
        gameTitle: "스킬샷 피하기 게임",
        newsTitle: "최신 업데이트"
    },
    es: {
        title: "Riot Legends",
        heroTitle: "ENTRA EN LA GRIETA",
        heroSubtitle: "Domina las Leyendas, Conquista el Campo de Batalla",
        heroCta: "COMIENZA TU VIAJE",
        championsTitle: "ELIGE TU CAMPEÓN",
        quizTitle: "QUIZ DE CONOCIMIENTO DE CAMPEONES",
        gameTitle: "JUEGO DE ESQUIVAR HABILIDADES",
        newsTitle: "ÚLTIMAS ACTUALIZACIONES"
    }
};

// Champions Data
const champions = [
    {
        id: 1,
        name: "Yasuo",
        role: "assassin",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
        description: "An Ionian of deep resolve, Yasuo is an agile swordsman who wields the air itself against his enemies.",
        abilities: ["Steel Tempest", "Wind Wall", "Sweeping Blade", "Last Breath"],
        lore: "Yasuo is a man of resolve, an agile warrior who wields the power of the wind itself to cut down his enemies."
    },
    {
        id: 2,
        name: "Ahri",
        role: "mage",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
        description: "Innately connected to the latent power of Runeterra, Ahri is a vastaya who can reshape magic into orbs of raw energy.",
        abilities: ["Orb of Deception", "Fox-Fire", "Charm", "Spirit Rush"],
        lore: "Ahri is a vastaya who feeds off the life essence of others, but has begun to feel remorse for her actions."
    },
    {
        id: 3,
        name: "Garen",
        role: "tank",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg",
        description: "A proud and noble warrior, Garen fights as one of the Dauntless Vanguard.",
        abilities: ["Decisive Strike", "Courage", "Judgment", "Demacian Justice"],
        lore: "Garen is a warrior of Demacia who has devoted his life to defending his homeland and its ideals."
    },
    {
        id: 4,
        name: "Soraka",
        role: "support",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Soraka_0.jpg",
        description: "A healer gifted with the magic of the stars, Soraka holds the lives of her allies in her hands.",
        abilities: ["Starcall", "Astral Infusion", "Equinox", "Wish"],
        lore: "Soraka is a being of the celestial realm who gave up her immortality to help the mortals of Runeterra."
    },
    {
        id: 5,
        name: "Zed",
        role: "assassin",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg",
        description: "The master of shadows, Zed is the leader of the Order of Shadow.",
        abilities: ["Razor Shuriken", "Living Shadow", "Shadow Slash", "Death Mark"],
        lore: "Zed is the first ninja in over a century to unlock the ancient, forbidden ways."
    },
    {
        id: 6,
        name: "Lux",
        role: "mage",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
        description: "Luxanna Crownguard hails from Demacia, where magical abilities are viewed with fear.",
        abilities: ["Light Binding", "Prismatic Barrier", "Lucent Singularity", "Final Spark"],
        lore: "Born to the prestigious Crownguards, Lux was destined for a life of privilege."
    }
];

// Quiz Questions
const quizQuestions = [
    {
        question: "Which champion is known as 'The Unforgiven'?",
        options: ["Yasuo", "Zed", "Talon", "Katarina"],
        correct: 0
    },
    {
        question: "What is Ahri's ultimate ability called?",
        options: ["Charm", "Spirit Rush", "Fox-Fire", "Orb of Deception"],
        correct: 1
    },
    {
        question: "Which region is Garen from?",
        options: ["Noxus", "Ionia", "Demacia", "Piltover"],
        correct: 2
    },
    {
        question: "What type of champion is Soraka?",
        options: ["Tank", "Assassin", "Mage", "Support"],
        correct: 3
    },
    {
        question: "Which champion leads the Order of Shadow?",
        options: ["Shen", "Zed", "Akali", "Kennen"],
        correct: 1
    }
];

// News Data
const newsItems = [
    {
        title: "New Champion Revealed: Briar, The Restrained Hunger",
        date: "2024-01-15",
        excerpt: "Meet the latest addition to the Rift - a vampire champion with unique mechanics.",
        image: "https://picsum.photos/300/200?random=1"
    },
    {
        title: "Worlds 2024 Championship Finals",
        date: "2024-01-10",
        excerpt: "The most epic showdown in League of Legends esports history.",
        image: "https://picsum.photos/300/200?random=2"
    },
    {
        title: "Arena Game Mode Returns",
        date: "2024-01-08",
        excerpt: "The fan-favorite 2v2v2v2 game mode is back with new features.",
        image: "https://picsum.photos/300/200?random=3"
    },
    {
        title: "Patch 14.2 Balance Changes",
        date: "2024-01-05",
        excerpt: "Major updates to champion abilities and item adjustments.",
        image: "https://picsum.photos/300/200?random=4"
    }
];

// Initialize Website
document.addEventListener('DOMContentLoaded', function() {
    loadChampions();
    startHeroRotation();
    updateTranslations();
});

// Language Functions
function changeLanguage(lang) {
    currentLanguage = lang;
    updateTranslations();
}

function getTranslation(key) {
    const t = translations[currentLanguage];
    if (!t) return key;
    
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key;
        }
    }
    
    return value || key;
}

function updateTranslations() {
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
        if (element.tagName === 'INPUT' && element.type === 'text') {
            element.placeholder = translation;
        } else if (element.tagName === 'TITLE') {
            element.textContent = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update document title
    document.title = getTranslation('title');
    
    // Update quiz score if quiz is active
    updateQuizScore();
    
    // Update game score if game is active
    updateGameScore();
}

// Theme Functions
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    }
}

// Champion Functions
function loadChampions() {
    const grid = document.getElementById('championsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    champions.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'champion-card';
        card.dataset.role = champion.role;
        card.onclick = () => showChampionDetails(champion);
        
        card.innerHTML = `
            <img src="${champion.image}" alt="${champion.name}" class="champion-image" 
                 onerror="this.src='https://via.placeholder.com/300x200/c89b3c/ffffff?text=${champion.name}'">
            <div class="champion-info">
                <h3 class="champion-name">${champion.name}</h3>
                <p class="champion-role">${champion.role.toUpperCase()}</p>
                <p class="champion-description">${champion.description}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterChampions(role) {
    const cards = document.querySelectorAll('.champion-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (role === 'all' || card.dataset.role === role) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showChampionDetails(champion) {
    const modal = document.getElementById('championModal');
    const details = document.getElementById('championDetails');
    
    if (!modal || !details) return;
    
    details.innerHTML = `
        <h2>${champion.name}</h2>
        <img src="${champion.image}" alt="${champion.name}" style="width: 200px; height: 300px; object-fit: cover; border-radius: 10px; margin: 1rem 0;">
        <p><strong>${getTranslation('champions.role')}</strong> ${champion.role.toUpperCase()}</p>
        <p><strong>${getTranslation('champions.description')}</strong> ${champion.description}</p>
        <h3>${getTranslation('champions.abilities')}</h3>
        <ul>
            ${champion.abilities.map(ability => `<li>${ability}</li>`).join('')}
        </ul>
        <h3>${getTranslation('champions.lore')}</h3>
        <p>${champion.lore}</p>
    `;
    
    modal.style.display = 'block';
}

function closeChampionModal() {
    const modal = document.getElementById('championModal');
    if (modal) modal.style.display = 'none';
}

// Hero Rotation
function startHeroRotation() {
    const heroImage = document.getElementById('heroImage');
    if (!heroImage) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % champions.length;
        heroImage.src = champions[currentIndex].image;
    }, 5000);
}

// Quiz Functions
function startQuiz() {
    quizData = [...quizQuestions];
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('startQuiz').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showQuizResults();
        return;
    }
    
    const question = quizData[currentQuestionIndex];
    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    
    if (!questionEl || !optionsEl) return;
    
    questionEl.textContent = question.question;
    updateQuizScore();
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsEl.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const question = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
        option.disabled = true;
    });
    
    if (selectedIndex === question.correct) {
        score++;
    }
    
    const nextBtn = document.getElementById('nextQuestion');
    if (nextBtn) {
        nextBtn.style.display = 'inline-block';
        nextBtn.textContent = getTranslation('quiz.next');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('nextQuestion').style.display = 'none';
    showQuestion();
}

function showQuizResults() {
    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    
    if (!questionEl || !optionsEl) return;
    
    questionEl.textContent = getTranslation('quiz.complete');
    optionsEl.innerHTML = `<p>${getTranslation('quiz.finalScore')} ${score}/${quizData.length}</p>`;
    updateQuizScore();
    
    const startBtn = document.getElementById('startQuiz');
    if (startBtn) {
        startBtn.style.display = 'inline-block';
        startBtn.textContent = getTranslation('quiz.restart');
    }
}

function updateQuizScore() {
    const scoreEl = document.getElementById('quizScore');
    if (scoreEl) {
        const scoreSpan = scoreEl.querySelector('span');
        if (scoreSpan) {
            scoreSpan.textContent = getTranslation('quiz.score');
        }
    }
}

// Simple Working Game
let gameRunning = false;
let score = 0;
let gameInterval;

function openGame() {
    console.log('Opening game modal...');
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Modal opened');
    } else {
        console.log('Modal not found!');
    }
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
    }
    if (gameInterval) {
        clearInterval(gameInterval);
        gameRunning = false;
    }
}

function startSkillshotGame() {
    console.log('Starting game...');
    if (gameRunning) return;
    
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.log('Canvas not found!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startGame');
    
    gameRunning = true;
    score = 0;
    startBtn.textContent = 'Playing...';
    startBtn.disabled = true;
    
    let player = { x: 50, y: 200, size: 20 };
    let enemies = [];
    
    gameInterval = setInterval(() => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add enemy
        if (Math.random() < 0.03) {
            enemies.push({ x: canvas.width, y: Math.random() * (canvas.height - 20), size: 15 });
        }
        
        // Move enemies
        enemies.forEach((enemy, i) => {
            enemy.x -= 3;
            if (enemy.x < -enemy.size) {
                enemies.splice(i, 1);
                score += 10;
            }
            
            // Check collision
            if (enemy.x < player.x + player.size &&
                enemy.x + enemy.size > player.x &&
                enemy.y < player.y + player.size &&
                enemy.y + enemy.size > player.y) {
                // Game over
                clearInterval(gameInterval);
                gameRunning = false;
                startBtn.textContent = 'Start Game';
                startBtn.disabled = false;
                alert('Game Over! Score: ' + score);
                return;
            }
        });
        
        // Draw player (gold square)
        ctx.fillStyle = '#c89b3c';
        ctx.fillRect(player.x, player.y, player.size, player.size);
        
        // Draw enemies (red squares)
        ctx.fillStyle = '#dc3545';
        enemies.forEach(enemy => {
            ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        });
        
        // Update score
        const scoreEl = document.getElementById('gameScore');
        if (scoreEl) {
            scoreEl.textContent = 'Score: ' + score;
        }
        
    }, 20);
    
    // Mouse control
    canvas.onmousemove = (e) => {
        if (gameRunning) {
            const rect = canvas.getBoundingClientRect();
            player.x = e.clientX - rect.left - player.size/2;
            player.y = e.clientY - rect.top - player.size/2;
        }
    };
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modals when clicking outside
window.onclick = function(event) {
    const gameModal = document.getElementById('gameModal');
    const championModal = document.getElementById('championModal');
    
    if (event.target === gameModal) {
        closeGame();
    }
    if (event.target === championModal) {
        closeChampionModal();
    }
};

// WORKING GAME FUNCTIONS
function openGame() {
    console.log('Opening game...');
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'block';
        modal.style.zIndex = '1000';
        console.log('Game modal opened');
    } else {
        console.log('Game modal not found');
    }
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
    }
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
        gameRunning = false;
    }
}

function startSkillshotGame() {
    console.log('Starting skillshot game...');
    if (gameRunning) return;
    
    const canvas = document.getElementById('gameCanvas');
    const startBtn = document.getElementById('startGame');
    
    if (!canvas) {
        console.log('Canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    gameRunning = true;
    score = 0;
    
    if (startBtn) {
        startBtn.textContent = 'Playing...';
        startBtn.disabled = true;
    }
    
    let player = { x: 50, y: 200, size: 20 };
    let enemies = [];
    
    console.log('Game loop starting...');
    
    gameInterval = setInterval(() => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Spawn enemies
        if (Math.random() < 0.03) {
            enemies.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - 20),
                size: 15
            });
        }
        
        // Update enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            enemy.x -= 3;
            
            // Remove off-screen enemies
            if (enemy.x < -enemy.size) {
                enemies.splice(i, 1);
                score += 10;
                continue;
            }
            
            // Check collision
            if (enemy.x < player.x + player.size &&
                enemy.x + enemy.size > player.x &&
                enemy.y < player.y + player.size &&
                enemy.y + enemy.size > player.y) {
                
                // Game over
                clearInterval(gameInterval);
                gameInterval = null;
                gameRunning = false;
                
                if (startBtn) {
                    startBtn.textContent = 'Start Game';
                    startBtn.disabled = false;
                }
                
                alert('Game Over! Final Score: ' + score);
                return;
            }
        }
        
        // Draw player (gold square)
        ctx.fillStyle = '#c89b3c';
        ctx.fillRect(player.x, player.y, player.size, player.size);
        
        // Draw enemies (red squares)
        ctx.fillStyle = '#dc3545';
        enemies.forEach(enemy => {
            ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        });
        
        // Update score display
        const scoreEl = document.getElementById('gameScore');
        if (scoreEl) {
            scoreEl.textContent = 'Score: ' + score;
        }
        
    }, 20); // 50 FPS
    
    // Mouse control
    canvas.addEventListener('mousemove', (e) => {
        if (gameRunning) {
            const rect = canvas.getBoundingClientRect();
            player.x = Math.max(0, Math.min(canvas.width - player.size, e.clientX - rect.left - player.size/2));
            player.y = Math.max(0, Math.min(canvas.height - player.size, e.clientY - rect.top - player.size/2));
        }
    });
}

// WORKING MULTILINGUAL FUNCTIONS
function changeLanguage(lang) {
    console.log('Changing language to:', lang);
    currentLanguage = lang;
    
    const t = translations[lang];
    if (!t) {
        console.log('Translation not found for:', lang);
        return;
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks[0]) navLinks[0].textContent = t.navHome || 'Home';
    if (navLinks[1]) navLinks[1].textContent = t.navChampions || 'Champions';
    if (navLinks[2]) navLinks[2].textContent = t.navQuiz || 'Quiz';
    if (navLinks[3]) navLinks[3].textContent = t.navGame || 'Game';
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroTitle) heroTitle.textContent = t.heroTitle || 'RIOT LEGENDS';
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle || 'Enter the Arena';
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles[0]) sectionTitles[0].textContent = t.championsTitle || 'CHAMPIONS';
    if (sectionTitles[1]) sectionTitles[1].textContent = t.quizTitle || 'QUIZ';
    if (sectionTitles[2]) sectionTitles[2].textContent = t.gameTitle || 'GAME';
    
    // Update game section
    const gameSubtitle = document.querySelector('#game h3');
    const gameDescription = document.querySelector('#game p');
    const gamePlayBtn = document.querySelector('#game .play-btn');
    
    if (gameSubtitle) gameSubtitle.textContent = t.gameSubtitle || 'Test Your Reflexes!';
    if (gameDescription) gameDescription.textContent = t.gameDescription || 'Dodge incoming skillshots and survive as long as possible.';
    if (gamePlayBtn) gamePlayBtn.textContent = t.gamePlay || '🎮 PLAY NOW';
    
    // Update quiz section
    const quizSubtitle = document.querySelector('#quiz h3');
    const quizDescription = document.querySelector('#quiz p');
    const quizStartBtn = document.querySelector('#quiz .quiz-btn');
    
    if (quizSubtitle) quizSubtitle.textContent = t.quizSubtitle || 'Test Your Knowledge';
    if (quizDescription) quizDescription.textContent = t.quizDescription || 'Challenge yourself with questions about champions and lore.';
    if (quizStartBtn) quizStartBtn.textContent = t.quizStart || 'START QUIZ';
    
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons[0]) filterButtons[0].textContent = t.filterAll || 'All';
    if (filterButtons[1]) filterButtons[1].textContent = t.filterAssassin || 'Assassin';
    if (filterButtons[2]) filterButtons[2].textContent = t.filterMage || 'Mage';
    if (filterButtons[3]) filterButtons[3].textContent = t.filterTank || 'Tank';
    if (filterButtons[4]) filterButtons[4].textContent = t.filterSupport || 'Support';
    
    console.log('Language changed successfully');
}
