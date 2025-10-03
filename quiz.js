// Quiz data and functionality
const quizData = {
    en: [
        {
            question: "Which champion is known as 'The Unforgiven'?",
            options: ["Yasuo", "Zed", "Talon", "Katarina"],
            correct: 0,
            image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg"
        },
        {
            question: "What is Ahri's ultimate ability called?",
            options: ["Charm", "Spirit Rush", "Fox-Fire", "Orb of Deception"],
            correct: 1,
            image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg"
        },
        {
            question: "Which region is Garen from?",
            options: ["Noxus", "Ionia", "Demacia", "Piltover"],
            correct: 2,
            image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg"
        },
        {
            question: "What type of champion is Soraka?",
            options: ["Tank", "Assassin", "Mage", "Support"],
            correct: 3,
            image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Soraka_0.jpg"
        },
        {
            question: "Which champion leads the Order of Shadow?",
            options: ["Shen", "Zed", "Akali", "Kennen"],
            correct: 1,
            image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg"
        },
        {
            question: "What is Lux's title?",
            options: ["The Lady of Luminosity", "The Crown Guard", "The Light Bringer", "The Radiant Dawn"],
            correct: 0,
            image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg"
        },
        {
            question: "How many abilities does each champion have (including passive)?",
            options: ["3", "4", "5", "6"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/c89b3c/ffffff?text=Abilities"
        },
        {
            question: "Which lane is typically played by ADC champions?",
            options: ["Top", "Mid", "Bot", "Jungle"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Bot+Lane"
        },
        {
            question: "What does 'CS' stand for in League of Legends?",
            options: ["Champion Score", "Creep Score", "Combat Score", "Critical Strike"],
            correct: 1,
            image: "https://via.placeholder.com/200x150/96ceb4/ffffff?text=CS"
        },
        {
            question: "Which summoner spell provides a shield?",
            options: ["Flash", "Heal", "Barrier", "Cleanse"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/f38ba8/ffffff?text=Barrier"
        }
    ],
    te: [
        {
            question: "'ది అన్‌ఫర్గివెన్' అని పిలువబడే చాంపియన్ ఎవరు?",
            options: ["యాసుయో", "జెడ్", "టాలోన్", "కటారినా"],
            correct: 0,
            image: "https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Yasuo"
        },
        {
            question: "అహ్రి యొక్క అల్టిమేట్ అబిలిటీ పేరు ఏమిటి?",
            options: ["చార్మ్", "స్పిరిట్ రష్", "ఫాక్స్-ఫైర్", "ఆర్బ్ ఆఫ్ డిసెప్షన్"],
            correct: 1,
            image: "https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Ahri"
        },
        {
            question: "గారెన్ ఏ ప్రాంతానికి చెందినవాడు?",
            options: ["నాక్సస్", "అయోనియా", "డెమాసియా", "పిల్టోవర్"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/45b7d1/ffffff?text=Garen"
        }
    ],
    hi: [
        {
            question: "'द अनफॉर्गिवन' के नाम से कौन सा चैंपियन जाना जाता है?",
            options: ["यासुओ", "जेड", "टैलन", "कैटरीना"],
            correct: 0,
            image: "https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Yasuo"
        },
        {
            question: "अहरी की अल्टीमेट एबिलिटी का नाम क्या है?",
            options: ["चार्म", "स्पिरिट रश", "फॉक्स-फायर", "ऑर्ब ऑफ डिसेप्शन"],
            correct: 1,
            image: "https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Ahri"
        },
        {
            question: "गारेन किस क्षेत्र से है?",
            options: ["नॉक्सस", "आयोनिया", "डेमेसिया", "पिल्टओवर"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/45b7d1/ffffff?text=Garen"
        }
    ],
    ja: [
        {
            question: "'許されざる者'として知られるチャンピオンは誰ですか？",
            options: ["ヤスオ", "ゼド", "タロン", "カタリナ"],
            correct: 0,
            image: "https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Yasuo"
        },
        {
            question: "アーリのウルティメットアビリティの名前は何ですか？",
            options: ["チャーム", "スピリットラッシュ", "フォックスファイア", "オーブオブディセプション"],
            correct: 1,
            image: "https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Ahri"
        },
        {
            question: "ガレンはどの地域出身ですか？",
            options: ["ノクサス", "アイオニア", "デマーシア", "ピルトーヴァー"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/45b7d1/ffffff?text=Garen"
        }
    ],
    ko: [
        {
            question: "'용서받지 못한 자'로 알려진 챔피언은 누구입니까?",
            options: ["야스오", "제드", "탈론", "카타리나"],
            correct: 0,
            image: "https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Yasuo"
        },
        {
            question: "아리의 궁극기 이름은 무엇입니까?",
            options: ["매혹", "혼령 질주", "여우불", "현혹의 구슬"],
            correct: 1,
            image: "https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Ahri"
        },
        {
            question: "가렌은 어느 지역 출신입니까?",
            options: ["녹서스", "아이오니아", "데마시아", "필트오버"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/45b7d1/ffffff?text=Garen"
        }
    ],
    es: [
        {
            question: "¿Qué campeón es conocido como 'El Imperdonable'?",
            options: ["Yasuo", "Zed", "Talon", "Katarina"],
            correct: 0,
            image: "https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Yasuo"
        },
        {
            question: "¿Cómo se llama la habilidad definitiva de Ahri?",
            options: ["Encanto", "Impulso Espiritual", "Fuego de Zorro", "Orbe del Engaño"],
            correct: 1,
            image: "https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Ahri"
        },
        {
            question: "¿De qué región es Garen?",
            options: ["Noxus", "Ionia", "Demacia", "Piltover"],
            correct: 2,
            image: "https://via.placeholder.com/200x150/45b7d1/ffffff?text=Garen"
        }
    ]
};

class QuizManager {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.userAnswers = [];
        this.isQuizActive = false;
        this.init();
    }

    init() {
        this.loadQuestions();
        this.setupQuizEvents();
        this.startQuiz();
    }

    loadQuestions() {
        // Get questions based on current language
        const currentLang = window.currentLanguage || 'en';
        this.questions = quizData[currentLang] || quizData.en;
        
        // Shuffle questions for variety
        this.questions = this.shuffleArray([...this.questions]);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    setupQuizEvents() {
        const restartBtn = document.getElementById('restartQuiz');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restartQuiz();
            });
        }
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isQuizActive = true;
        
        this.showQuestion();
        this.updateProgress();
    }

    showQuestion() {
        const questionContainer = document.getElementById('quizQuestion');
        const optionsContainer = document.getElementById('quizOptions');
        const resultContainer = document.getElementById('quizResult');
        
        if (!questionContainer || !optionsContainer) return;

        // Hide result container
        if (resultContainer) {
            resultContainer.style.display = 'none';
        }

        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        // Update question with animation
        gsap.to(questionContainer, {
            duration: 0.3,
            opacity: 0,
            y: -20,
            onComplete: () => {
                questionContainer.innerHTML = `
                    <div class="question-content">
                        ${currentQuestion.image ? `<img src="${currentQuestion.image}" alt="Question Image" class="question-image" onerror="this.src='https://via.placeholder.com/200x150/c89b3c/ffffff?text=Question'">` : ''}
                        <h3>${currentQuestion.question}</h3>
                    </div>
                `;
                
                gsap.to(questionContainer, {
                    duration: 0.3,
                    opacity: 1,
                    y: 0
                });
            }
        });

        // Update options with animation
        gsap.to(optionsContainer, {
            duration: 0.3,
            opacity: 0,
            scale: 0.9,
            onComplete: () => {
                optionsContainer.innerHTML = '';
                
                currentQuestion.options.forEach((option, index) => {
                    const optionElement = document.createElement('button');
                    optionElement.className = 'quiz-option';
                    optionElement.textContent = option;
                    optionElement.dataset.index = index;
                    
                    optionElement.addEventListener('click', () => {
                        this.selectAnswer(index);
                    });
                    
                    // Add hover sound effect
                    optionElement.addEventListener('mouseenter', () => {
                        this.playSound('hover');
                    });
                    
                    optionsContainer.appendChild(optionElement);
                });
                
                gsap.to(optionsContainer, {
                    duration: 0.3,
                    opacity: 1,
                    scale: 1
                });
                
                // Animate options in
                gsap.from('.quiz-option', {
                    duration: 0.4,
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                });
            }
        });
    }

    selectAnswer(selectedIndex) {
        if (!this.isQuizActive) return;

        const currentQuestion = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Store user answer
        this.userAnswers.push(selectedIndex);

        // Show correct/incorrect feedback
        options.forEach((option, index) => {
            if (index === currentQuestion.correct) {
                option.classList.add('correct');
                gsap.to(option, {
                    duration: 0.3,
                    scale: 1.05,
                    backgroundColor: '#0596aa'
                });
            } else if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
                option.classList.add('incorrect');
                gsap.to(option, {
                    duration: 0.3,
                    scale: 0.95,
                    backgroundColor: '#c8aa6e'
                });
            }
        });

        // Update score
        if (selectedIndex === currentQuestion.correct) {
            this.score++;
            this.playSound('click'); // Success sound
        }

        // Move to next question after delay
        setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
            this.updateProgress();
        } else {
            this.showResults();
        }
    }

    updateProgress() {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        if (progressBar) {
            const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            progressBar.style.setProperty('--progress', `${progress}%`);
        }
        
        if (progressText) {
            progressText.textContent = `${this.currentQuestionIndex + 1}/${this.questions.length}`;
        }
    }

    showResults() {
        this.isQuizActive = false;
        
        const quizCard = document.querySelector('.quiz-card');
        const resultContainer = document.getElementById('quizResult');
        const finalScore = document.getElementById('finalScore');
        
        if (!resultContainer || !finalScore) return;

        // Hide quiz card
        gsap.to(quizCard, {
            duration: 0.5,
            opacity: 0,
            scale: 0.9,
            onComplete: () => {
                quizCard.style.display = 'none';
                
                // Calculate percentage
                const percentage = Math.round((this.score / this.questions.length) * 100);
                
                // Determine performance message
                let message = '';
                let messageClass = '';
                
                if (percentage >= 90) {
                    message = 'Legendary! 🏆';
                    messageClass = 'legendary';
                } else if (percentage >= 70) {
                    message = 'Great Job! ⭐';
                    messageClass = 'great';
                } else if (percentage >= 50) {
                    message = 'Good Effort! 👍';
                    messageClass = 'good';
                } else {
                    message = 'Keep Learning! 📚';
                    messageClass = 'learning';
                }
                
                finalScore.innerHTML = `
                    <div class="score-display ${messageClass}">
                        <div class="score-circle">
                            <span class="score-number">${this.score}</span>
                            <span class="score-total">/${this.questions.length}</span>
                        </div>
                        <div class="score-percentage">${percentage}%</div>
                        <div class="score-message">${message}</div>
                    </div>
                `;
                
                // Show result container
                resultContainer.style.display = 'block';
                
                gsap.from(resultContainer, {
                    duration: 0.6,
                    scale: 0.8,
                    opacity: 0,
                    ease: "back.out(1.7)"
                });
                
                // Animate score circle
                gsap.from('.score-circle', {
                    duration: 1,
                    rotation: 360,
                    scale: 0,
                    ease: "elastic.out(1, 0.5)",
                    delay: 0.3
                });
            }
        });
    }

    restartQuiz() {
        // Reload questions in case language changed
        this.loadQuestions();
        
        const quizCard = document.querySelector('.quiz-card');
        const resultContainer = document.getElementById('quizResult');
        
        // Hide results and show quiz card
        if (resultContainer) {
            resultContainer.style.display = 'none';
        }
        
        if (quizCard) {
            quizCard.style.display = 'block';
            gsap.to(quizCard, {
                duration: 0.5,
                opacity: 1,
                scale: 1
            });
        }
        
        // Restart quiz
        this.startQuiz();
        this.playSound('click');
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

    // Method to update quiz when language changes
    updateLanguage() {
        if (this.isQuizActive) {
            this.loadQuestions();
            // Restart current quiz with new language
            this.restartQuiz();
        } else {
            this.loadQuestions();
        }
    }
}

// Initialize quiz manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.quizManager = new QuizManager();
        console.log('✅ Quiz system initialized');
    } catch (error) {
        console.error('❌ Quiz system error:', error);
    }
});

// Listen for language changes
document.addEventListener('languageChanged', () => {
    try {
        if (window.quizManager && typeof window.quizManager.updateLanguage === 'function') {
            window.quizManager.updateLanguage();
        }
    } catch (error) {
        console.error('❌ Quiz language update error:', error);
    }
});
