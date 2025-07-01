/**
 * Energ.IA Website JavaScript
 * Advanced visual effects and interactions with Language Switcher
 */

class LanguageSwitcher {
    constructor() {
        this.currentLang = this.detectCurrentLanguage();
        this.init();
    }

    init() {
        this.createLanguageSwitcher();
        this.updateLanguageSwitcher();
    }

    detectCurrentLanguage() {
        // Detect language based on current page URL
        const path = window.location.pathname;
        if (path.startsWith('/en/') || path === '/en') {
            return 'en';
        }
        return 'it';
    }

    createLanguageSwitcher() {
        const navbar = document.querySelector('.nav-container');
        if (!navbar) return;

        // Check if language switcher already exists
        if (document.getElementById('langToggle')) return;

        // Create language switcher container
        const langSwitcher = document.createElement('div');
        langSwitcher.className = 'language-switcher';
        langSwitcher.innerHTML = `
            <button class="lang-btn" id="langToggle" aria-label="Switch Language">
                <span class="lang-flag" id="langFlag">🇮🇹</span>
                <span class="lang-text" id="langText">IT</span>
                <span class="lang-arrow">⌄</span>
            </button>
            <div class="lang-dropdown" id="langDropdown">
                <a href="#" class="lang-option" data-lang="it">
                    <span class="lang-flag">🇮🇹</span>
                    <span>Italiano</span>
                </a>
                <a href="#" class="lang-option" data-lang="en">
                    <span class="lang-flag">🇬🇧</span>
                    <span>English</span>
                </a>
            </div>
        `;

        // Check if .nav-right wrapper already exists
        let navRight = navbar.querySelector('.nav-right');
        
        if (!navRight) {
            // Create wrapper if it doesn't exist (for English version)
            const navLinks = navbar.querySelector('.nav-links');
            navRight = document.createElement('div');
            navRight.className = 'nav-right';
            
            // Move nav-links into the wrapper
            navRight.appendChild(navLinks);
            
            // Insert the wrapper into navbar
            navbar.appendChild(navRight);
        }
        
        // Add language switcher to the existing or newly created wrapper
        navRight.appendChild(langSwitcher);

        this.setupLanguageSwitcherEvents();
    }

    setupLanguageSwitcherEvents() {
        const langToggle = document.getElementById('langToggle');
        const langDropdown = document.getElementById('langDropdown');
        const langOptions = document.querySelectorAll('.lang-option');

        // Toggle dropdown
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });

        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const selectedLang = option.dataset.lang;
                this.switchLanguage(selectedLang);
                langDropdown.classList.remove('show');
            });
        });

        // Keyboard navigation
        langToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                langDropdown.classList.toggle('show');
            }
        });
    }

    switchLanguage(newLang) {
        const currentSearch = window.location.search;
        const currentHash = window.location.hash;
        
        let newPath;
        
        if (newLang === 'en') {
            // Switch to English - go to /en/
            newPath = '/en/';
        } else {
            // Switch to Italian - go to root /
            newPath = '/';
        }

        // Store language preference
        try {
            localStorage.setItem('preferredLanguage', newLang);
        } catch (e) {
            // Fallback if localStorage is not available
            console.log('Language preference not stored');
        }

        // Navigate to new page
        window.location.href = newPath + currentSearch + currentHash;
    }

    updateLanguageSwitcher() {
        const langFlag = document.getElementById('langFlag');
        const langText = document.getElementById('langText');
        
        if (!langFlag || !langText) return;

        if (this.currentLang === 'en') {
            langFlag.textContent = '🇬🇧';
            langText.textContent = 'EN';
        } else {
            langFlag.textContent = '🇮🇹';
            langText.textContent = 'IT';
        }

        // Update active state in dropdown
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLang);
        });
    }

    // Check for stored language preference on page load
    static checkLanguagePreference() {
        try {
            const preferred = localStorage.getItem('preferredLanguage');
            if (preferred) {
                const currentLang = window.location.pathname.startsWith('/en/') ? 'en' : 'it';
                if (preferred !== currentLang) {
                    // Auto-redirect to preferred language if different
                    const switcher = new LanguageSwitcher();
                    // Uncomment the line below if you want auto-redirect
                    // switcher.switchLanguage(preferred);
                }
            }
        } catch (e) {
            console.log('Could not check language preference');
        }
    }
}

class VisualEffects {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.pageLoader = document.getElementById('pageLoader');
        this.floatingShapes = document.getElementById('floatingShapes');
        this.init();
    }

    init() {
        this.setupLoader();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.createFloatingShapes();
        this.setupAdvancedHovers();
        this.setupFAQ();
        this.setupCursorTrail();
    }

    setupLoader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.pageLoader.classList.add('hidden');
            }, 1200);
        });
    }

    createFloatingShapes() {
        const shapes = ['circle', 'triangle', 'square'];
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            
            shape.className = `shape ${shapeType}`;
            
            const size = Math.random() * 40 + 20;
            if (shapeType === 'circle' || shapeType === 'square') {
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
            }
            
            shape.style.left = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 20 + 's';
            shape.style.animationDuration = (Math.random() * 10 + 15) + 's';
            
            this.floatingShapes.appendChild(shape);
        }
    }

    setupScrollEffects() {
        let ticking = false;
        
        const updateScroll = () => {
            const scrolled = window.pageYOffset;
            
            if (scrolled > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            this.floatingShapes.style.transform = `translateY(${rate * 0.2}px)`;
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                }
            });
        }, options);

        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    setupFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const icon = question.querySelector('.faq-icon');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                        item.querySelector('.faq-answer').classList.remove('active');
                        item.querySelector('.faq-icon').textContent = '+';
                    }
                });
                
                // Toggle current item
                faqItem.classList.toggle('active');
                answer.classList.toggle('active');
                icon.textContent = faqItem.classList.contains('active') ? '−' : '+';
            });
        });
    }

    setupAdvancedHovers() {
        // 3D tilt effect for cards
        document.querySelectorAll('.team-card, .problem-card, .solutions-text, .tech-highlight, .solutions-stats, .solutions-features').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Magnetic effect for buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupCursorTrail() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.9) {
                this.createSparkle(e.clientX, e.clientY);
            }
        });
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#2563eb';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.opacity = '0.7';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (document.body.contains(sparkle)) {
                document.body.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Updated Form Handler Class with EmailJS
class FormHandler {
    constructor() {
        this.setupEmailJS();
        this.setupContactForm();
    }

    setupEmailJS() {
        // Initialize EmailJS with your public key
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('yUvsv0sE-ec8pcewF');
    }

    setupContactForm() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simple validation - detect language for error messages
        const isEnglish = window.location.pathname.startsWith('/en/');
        const messages = {
            fillRequired: isEnglish ? 'Please fill in all required fields' : 'Compila tutti i campi obbligatori',
            invalidEmail: isEnglish ? 'Please enter a valid email address' : 'Inserisci un indirizzo email valido',
            sending: isEnglish ? 'Sending...' : 'Invio in corso...',
            success: isEnglish ? 'Request sent successfully! We will contact you soon.' : 'Richiesta inviata con successo! Ti contatteremo presto.',
            error: isEnglish ? 'Error sending. Please try again later or contact us directly.' : 'Errore nell\'invio. Riprova più tardi o contattaci direttamente.'
        };

        if (!data.nome || !data.email || !data.azienda) {
            this.showNotification(messages.fillRequired, 'error');
            return;
        }

        // Email validation
        if (!this.isValidEmail(data.email)) {
            this.showNotification(messages.invalidEmail, 'error');
            return;
        }

        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = messages.sending;
        submitButton.disabled = true;

        try {
            // Send email using EmailJS
            const result = await emailjs.send(
                'service_rc7762e',  // Replace with your EmailJS service ID
                'template_8uv5a71', // Replace with your EmailJS template ID
                {
                    to_email: 'info@energ-ia.it',
                    from_name: data.nome,
                    from_email: data.email,
                    company: data.azienda,
                    phone: data.telefono || (isEnglish ? 'Not provided' : 'Non fornito'),
                    message: data.messaggio || (isEnglish ? 'Contact request' : 'Richiesta di contatto'),
                    reply_to: data.email
                }
            );

            console.log('Email sent successfully:', result);
            this.showNotification(messages.success, 'success');
            
            // Reset form
            e.target.reset();

        } catch (error) {
            console.error('Error sending email:', error);
            this.showNotification(messages.error, 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Performance Monitor Class
class PerformanceMonitor {
    constructor() {
        this.setupLazyLoading();
        this.setupImageOptimization();
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupImageOptimization() {
        // Add loading="lazy" to all images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
}

// Analytics Helper
class Analytics {
    constructor() {
        this.setupEventTracking();
    }

    setupEventTracking() {
        // Track button clicks
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                this.trackEvent('button_click', {
                    button_text: buttonText,
                    page_section: this.getCurrentSection(e.target)
                });
            });
        });

        // Track section visibility
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id || 'unknown';
                    this.trackEvent('section_view', { section: sectionId });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });

        // Track language switches
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lang-option')) {
                const lang = e.target.closest('.lang-option').dataset.lang;
                this.trackEvent('language_switch', { target_language: lang });
            }
        });
    }

    getCurrentSection(element) {
        const section = element.closest('section');
        return section ? section.id || 'unknown' : 'unknown';
    }

    trackEvent(eventName, properties = {}) {
        // Placeholder for analytics tracking
        // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
        console.log('Analytics Event:', eventName, properties);
        
        // Example: Google Analytics 4
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, properties);
        // }
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        // Enable keyboard navigation for FAQ
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });

        // Escape key to close modals/dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open FAQs
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    item.querySelector('.faq-question').click();
                });
                
                // Close language dropdown
                document.getElementById('langDropdown')?.classList.remove('show');
            }
        });
    }

    setupAriaLabels() {
        // Add aria-labels to interactive elements
        document.querySelectorAll('.faq-question').forEach((question, index) => {
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', `faq-answer-${index}`);
            
            const answer = question.nextElementSibling;
            if (answer) {
                answer.setAttribute('id', `faq-answer-${index}`);
            }
        });
    }

    setupFocusManagement() {
        // Manage focus for better keyboard navigation
        let isUsingKeyboard = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                isUsingKeyboard = true;
            }
        });

        document.addEventListener('mousedown', () => {
            isUsingKeyboard = false;
        });

        // Add focus styles only for keyboard users
        document.addEventListener('focusin', (e) => {
            if (isUsingKeyboard) {
                e.target.classList.add('keyboard-focus');
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('keyboard-focus');
        });
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check language preference first
    LanguageSwitcher.checkLanguagePreference();
    
    // Initialize language switcher
    new LanguageSwitcher();
    
    // Initialize main visual effects
    new VisualEffects();
    
    // Initialize form handling
    new FormHandler();
    
    // Initialize performance optimizations
    new PerformanceMonitor();
    
    // Initialize analytics tracking
    new Analytics();
    
    // Initialize accessibility enhancements
    new AccessibilityEnhancer();
    
    console.log('🚀 Energ.IA website initialized successfully!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log performance metrics
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData) {
        console.log('⚡ Performance Metrics:', {
            loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
            domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
            firstPaint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0)
        });
    }
});
