// Dashboard JavaScript - Clean and Organized

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dashboard functionality
    initializeAnimations();
    initializeFlagInteractions();
    initializeCounterAnimations();
    initializeScrollEffects();
});

// Animation Functions
function initializeAnimations() {
    // Animate milestone items on load
    const milestoneItems = document.querySelectorAll('.milestone-item');
    animateElements(milestoneItems, 'fadeInLeft', 200);
    
    // Animate stat items
    const statItems = document.querySelectorAll('.stat-item');
    animateElements(statItems, 'fadeInRight', 150);
    
    // Animate impact items
    const impactItems = document.querySelectorAll('.impact-item');
    animateElements(impactItems, 'fadeInUp', 100);
    
    // Animate investment items
    const investmentItems = document.querySelectorAll('.investment-item');
    animateElements(investmentItems, 'fadeIn', 150);
}

function animateElements(elements, animationType, delay) {
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = getInitialTransform(animationType);
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        }, index * delay + 300);
    });
}

function getInitialTransform(animationType) {
    switch(animationType) {
        case 'fadeInLeft':
            return 'translateX(-30px)';
        case 'fadeInRight':
            return 'translateX(30px)';
        case 'fadeInUp':
            return 'translateY(30px)';
        default:
            return 'translateY(20px)';
    }
}

// Flag Interactions
function initializeFlagInteractions() {
    const flags = document.querySelectorAll('.flag');
    const countryNames = {
        '🇰🇪': 'Kenya',
        '🇺🇬': 'Uganda',
        '🇹🇿': 'Tanzania',
        '🇷🇼': 'Rwanda',
        '🇧🇮': 'Burundi',
        '🇨🇩': 'DR Congo',
        '🇸🇸': 'South Sudan'
    };
    
    flags.forEach(flag => {
        // Add hover tooltip
        const tooltip = createTooltip(flag);
        
        flag.addEventListener('mouseenter', function(e) {
            const country = this.getAttribute('data-country');
            showTooltip(tooltip, country, e);
        });
        
        flag.addEventListener('mouseleave', function() {
            hideTooltip(tooltip);
        });
        
        flag.addEventListener('click', function() {
            setActiveFlag(this);
            showCountryInfo(this.getAttribute('data-country'));
        });
    });
}

function createTooltip(flag) {
    const tooltip = document.createElement('div');
    tooltip.className = 'country-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: #006666;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(tooltip);
    return tooltip;
}

function showTooltip(tooltip, country, event) {
    tooltip.textContent = country;
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY - 40 + 'px';
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
}

function hideTooltip(tooltip) {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(-10px)';
}

function setActiveFlag(activeFlag) {
    const flags = document.querySelectorAll('.flag');
    flags.forEach(flag => flag.classList.remove('active'));
    activeFlag.classList.add('active');
}

function showCountryInfo(country) {
    // Create a subtle notification for country selection
    const notification = document.createElement('div');
    notification.textContent = `Selected: ${country}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #20b2aa 0%, #008080 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(32, 178, 170, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Counter Animations
function initializeCounterAnimations() {
    const targetNumber = document.querySelector('.target-number');
    const numbers = document.querySelectorAll('.milestone-details h3, .stat-details h3, .impact-details h3');
    
    // Animate the main target number
    if (targetNumber) {
        animateCounter(targetNumber, 0, 11000, 2000);
    }
    
    // Add subtle pulsing effect to target number
    setInterval(() => {
        if (targetNumber) {
            targetNumber.style.transform = 'translateX(-50%) scale(1.1)';
            setTimeout(() => {
                targetNumber.style.transform = 'translateX(-50%) scale(1)';
            }, 300);
        }
    }, 5000);
}

function animateCounter(element, start, end, duration) {
    const startTime = Date.now();
    const originalText = element.textContent;
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Scroll Effects
function initializeScrollEffects() {
    const cards = document.querySelectorAll('.card');
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Card Hover Effects
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 128, 128, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 128, 128, 0.1)';
        });
    });
}

// Utility Functions
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Data Update Functions
function updateDashboardData(newData) {
    // Function to update dashboard with new data
    if (newData.activeWomen) {
        updateMilestoneValue('28 Active Women', newData.activeWomen + ' Active Women');
    }
    
    if (newData.monthlyRevenue) {
        updateImpactValue('KES 1.6M Monthly Revenue', 'KES ' + newData.monthlyRevenue + ' Monthly Revenue');
    }
    
    if (newData.targetNumber) {
        const targetElement = document.querySelector('.target-number');
        if (targetElement) {
            animateCounter(targetElement, parseInt(targetElement.textContent.replace(/,/g, '')), newData.targetNumber, 1500);
        }
    }
}

function updateMilestoneValue(oldText, newText) {
    const milestones = document.querySelectorAll('.milestone-details h3');
    milestones.forEach(milestone => {
        if (milestone.textContent === oldText) {
            milestone.style.transition = 'all 0.3s ease';
            milestone.style.opacity = '0';
            setTimeout(() => {
                milestone.textContent = newText;
                milestone.style.opacity = '1';
            }, 300);
        }
    });
}

function updateImpactValue(oldText, newText) {
    const impacts = document.querySelectorAll('.impact-details h3');
    impacts.forEach(impact => {
        if (impact.textContent === oldText) {
            impact.style.transition = 'all 0.3s ease';
            impact.style.opacity = '0';
            setTimeout(() => {
                impact.textContent = newText;
                impact.style.opacity = '1';
            }, 300);
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .card {
        animation: fadeInScale 0.6s ease-out;
    }
    
    .milestone-item:hover .milestone-icon,
    .stat-item:hover .stat-icon,
    .impact-item:hover .impact-icon {
        animation: bounce 0.6s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
`;

document.head.appendChild(style);

// Initialize additional effects after DOM is loaded
setTimeout(() => {
    initializeCardHoverEffects();
}, 500);

// Add click ripple effect to interactive elements
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('flag') || e.target.closest('.milestone-item') || e.target.closest('.stat-item')) {
        const element = e.target.closest('.flag') || e.target.closest('.milestone-item') || e.target.closest('.stat-item');
        if (element) {
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            createRippleEffect(element, e);
        }
    }
});

// Export functions for external use
window.DashboardAPI = {
    updateData: updateDashboardData,
    setActiveFlag: setActiveFlag,
    animateCounter: animateCounter
};