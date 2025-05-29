/**
 * Energ.IA Website JavaScript
 * Advanced visual effects and interactions
 */

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
        document.querySelectorAll('.product-card, .team-card, .problem-card').forEach(card => {
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

// Form Handler Class
class FormHandler {
    constructor() {
        this.setupContactForm();
    }

    setupContactForm() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.nome || !data.email || !data.azienda) {
            this.showNotification('Compila tutti i campi obbligatori', 'error');
            return;
        }

        // Simulate form submission
        this.showNotification('Richiesta inviata con successo! Ti contatteremo presto.', 'success');
        
        // Reset form
        e.target.reset();
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
        document.querySelectorAll('.btn-primary, .btn-secondary, .product-link').forEach(button => {
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
