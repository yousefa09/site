// Material 3 Portfolio - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Add particle system
    createParticleSystem();
    
    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Add ripple effect (Material 3 interaction)
            createRipple(this, event);
        });
    });
    
    // Floating Action Button functionality
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.addEventListener('click', function(event) {
            // Create ripple effect
            createRipple(this, event);
            
            // Simulate sending message (could integrate with email service)
            showToast('Message sent! I\'ll get back to you soon.');
        });
    }
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.skill-chip, .project-item, .contact-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        element.addEventListener('click', function(event) {
            createRipple(this, event);
        });
    });
    
    // Add click handlers for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectName = this.querySelector('h3').textContent;
            showToast(`Opening ${projectName}...`);
        });
    });
    
    // Add click handlers for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactType = this.querySelector('h3').textContent;
            const contactValue = this.querySelector('p').textContent;
            
            if (contactType === 'Email') {
                window.open(`mailto:${contactValue}`, '_blank');
            } else if (contactType === 'Phone') {
                window.open(`tel:${contactValue.replace(/\D/g, '')}`, '_blank');
            } else {
                showToast(`${contactType}: ${contactValue}`);
            }
        });
    });
    
    // Animate stats on page load
    animateStats();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key >= '1' && event.key <= '4') {
            const buttonIndex = parseInt(event.key) - 1;
            if (navButtons[buttonIndex]) {
                navButtons[buttonIndex].click();
            }
        }
    });
});

// Create Material 3 ripple effect
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    // Ensure the element has relative positioning for the ripple
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes toast-slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes toast-slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast {
        position: fixed;
        top: 24px;
        right: 24px;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        padding: 16px 24px;
        border-radius: var(--md-sys-shape-corner-small);
        box-shadow: var(--md-sys-elevation-level3);
        border: 1px solid var(--md-sys-color-outline-variant);
        animation: toast-slide-in 0.3s cubic-bezier(0.2, 0, 0, 1);
        z-index: 1000;
        font-family: var(--md-sys-typescale-body-large-font);
        font-size: var(--md-sys-typescale-body-large-size);
        max-width: 300px;
    }
    
    .toast.hide {
        animation: toast-slide-out 0.3s cubic-bezier(0.2, 0, 0, 1);
    }
`;
document.head.appendChild(style);

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Animate statistics numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const hasPlus = finalValue.includes('+');
        
        if (!isNaN(numericValue)) {
            stat.textContent = '0';
            
            let currentValue = 0;
            const increment = Math.ceil(numericValue / 30); // Animation duration ~1 second
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = currentValue + (hasPlus ? '+' : '');
            }, 33); // ~30 FPS
        }
    });
}

// Add smooth scrolling behavior for better UX (even though we don't scroll)
document.documentElement.style.scrollBehavior = 'smooth';

// Add focus management for accessibility
document.addEventListener('focus', function(event) {
    if (event.target.matches('.nav-btn, .fab, .skill-chip, .project-item, .contact-item')) {
        event.target.style.outline = '2px solid var(--md-sys-color-primary)';
        event.target.style.outlineOffset = '2px';
    }
}, true);

document.addEventListener('blur', function(event) {
    if (event.target.matches('.nav-btn, .fab, .skill-chip, .project-item, .contact-item')) {
        event.target.style.outline = 'none';
    }
}, true);

// Add touch support for mobile devices
let touchStartY = 0;
document.addEventListener('touchstart', function(event) {
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', function(event) {
    // Prevent pull-to-refresh and overscroll
    if (Math.abs(event.touches[0].clientY - touchStartY) > 10) {
        event.preventDefault();
    }
});

// Performance optimization: Preload next section content
function preloadContent() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

// Initialize performance optimizations
requestIdleCallback(preloadContent);

// Create dynamic particle system
function createParticleSystem() {
    const particleContainer = document.querySelector('.floating-particles');
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, #6750A4, #00ffff, #ff1493);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.8 + 0.2};
            box-shadow: 0 0 10px currentColor;
        `;
        particleContainer.appendChild(particle);
    }
}

// Add matrix rain effect (subtle)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#6750A4';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 100);
}

// Enhanced section transitions
function enhanceTransitions() {
    const style = document.createElement('style');
    style.textContent += `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .content-section.active {
            animation: sectionSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        @keyframes sectionSlide {
            from {
                opacity: 0;
                transform: translateX(50px) rotateY(10deg);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: translateX(0) rotateY(0deg);
                filter: blur(0px);
            }
        }
        
        .avatar {
            animation: avatarGlow 3s ease-in-out infinite alternate;
        }
        
        @keyframes avatarGlow {
            from {
                box-shadow: 0 0 20px rgba(103, 80, 164, 0.5);
                transform: scale(1);
            }
            to {
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.7);
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all enhancements
enhanceTransitions();
createMatrixRain();

// Mouse trail effect
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(103, 80, 164, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX - 5}px;
        top: ${e.clientY - 5}px;
        z-index: 9999;
        animation: trailFade 1s ease-out forwards;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 1000);
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

console.log('🌟 ASTRAL\'s Portfolio loaded successfully! 🚀');
console.log('🎮 Navigation: Use number keys 1-4 or click the buttons');
console.log('✨ Features: Particle system, glitch effects, and matrix rain activated!');
console.log('♿ Accessibility: Full keyboard navigation enabled');