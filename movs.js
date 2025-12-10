// ============================================
// SISTEMA INTERACTIVO ROMÁNTICO
// ============================================

// Lista de mensajes especiales que aparecerán
const mensajesEspeciales = [
    "Te amo más de lo que las palabras pueden expresar 💕",
    "Eres mi razón de ser, mi todo ❤️",
    "Cada día contigo es un regalo 🌟",
    "Tu sonrisa ilumina mi mundo ☀️",
    "No puedo imaginar mi vida sin ti 💖",
    "Eres perfecta tal como eres ✨",
    "Mi corazón late solo por ti 💓",
    "Eres mi hogar, mi refugio 🏠",
    "Cada momento contigo es especial 🌈",
    "Te amo infinitamente y más allá 🌌"
];

// ============================================
// INSTRUCCIONES PARA AGREGAR VIDEOS:
// ============================================
// 1. Coloca tus videos en la carpeta "videos"
// 2. Agrega las rutas aquí abajo, por ejemplo:
//    "videos/nuestro-video-1.mp4",
//    "videos/nuestro-video-2.mp4",
//    etc.
// ============================================

// Lista de videos (actualizada automáticamente con tus videos)
const videos = [
    "videos/1v.mp4",
    "videos/2v.mp4",
    "videos/3v.mp4",
    "videos/4v.mp4",
    "videos/5v.mp4",
    "videos/6v.mp4"
];

// Variables globales
let currentVideoIndex = 0;
let isPlaying = false;
let heartInterval = null;
let clickCount = 0;
let cursorTrail = [];
let magneticElements = [];

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeVideoPlayer();
    initializeInteractiveElements();
    startFloatingHearts();
    detectVideoFiles();
    initializePlayfulEffects();
    initializeCursorEffects();
    initializeMagneticButtons();
    addShakeEffects();
    addBounceEffects();
    initializeSpecialEffects();
    startHeartRain();
    initializeFireworks();
});

// ============================================
// ANIMACIONES DE SCROLL
// ============================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.photo-item, .letter, .gallery-section, .video-section').forEach(el => {
        observer.observe(el);
    });
    
    // Efecto de zoom en las fotos
    document.querySelectorAll('.photo-item img').forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
            createHeartBurst(event.clientX, event.clientY);
        });
    });
}

// ============================================
// REPRODUCTOR DE VIDEO MIX
// ============================================
function initializeVideoPlayer() {
    const videoPlayer = document.getElementById('mainVideoPlayer');
    const playAllBtn = document.getElementById('playAllBtn');
    const pauseAllBtn = document.getElementById('pauseAllBtn');
    const nextVideoBtn = document.getElementById('nextVideoBtn');
    const prevVideoBtn = document.getElementById('prevVideoBtn');
    
    if (videos.length === 0) {
        document.getElementById('currentVideoInfo').textContent = 
            'Coloca tus videos en la carpeta "videos" y actualiza el array en movs.js';
        return;
    }
    
    // Cargar primer video (silenciado)
    loadVideo(0);
    
    // Asegurar que los videos siempre estén silenciados
    videoPlayer.muted = true;
    
    // Event listeners
    playAllBtn.addEventListener('click', () => {
        if (videos.length > 0) {
            videoPlayer.muted = true; // Mantener silenciado
            videoPlayer.play();
            isPlaying = true;
            updateVideoInfo();
        }
    });
    
    pauseAllBtn.addEventListener('click', () => {
        videoPlayer.pause();
        isPlaying = false;
    });
    
    nextVideoBtn.addEventListener('click', () => {
        nextVideo();
    });
    
    prevVideoBtn.addEventListener('click', () => {
        prevVideo();
    });
    
    // Cuando un video termina, reproducir el siguiente
    videoPlayer.addEventListener('ended', () => {
        if (currentVideoIndex < videos.length - 1) {
            nextVideo();
        } else {
            // Si es el último video, volver al primero
            loadVideo(0);
            videoPlayer.muted = true; // Mantener silenciado
            videoPlayer.play();
        }
    });
    
    // Asegurar que siempre esté silenciado cuando se carga un nuevo video
    videoPlayer.addEventListener('loadstart', () => {
        videoPlayer.muted = true;
    });
    
    // Actualizar barra de progreso
    videoPlayer.addEventListener('timeupdate', () => {
        updateProgressBar();
    });
}

function loadVideo(index) {
    if (index < 0 || index >= videos.length) return;
    
    currentVideoIndex = index;
    const videoPlayer = document.getElementById('mainVideoPlayer');
    videoPlayer.src = videos[index];
    videoPlayer.muted = true; // Asegurar que los videos estén silenciados
    videoPlayer.load();
    updateVideoInfo();
    updateThumbnails();
}

function nextVideo() {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo(nextIndex);
    const videoPlayer = document.getElementById('mainVideoPlayer');
    videoPlayer.muted = true; // Mantener silenciado
    if (isPlaying) {
        videoPlayer.play();
    }
}

function prevVideo() {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    loadVideo(prevIndex);
    const videoPlayer = document.getElementById('mainVideoPlayer');
    videoPlayer.muted = true; // Mantener silenciado
    if (isPlaying) {
        videoPlayer.play();
    }
}

function updateVideoInfo() {
    const info = document.getElementById('currentVideoInfo');
    info.textContent = `Video ${currentVideoIndex + 1} de ${videos.length}`;
}

function updateProgressBar() {
    const videoPlayer = document.getElementById('mainVideoPlayer');
    const progressFill = document.querySelector('.video-progress-fill');
    if (videoPlayer.duration) {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressFill.style.width = progress + '%';
    }
}

function updateThumbnails() {
    const container = document.getElementById('videoThumbnails');
    container.innerHTML = '';
    
    videos.forEach((video, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'video-thumbnail';
        if (index === currentVideoIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.innerHTML = `
            <div class="thumbnail-number">${index + 1}</div>
            <div class="thumbnail-play">▶️</div>
        `;
        thumbnail.addEventListener('click', () => {
            loadVideo(index);
            const videoPlayer = document.getElementById('mainVideoPlayer');
            videoPlayer.muted = true; // Mantener silenciado
            videoPlayer.play();
            isPlaying = true;
        });
        container.appendChild(thumbnail);
    });
}

// Verificar que los videos se puedan cargar
function detectVideoFiles() {
    if (videos.length > 0) {
        console.log(`✅ ${videos.length} videos detectados y listos para reproducir`);
        // Verificar el primer video para asegurar que existe
        const testVideo = document.createElement('video');
        testVideo.src = videos[0];
        testVideo.addEventListener('loadedmetadata', () => {
            console.log('✅ Videos cargados correctamente');
        });
        testVideo.addEventListener('error', () => {
            console.warn('⚠️ Algunos videos pueden no estar disponibles. Verifica las rutas.');
        });
    } else {
        console.log('ℹ️ No hay videos configurados aún');
    }
}

// ============================================
// ELEMENTOS INTERACTIVOS
// ============================================
function initializeInteractiveElements() {
    const loveButton = document.getElementById('loveButton');
    
    loveButton.addEventListener('click', () => {
        showSpecialMessage();
        createHeartBurst(loveButton.offsetLeft + loveButton.offsetWidth / 2, 
                        loveButton.offsetTop + loveButton.offsetHeight / 2);
    });
    
    // Efecto al hacer clic en cualquier parte de la carta
    document.querySelector('.letter-content').addEventListener('click', (e) => {
        if (Math.random() > 0.7) { // 30% de probabilidad
            createHeartBurst(e.clientX, e.clientY);
        }
    });
}

// ============================================
// CORAZONES FLOTANTES
// ============================================
function startFloatingHearts() {
    // Crear corazones flotantes cada cierto tiempo
    setInterval(() => {
        if (Math.random() > 0.5) {
            createFloatingHeart();
        }
    }, 3000);
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💕', '❤️', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function createHeartBurst(x, y) {
    const hearts = ['💕', '❤️', '💖', '💗', '💓', '💝'];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'burst-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
            heart.style.setProperty('--random-y', (Math.random() - 0.5) * 200 + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }, i * 50);
    }
}

// ============================================
// MENSAJES ESPECIALES
// ============================================
function showSpecialMessage() {
    const message = mensajesEspeciales[Math.floor(Math.random() * mensajesEspeciales.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'special-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 3000);
}

// ============================================
// EFECTOS ADICIONALES
// ============================================
// Efecto de escritura en el título (opcional)
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Efecto de confeti al cargar la página
window.addEventListener('load', () => {
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }, 1000);
});

// Efecto de parallax suave al hacer scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.letter-header');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// EFECTOS JUGUETONES Y DIVERTIDOS
// ============================================

// Efectos de cursor personalizado con partículas
function initializeCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '💕';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Crear partículas que siguen el cursor
        if (Math.random() > 0.7) {
            createCursorParticle(e.clientX, e.clientY);
        }
    });
    
    // Animación suave del cursor
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Efecto al hacer clic
    document.addEventListener('click', (e) => {
        createClickRipple(e.clientX, e.clientY);
        cursor.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cursor.style.transform = 'scale(1)';
        }, 100);
    });
}

// Partículas que siguen el cursor
function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    const emojis = ['✨', '💫', '⭐', '🌟', '💖'];
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
        setTimeout(() => particle.remove(), 500);
    }, 100);
}

// Ondas al hacer clic
function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.transform = 'scale(10)';
        ripple.style.opacity = '0';
        setTimeout(() => ripple.remove(), 600);
    }, 10);
}

// Botones magnéticos que se mueven hacia el cursor
function initializeMagneticButtons() {
    const buttons = document.querySelectorAll('.control-btn, .love-button, .video-thumbnail');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}


// Efectos de temblor (shake)
function addShakeEffects() {
    const photos = document.querySelectorAll('.photo-item');
    
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', () => {
            if (Math.random() > 0.7) {
                photo.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    photo.style.animation = '';
                }, 500);
            }
        });
    });
    
    // Agregar animación shake al CSS dinámicamente
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px) rotate(-5deg); }
                75% { transform: translateX(10px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Efectos de rebote
function addBounceEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.animation = 'bounce 0.6s';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    if (!document.getElementById('bounce-style')) {
        const style = document.createElement('style');
        style.id = 'bounce-style';
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Efectos juguetones generales
function initializePlayfulEffects() {
    // Contador de clics secreto
    let secretClickCount = 0;
    const secretButton = document.querySelector('.letter-header h1');
    
    secretButton.addEventListener('click', () => {
        secretClickCount++;
        if (secretClickCount === 5) {
            createSecretMessage();
            secretClickCount = 0;
        }
    });
    
    // Efecto de "glow" en elementos al pasar el mouse
    const glowElements = document.querySelectorAll('.photo-item, .letter, .gallery-section');
    glowElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 107, 157, 0.6), 0 0 60px rgba(214, 51, 132, 0.4)';
            this.style.transition = 'box-shadow 0.3s ease';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Efecto de texto que "salta" al hacer hover
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            const letters = this.textContent.split('');
            this.textContent = '';
            letters.forEach((letter, i) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.display = 'inline-block';
                span.style.transition = 'transform 0.3s ease';
                span.style.transform = 'translateY(0)';
                this.appendChild(span);
                
                setTimeout(() => {
                    span.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        span.style.transform = 'translateY(0)';
                    }, 300);
                }, i * 50);
            });
        });
    });
    
    // Efecto de "pulse" en el botón de amor
    const loveButton = document.getElementById('loveButton');
    if (loveButton) {
        setInterval(() => {
            loveButton.style.transform = 'scale(1.1)';
            setTimeout(() => {
                loveButton.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Efecto de confeti al hacer doble clic
    document.addEventListener('dblclick', (e) => {
        createConfettiBurst(e.clientX, e.clientY);
    });
}

// Mensaje secreto
function createSecretMessage() {
    const messages = [
        "¡Encontraste el mensaje secreto! 💕",
        "Eres increíble, mi amor ✨",
        "Te amo más de lo que imaginas ❤️",
        "Eres mi persona favorita en el mundo 🌟",
        "Cada día contigo es especial 💖"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    showSpecialMessage();
    
    // Crear explosión de corazones
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 50);
    }
}

// Confeti al hacer doble clic
function createConfettiBurst(x, y) {
    const colors = ['💕', '❤️', '💖', '💗', '💓', '💝', '✨', '🌟', '⭐', '💫'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.fontSize = (Math.random() * 15 + 15) + 'px';
            confetti.style.position = 'fixed';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 100 + Math.random() * 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(confetti);
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            const animate = () => {
                posX += vx * 0.1;
                posY += vy * 0.1 + 2; // gravedad
                opacity -= 0.02;
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.opacity = opacity;
                confetti.style.transform = `rotate(${posX * 0.1}deg)`;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            animate();
        }, i * 30);
    }
}

// Efecto de "typing" en el título
window.addEventListener('load', () => {
    const title = document.querySelector('.letter-header h1');
    if (title) {
        const originalText = title.textContent;
        typeWriterEffect(title, originalText, 100);
    }
    
    // Agregar clase loaded después de la animación inicial
    setTimeout(() => {
        const letter = document.querySelector('.letter');
        if (letter) {
            letter.classList.add('loaded');
        }
    }, 1000);
});

// Efecto de "sparkle" en las fotos
function addSparkleEffect() {
    const photos = document.querySelectorAll('.photo-item');
    
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            const sparkles = ['✨', '⭐', '🌟', '💫'];
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                    sparkle.style.position = 'absolute';
                    sparkle.style.left = Math.random() * 100 + '%';
                    sparkle.style.top = Math.random() * 100 + '%';
                    sparkle.style.fontSize = '20px';
                    sparkle.style.pointerEvents = 'none';
                    sparkle.style.zIndex = '10';
                    sparkle.style.animation = 'sparkle 1s ease-out forwards';
                    this.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 1000);
                }, i * 100);
            }
        });
    });
    
    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkle {
                0% { opacity: 0; transform: scale(0) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
                100% { opacity: 0; transform: scale(0) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar efecto sparkle
setTimeout(() => {
    addSparkleEffect();
}, 1000);

// ============================================
// EFECTOS ESPECIALES NUEVOS
// ============================================

// Lluvia de corazones desde arriba
function startHeartRain() {
    setInterval(() => {
        if (Math.random() > 0.6) {
            createFallingHeart();
        }
    }, 2000);
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    const hearts = ['🦖','🦕','🐮','🦄','🌸'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
    heart.style.position = 'fixed';
    heart.style.top = '-50px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9998';
    heart.style.animation = `fallDown ${3 + Math.random() * 2}s linear forwards`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Agregar animación de caída
if (!document.getElementById('falling-heart-style')) {
    const style = document.createElement('style');
    style.id = 'falling-heart-style';
    style.textContent = `
        @keyframes fallDown {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}


// Fuegos artificiales en momentos especiales
function initializeFireworks() {
    // Fuegos artificiales al llegar al final de la carta
    const letter = document.querySelector('.letter');
    if (letter) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
                    createFireworks();
                }
            });
        }, { threshold: 0.8 });
        
        observer.observe(letter);
    }
    
    // Fuegos artificiales al hacer clic en el botón de amor 3 veces
    let loveButtonClicks = 0;
    const loveButton = document.getElementById('loveButton');
    if (loveButton) {
        loveButton.addEventListener('click', () => {
            loveButtonClicks++;
            if (loveButtonClicks === 3) {
                createFireworks();
                loveButtonClicks = 0;
            }
        });
    }
}

function createFireworks() {
    const colors = ['#ff6b9d', '#d63384', '#ffd700', '#ff69b4', '#ff1493', '#ffb6c1'];
    const emojis = ['🦖','🦕','🐮','🦄','🌸'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                particle.style.position = 'fixed';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.fontSize = '25px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                
                const angle = (Math.PI * 2 * j) / 12;
                const velocity = 150 + Math.random() * 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                document.body.appendChild(particle);
                
                let posX = x;
                let posY = y;
                let opacity = 1;
                let scale = 1;
                
                const animate = () => {
                    posX += vx * 0.1;
                    posY += vy * 0.1 + 1;
                    opacity -= 0.015;
                    scale -= 0.01;
                    
                    particle.style.left = posX + 'px';
                    particle.style.top = posY + 'px';
                    particle.style.opacity = opacity;
                    particle.style.transform = `scale(${scale}) rotate(${posX * 0.1}deg)`;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                
                animate();
            }
        }, i * 200);
    }
}

// Efectos especiales adicionales
function initializeSpecialEffects() {
    // Efecto de "cámara flash" al hacer clic en fotos
    document.querySelectorAll('.photo-item').forEach(photo => {
        photo.addEventListener('click', function() {
            createCameraFlash();
        });
    });
    
    // Efecto de "estrella fugaz" ocasional
    setInterval(() => {
        if (Math.random() > 0.8) {
            createShootingStar();
        }
    }, 10000);
    
    // Efecto de "globo de texto" al pasar mouse sobre el título
    const title = document.querySelector('.letter-header h1');
    if (title) {
        title.addEventListener('mouseenter', function() {
            createSpeechBubble(this, "¡Te amo! 💕");
        });
    }
    
    // Efecto de "partículas de amor" que se acumulan
    let particleCount = 0;
    setInterval(() => {
        if (particleCount < 5) {
            createLoveParticle();
            particleCount++;
        }
    }, 5000);
}

function createCameraFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: white;
        opacity: 0.9;
        z-index: 99999;
        pointer-events: none;
    `;
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0';
        flash.style.transition = 'opacity 0.3s ease';
        setTimeout(() => flash.remove(), 300);
    }, 50);
}

function createShootingStar() {
    const star = document.createElement('div');
    star.textContent = '✨';
    star.style.cssText = `
        position: fixed;
        font-size: 30px;
        z-index: 9998;
        pointer-events: none;
        top: -50px;
        left: ${Math.random() * window.innerWidth}px;
    `;
    document.body.appendChild(star);
    
    const endX = Math.random() * window.innerWidth;
    const endY = window.innerHeight + 100;
    const distance = Math.sqrt(Math.pow(endX - parseFloat(star.style.left), 2) + Math.pow(endY - (-50), 2));
    const duration = distance / 5;
    
    star.style.transition = `all ${duration}ms linear`;
    setTimeout(() => {
        star.style.left = endX + 'px';
        star.style.top = endY + 'px';
        star.style.opacity = '0';
    }, 10);
    
    setTimeout(() => star.remove(), duration + 100);
}

function createSpeechBubble(element, text) {
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = text;
    bubble.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, #ff6b9d, #d63384);
        color: white;
        padding: 15px 20px;
        border-radius: 20px;
        font-weight: bold;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        white-space: nowrap;
        animation: bubblePop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    const rect = element.getBoundingClientRect();
    bubble.style.top = (rect.top - 60) + 'px';
    bubble.style.left = (rect.left + rect.width / 2) + 'px';
    bubble.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateX(-50%) translateY(-20px)';
        bubble.style.transition = 'all 0.3s ease';
        setTimeout(() => bubble.remove(), 300);
    }, 2000);
}

function createLoveParticle() {
    const particle = document.createElement('div');
    const emojis = ['💕', '❤️', '💖'];
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.cssText = `
        position: fixed;
        font-size: 20px;
        z-index: 9997;
        pointer-events: none;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 20}px;
        opacity: 0.7;
    `;
    document.body.appendChild(particle);
    
    const targetY = Math.random() * window.innerHeight;
    const duration = 3000 + Math.random() * 2000;
    
    particle.style.transition = `all ${duration}ms ease-out`;
    setTimeout(() => {
        particle.style.top = targetY + 'px';
        particle.style.opacity = '0';
        particle.style.transform = `rotate(360deg) scale(0.5)`;
    }, 10);
    
    setTimeout(() => particle.remove(), duration + 100);
}

// Agregar estilos para los nuevos efectos
if (!document.getElementById('special-effects-style')) {
    const style = document.createElement('style');
    style.id = 'special-effects-style';
    style.textContent = `
        @keyframes bubblePop {
            0% {
                transform: translateX(-50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translateX(-50%) scale(1.2);
            }
            100% {
                transform: translateX(-50%) scale(1);
                opacity: 1;
            }
        }
        
        .speech-bubble::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #d63384;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// CONFIGURACIÓN DE LISTA DE REPRODUCCIÓN (PLAYLIST)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playMusicBtn');
    const prevBtn = document.getElementById('prevTrackBtn');
    const nextBtn = document.getElementById('nextTrackBtn');
    const songTitle = document.getElementById('songTitle');

    // --- AQUÍ PONES TUS CANCIONES ---
    // Asegúrate de que los nombres sean exactos
    const playlist = [
        { file: 'musica/cancion1.mp4', name: '❤️' },
        { file: 'musica/cancion2.mp4', name: '🦕' },
        { file: 'musica/cancion3.mp4', name: '✨' },
        { file: 'musica/cancion4.mp4', name: 'Te amo' }
    ];

    let currentTrack = 0;
    let isPlaying = false;

    // Cargar la primera canción
    loadTrack(currentTrack);

    function loadTrack(index) {
        bgMusic.src = playlist[index].file;
        songTitle.textContent = playlist[index].name;
        bgMusic.volume = 0.5;
    }

    function playPauseMusic() {
        if (isPlaying) {
            bgMusic.pause();
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '🎵';
        } else {
            bgMusic.play().then(() => {
                playBtn.classList.add('playing');
                playBtn.innerHTML = '💿';
            }).catch(e => console.log("Interacción necesaria"));
        }
        isPlaying = !isPlaying;
    }

    // Botón Play/Pausa
    playBtn.addEventListener('click', playPauseMusic);

    // Botón Siguiente
    nextBtn.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) bgMusic.play();
    });

    // Botón Anterior
    prevBtn.addEventListener('click', () => {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) bgMusic.play();
    });

    // Cuando termina una canción, pasa a la siguiente automáticamente
    bgMusic.addEventListener('ended', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        bgMusic.play();
    });
});