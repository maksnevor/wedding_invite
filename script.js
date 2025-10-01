// Envelope Animation and Page Loading
document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.uc-preloader');
    const envelopeContainer = document.querySelector('.envelope-container');
    const mainContent = document.querySelector('.main-content');

    // Confetti function using canvas-confetti library
    function launchConfetti() {
        // Left side confetti
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 100,
            origin: { x: 0, y: 1 },
            startVelocity: 60,
            zIndex: 10000,
            ticks: 200,
            colors: ['#ff6b6b', '#ff8787', '#ffa5a5', '#ff4757', '#ee5a6f', '#f78fb3', '#fa8fb1']
        });

        // Right side confetti
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 100,
            origin: { x: 1, y: 1 },
            startVelocity: 60,
            zIndex: 10000,
            ticks: 200,
            colors: ['#ff6b6b', '#ff8787', '#ffa5a5', '#ff4757', '#ee5a6f', '#f78fb3', '#fa8fb1']
        });

        // Center confetti with hearts
        confetti({
            particleCount: 80,
            angle: 90,
            spread: 120,
            origin: { x: 0.5, y: 1 },
            startVelocity: 65,
            zIndex: 10000,
            ticks: 200,
            shapes: ['heart', 'circle'],
            colors: ['#ff4757', '#ee5a6f', '#f78fb3', '#ff6b6b']
        });
    }

    // Automatically open envelope after 1 second
    setTimeout(() => {
        envelopeContainer.classList.add('open');
        // Launch confetti when envelope opens
        setTimeout(() => {
            launchConfetti();
        }, 500);
    }, 1000);



    // Automatically hide preloader after 4 seconds
    setTimeout(() => {
        preloader.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        document.body.style.overflow = 'auto';

        // Start typing animation after a short delay
        setTimeout(() => {
            startTypingAnimation();
        }, 500);
    }, 4000);

    // Remove preloader from DOM after fade out
    preloader.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'opacity' && this.classList.contains('fade-out')) {
            this.style.display = 'none';
        }
    });

    // Initially hide body overflow
    document.body.style.overflow = 'hidden';
});

// Typing Animation for Names
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');

    if (!typingElement) return;

    const text = typingElement.getAttribute('data-text');
    let index = 0;
    typingElement.innerHTML = ''; // используем innerHTML, т.к. будет HTML вставка

    function typeCharacter() {
        if (index < text.length) {
            const char = text.charAt(index);

            if (char === '♥') {
                typingElement.innerHTML += '<span class="green-heart">♥</span>';
            } else {
                typingElement.innerHTML += char;
            }

            index++;

            const delay = Math.random() * 70 + 80;
            setTimeout(typeCharacter, delay);
        } else {
            setTimeout(() => {
                typingElement.classList.add('typing-complete');

                const heartFigures = document.querySelector('.heart-figures');
                if (heartFigures) {
                    heartFigures.classList.add('show');
                }
            }, 0);
        }
    }

    typeCharacter();
}


// Calendar Generation
document.addEventListener('DOMContentLoaded', function () {
    const calendarBody = document.getElementById('calendarBody');

    if (calendarBody) {
        // April 2026 calendar
        const daysInMonth = 30;
        const firstDay = 2; // Wednesday (0 = Sunday, 1 = Monday, etc.)
        const weddingDay = 24;

        // Add empty cells for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day';
            calendarBody.appendChild(emptyCell);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;

            if (day === weddingDay) {
                dayCell.classList.add('wedding-day');
            }

            calendarBody.appendChild(dayCell);
        }
    }
});

// Countdown Timer
document.addEventListener('DOMContentLoaded', function () {
    const weddingDate = new Date('April 24, 2026 16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});


document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');

    if (!phoneInput) return;

    function setCursorPosition(elem, pos) {
        if (elem.setSelectionRange) {
            elem.focus();
            elem.setSelectionRange(pos, pos);
        }
    }

    phoneInput.addEventListener('input', function (e) {
        const input = e.target;
        const rawValue = input.value;
        const cursorPosition = input.selectionStart;

        // Получаем только цифры
        let digits = rawValue.replace(/\D/g, '');

        // Обработка для РФ: если не начинается с 375, считаем российским номером
        let isBelarus = digits.startsWith('375');

        if (!isBelarus) {
            if (digits[0] === '8') {
                digits = '7' + digits.substring(1);
            } else if (digits[0] !== '7') {
                digits = '7' + digits;
            }
        }

        let formattedValue = '';
        if (isBelarus) {
            // +375 (XX) XXX-XX-XX
            formattedValue = '+375';
            if (digits.length > 3) {
                formattedValue += ' (' + digits.substring(3, Math.min(5, digits.length));
            }
            if (digits.length >= 5) {
                formattedValue += ')';
            }
            if (digits.length > 5) {
                formattedValue += ' ' + digits.substring(5, Math.min(8, digits.length));
            }
            if (digits.length >= 8) {
                formattedValue += '-' + digits.substring(8, Math.min(10, digits.length));
            }
            if (digits.length >= 10) {
                formattedValue += '-' + digits.substring(10, Math.min(12, digits.length));
            }
        } else {
            // +7 (XXX) XXX-XX-XX
            formattedValue = '+7';
            if (digits.length > 1) {
                formattedValue += ' (' + digits.substring(1, Math.min(4, digits.length));
            }
            if (digits.length >= 4) {
                formattedValue += ')';
            }
            if (digits.length > 4) {
                formattedValue += ' ' + digits.substring(4, Math.min(7, digits.length));
            }
            if (digits.length >= 7) {
                formattedValue += '-' + digits.substring(7, Math.min(9, digits.length));
            }
            if (digits.length >= 9) {
                formattedValue += '-' + digits.substring(9, Math.min(11, digits.length));
            }
        }

        // Корректируем позицию курсора
        // Считаем сколько цифр было до курсора
        let digitsBeforeCursor = 0;
        for (let i = 0; i < cursorPosition; i++) {
            if (/\d/.test(rawValue[i])) digitsBeforeCursor++;
        }

        // Считаем позицию в отформатированной строке, после которой будет столько же цифр
        let pos = 0, digitsCounted = 0;
        while (pos < formattedValue.length && digitsCounted < digitsBeforeCursor) {
            if (/\d/.test(formattedValue[pos])) digitsCounted++;
            pos++;
        }

        input.value = formattedValue;
        setCursorPosition(input, pos);
    });


    phoneInput.addEventListener('focus', function () {
        if (this.value === '') {
            this.value = '+375 (';
            setCursorPosition(this, this.value.length);
        }
    });

    phoneInput.addEventListener('blur', function () {
        if (this.value === '+375 (' || this.value === '+7 (') {
            this.value = '';
        }
    });
});







// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Add animation on scroll
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Music Player Control
document.addEventListener('DOMContentLoaded', function () {
    const audioToggle = document.getElementById('audioToggle');
    const vinylDisc = document.querySelector('.vinyl-disc');

    // Create audio element (you'll need to add your audio file)
    const audio = new Audio('music.mp3'); // Add your audio file path here: new Audio('path/to/music.mp3')
    audio.loop = true;

    let isPlaying = false;

    // Start with muted state
    if (audioToggle) {
        audioToggle.classList.add('muted');
    }

    if (audioToggle && vinylDisc) {
        audioToggle.addEventListener('click', function () {
            if (isPlaying) {
                audio.pause();
                audioToggle.classList.add('muted');
                isPlaying = false;
            } else {
                audio.play().catch(err => {
                    console.log('Audio playback failed:', err);
                });
                audioToggle.classList.remove('muted');
                isPlaying = true;
            }
        });

        // Auto-mute icon when audio ends (but keep spinning)
        audio.addEventListener('ended', function () {
            audioToggle.classList.add('muted');
            isPlaying = false;
        });
    }
});