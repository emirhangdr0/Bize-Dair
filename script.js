// Data Configuration
const CONFIG = {
    // FORMAT: YYYY-MM-DDTHH:MM:SS
    anniversaryDate: "2025-12-25T00:00:00", // User should edit this
    relationshipStartDate: "2024-10-31T09:45:00", // Relationship start
    // secretPassword removed
    reasons: [
        "Gülüşünle dünyamı aydınlatman.",
        "Her zaman beni desteklemen.",
        "Bana en iyi arkadaşım gibi davranman.",
        "Yaptığın küçük sürprizler.",
        "Birlikte saçmalayabilmemiz.",
        "Zor zamanlarda yanımda olman.",
        "Bana güven vermen.",
        "Sesini duyduğumda huzur bulmam.",
        "Birlikte yemek yapmamız.",
        "Hayallerimize inanman.",
        "Beni her halimle sevmen.",
        "Güzelliğine hayran olmam.",
        "Birlikte sessizce durabilmemiz.",
        "Olaylara pozitif bakış açın.",
        "Benimle film izleme maratonların.",
        "Bana kattığın değerler.",
        "Sabırlı oluşun.",
        "Beni her gün yeniden aşık etmen.",
        "Gözlerinin içine bakınca kaybolmam.",
        "Birlikte kahve içme ritüelimiz.",
        "Bana “Günaydın” deyişin.",
        "Beni motive etme şeklin.",
        "Seninle yaşlanma hayali kurmam.",
        "Bana özel hissettirmen.",
        "Merhametli kalbin.",
        "Başarılarımla gurur duyman.",
        "Birlikte evlenme hayali kurmamız.",
        "Birlikte yolculuk yapmamız.",
        "Şarkılarınn.",
        "Bana sarıldığında güvende hissetmem.",
        "Hayatıma anlam katman.",
        "Cesaretin.",
        "Dürüstlüğün.",
        "Bana bişeyler anlatman.",
        "Birlikte gülme krizlerimiz.",
        "Her şeyi seninle paylaşma isteğim.",
        "Bana öğrettiklerin.",
        "Birlikte yaptıklarımız.",
        "Bana bakışın.",
        "Seninle her şeyin mümkün gelmesi.",
        "Ruh eşi olduğumuza inanmam.",
        "Birlikte dans etmemiz.",
        "Beni anlayan tek kişi olman.",
        "Nazik oluşun.",
        "Saygılı duruşun.",
        "Birlikte büyümemiz.",
        "Anlayışın.",
        "Bana ilham vermen.",
        "Sevginin saf ve gerçek olması.",
        "Sadece SEN olduğun için."
    ],
    introPhotos: [
        "images/1.webp", "images/11.webp", "images/12.webp", "images/123.webp",
        "images/13.webp", "images/14.webp", "images/15.webp", "images/16.webp",
        "images/17.webp", "images/2.webp", "images/3.webp", "images/4.webp",
        "images/5.webp", "images/6.webp", "images/7.webp", "images/9.webp"
    ]
};

// DOM Elements
const introSection = document.getElementById('intro');
const navbar = document.getElementById('navbar');
const mainContent = document.getElementById('main-content');
const startBtn = document.getElementById('start-btn');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
// newReasonBtn already declared above or in previous block if not careful. 
// Checking line 68/69 in previous artifact, I see I might have pasted it twice.
// Let's just declare them cleanly.
const newReasonBtn = document.getElementById('new-reason-btn');
const reasonDisplay = document.querySelector('#reason-display p');
const homeBtn = document.getElementById('home-btn');

// --- Intro Logic ---

// --- Intro Logic ---
let introPhotoInterval;

function startIntroSlideshow() {
    const wrappers = document.querySelectorAll('.photo-wrapper img');
    let photoPool = [...CONFIG.introPhotos];

    introPhotoInterval = setInterval(() => {
        wrappers.forEach((img, i) => {
            setTimeout(() => {
                img.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                img.style.opacity = '0';
                img.style.transform = 'scale(1.1) rotate(2deg)';
                
                setTimeout(() => {
                    const nextPhoto = photoPool[Math.floor(Math.random() * photoPool.length)];
                    img.src = nextPhoto;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1) rotate(0deg)';
                }, 1200);
            }, i * 300); // Staggered transition
        });
    }, 6000); 
}

// Initial start
startIntroSlideshow();

startBtn.addEventListener('click', () => {
    // Stop slideshow to save resources
    clearInterval(introPhotoInterval);

    // Save state as 'home' (first page after intro)
    localStorage.setItem('activePage', 'home');

    introSection.style.opacity = '0';
    setTimeout(() => {
        introSection.classList.add('hidden');
        navbar.classList.remove('hidden');
        homeBtn.classList.remove('hidden'); // Show Home Button
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '1';

        // Trigger Intersection Observer for timeline
        startTimelineObserver();
    }, 800);
});

// --- Home Button Logic ---
homeBtn.addEventListener('click', () => {
    // Clear state
    localStorage.removeItem('activePage');

    // Restart slideshow
    startIntroSlideshow();

    // Show Intro, Hide Content
    introSection.classList.remove('hidden');
    setTimeout(() => introSection.style.opacity = '1', 10);

    navbar.classList.add('hidden');
    homeBtn.classList.add('hidden');
    mainContent.classList.add('hidden');
    mainContent.style.opacity = '0';

    // Reset to top
    window.scrollTo({ top: 0, behavior: 'instant' });
});

// --- Navigation Logic ---
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Update Nav State
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Save State
        const targetId = link.getAttribute('data-target');
        localStorage.setItem('activePage', targetId);

        // Update Page View
        // targetId already declared above
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.remove('hidden');
                setTimeout(() => page.classList.add('active'), 10);
            } else {
                page.classList.remove('active');
                page.classList.add('hidden');
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// --- Slider Logic ---
function initMemorySlider() {
    const slider = document.querySelector('.memory-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('.progress-bar');

    if (!slider) return;

    const updateProgress = () => {
        const scrollPercentage = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    };

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 400, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -400, behavior: 'smooth' });
    });

    slider.addEventListener('scroll', updateProgress);
    
    // Initial progress
    updateProgress();
}

// --- Timeline Animation (Updated for Slider Cards) ---
function startTimelineObserver() {
    initMemorySlider(); // Initialize slider controls
    
    const cards = document.querySelectorAll('.memory-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// --- Reasons Generator ---
newReasonBtn.addEventListener('click', () => {
    // Fade out
    reasonDisplay.style.opacity = '0';
    reasonDisplay.style.transition = 'opacity 0.3s';

    setTimeout(() => {
        // Change text
        const randomIndex = Math.floor(Math.random() * CONFIG.reasons.length);
        reasonDisplay.textContent = CONFIG.reasons[randomIndex];
        // Fade in
        reasonDisplay.style.opacity = '1';
    }, 300);
});

// --- Countdown Timer ---
function updateTimer() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Target: October 31st, 21:45
    // Note: Month is 0-indexed in JS (0=Jan, 9=Oct)
    let target = new Date(currentYear, 9, 31, 21, 45, 0);

    // If we passed this year's date, target next year
    if (now.getTime() > target.getTime()) {
        target.setFullYear(currentYear + 1);
    }

    let distance = target.getTime() - now.getTime();

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

// --- Relationship Duration Counter ---
function updateDurationCounter() {
    const start = new Date(CONFIG.relationshipStartDate);
    const now = new Date();

    let distance = now.getTime() - start.getTime();

    if (distance < 0) distance = 0;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('duration-days');
    if (dEl) {
        dEl.innerText = days < 10 ? '0' + days : days;
        document.getElementById('duration-hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('duration-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('duration-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}

// --- Secret Countdown (Target: Jan 1, 2026) ---
function updateSecretTimer() {
    const now = new Date();
    // Target: Jan 1, 2026, 00:00:00
    const target = new Date('2026-01-01T00:00:00');

    let distance = target.getTime() - now.getTime();

    if (distance < 0) {
        // If passed, maybe show 00 or a message, but for now we just show 00
        distance = 0;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Check if elements exist before updating (safe guard)
    const dEl = document.getElementById('secret-days');
    if (dEl) {
        dEl.innerText = days < 10 ? '0' + days : days;
        document.getElementById('secret-hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('secret-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('secret-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}

setInterval(updateTimer, 1000);
updateTimer(); // Initial call

setInterval(updateDurationCounter, 1000);
updateDurationCounter(); // Initial call

setInterval(updateSecretTimer, 1000);
updateSecretTimer(); // Initial call

// --- Secret Page Logic ---
// Password protection removed, video is now public.

// --- Floating Hearts Animation ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    const hearts = ['❤', '💖', '💗', '💓', '💕'];
    const colors = ['#FF7597', '#FFB5C5', '#D6336C', '#FF8EAA', '#FFD1DC'];
    
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 15 + 15 + 'px'; 
    const left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 10 + 8 + 's';
    const delay = Math.random() * 2 + 's';

    heart.style.width = size;
    heart.style.height = size;
    heart.style.left = left;
    heart.style.animationDuration = duration;
    heart.style.animationDelay = delay;
    heart.style.color = randomColor;
    heart.style.fontSize = size;
    heart.style.opacity = Math.random() * 0.4 + 0.2;
    heart.innerHTML = randomHeart;
    heart.style.filter = 'drop-shadow(0 0 5px rgba(255, 117, 151, 0.3))';

    const container = document.querySelector('.floating-hearts');
    if (container) {
        container.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
}

setInterval(createHeart, 600); 

// --- Restore State on Load ---
document.addEventListener('DOMContentLoaded', () => {
    const activePageId = localStorage.getItem('activePage');

    if (activePageId) {
        // Stop slideshow if intro is skipped
        clearInterval(introPhotoInterval);

        // Skip Intro
        introSection.classList.add('hidden');
        introSection.style.opacity = '0';

        navbar.classList.remove('hidden');
        homeBtn.classList.remove('hidden');
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '1';

        // Activate Correct Page
        pages.forEach(page => {
            if (page.id === activePageId) {
                page.classList.remove('hidden');
                page.classList.add('active');
            } else {
                page.classList.remove('active');
                page.classList.add('hidden');
            }
        });

        // Update Nav Link
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === activePageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        startTimelineObserver();
    }
});

