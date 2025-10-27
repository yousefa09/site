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

// Create liquid glass particle system
function createParticleSystem() {
    const particleContainer = document.querySelector('.floating-particles');
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'liquid-particle';
        const size = Math.random() * 20 + 10;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: 
                radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1)),
                linear-gradient(135deg, rgba(120, 119, 198, 0.6), rgba(255, 69, 58, 0.6));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            backdrop-filter: blur(10px);
            animation: liquidParticleFloat ${Math.random() * 15 + 15}s ease-in-out infinite;
            animation-delay: ${Math.random() * 8}s;
            opacity: ${Math.random() * 0.6 + 0.3};
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        `;
        particleContainer.appendChild(particle);
    }
}

// Add liquid gradient waves effect
function createLiquidWaves() {
    const wavesContainer = document.createElement('div');
    wavesContainer.id = 'liquid-waves';
    wavesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.3;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'liquid-wave';
        wave.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: -100%;
            width: 300%;
            height: 100px;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(120, 119, 198, 0.4),
                rgba(255, 69, 58, 0.4),
                rgba(48, 209, 88, 0.4),
                transparent
            );
            border-radius: 50px;
            filter: blur(20px);
            animation: liquidWaveFlow ${15 + i * 5}s ease-in-out infinite;
            animation-delay: ${i * 5}s;
            transform: rotate(${Math.random() * 30 - 15}deg);
        `;
        wavesContainer.appendChild(wave);
    }
    
    document.body.appendChild(wavesContainer);
}

// Enhanced liquid glass transitions
function enhanceTransitions() {
    const style = document.createElement('style');
    style.textContent += `
        @keyframes liquidParticleFloat {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                border-radius: 50%;
                opacity: 0.3;
            }
            25% {
                transform: translate(50px, -30px) rotate(90deg) scale(1.2);
                border-radius: 60% 40% 30% 70%;
                opacity: 0.6;
            }
            50% {
                transform: translate(-20px, 40px) rotate(180deg) scale(0.8);
                border-radius: 30% 70% 60% 40%;
                opacity: 0.8;
            }
            75% {
                transform: translate(-40px, -20px) rotate(270deg) scale(1.1);
                border-radius: 70% 30% 40% 60%;
                opacity: 0.4;
            }
        }
        
        @keyframes liquidWaveFlow {
            0% {
                transform: translateX(-100%) rotate(0deg) scaleY(1);
                opacity: 0;
            }
            20% {
                opacity: 1;
                transform: translateX(-50%) rotate(5deg) scaleY(1.2);
            }
            50% {
                transform: translateX(0%) rotate(-3deg) scaleY(0.8);
                opacity: 0.8;
            }
            80% {
                opacity: 1;
                transform: translateX(50%) rotate(3deg) scaleY(1.1);
            }
            100% {
                transform: translateX(100%) rotate(0deg) scaleY(1);
                opacity: 0;
            }
        }
        
        .content-section.active {
            animation: liquidSectionSlide 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        @keyframes liquidSectionSlide {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
                filter: blur(20px);
                backdrop-filter: blur(0px);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0px);
                backdrop-filter: blur(40px);
            }
        }
        
        .avatar {
            animation: liquidAvatarMorph 4s ease-in-out infinite;
        }
        
        @keyframes liquidAvatarMorph {
            0%, 100% {
                border-radius: 50%;
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 8px 25px rgba(0, 0, 0, 0.2);
                transform: scale(1);
            }
            25% {
                border-radius: 60% 40% 50% 70%;
                transform: scale(1.05);
            }
            50% {
                border-radius: 40% 60% 70% 30%;
                box-shadow: 
                    inset 0 1px 0 rgba(255, 255, 255, 0.5),
                    0 12px 35px rgba(0, 0, 0, 0.3);
                transform: scale(0.98);
            }
            75% {
                border-radius: 70% 30% 40% 60%;
                transform: scale(1.02);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all enhancements
enhanceTransitions();
createLiquidWaves();

// Liquid glass mouse trail effect
let lastTrailTime = 0;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastTrailTime < 50) return; // Throttle for performance
    lastTrailTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'liquid-mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1)),
            linear-gradient(135deg, rgba(120, 119, 198, 0.6), rgba(255, 69, 58, 0.6));
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX - 6}px;
        top: ${e.clientY - 6}px;
        z-index: 9999;
        backdrop-filter: blur(8px);
        animation: liquidTrailFade 1.2s ease-out forwards;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 1200);
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes liquidTrailFade {
        0% {
            opacity: 0.8;
            transform: scale(1) rotate(0deg);
            border-radius: 50%;
        }
        50% {
            opacity: 0.4;
            transform: scale(1.5) rotate(180deg);
            border-radius: 60% 40% 70% 30%;
        }
        100% {
            opacity: 0;
            transform: scale(0.2) rotate(360deg);
            border-radius: 30% 70% 40% 60%;
        }
    }
`;
document.head.appendChild(trailStyle);

console.log('🌟 ASTRAL\'s Portfolio loaded successfully! 🚀');
console.log('🎮 Navigation: Use number keys 1-4 or click the buttons');
console.log('✨ Features: Particle system, glitch effects, and matrix rain activated!');
console.log('♿ Accessibility: Full keyboard navigation enabled');