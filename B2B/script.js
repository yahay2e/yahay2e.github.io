/* ========================================
   RETAL ASSET MANAGER - INTERACTIVE SCRIPT
   Premium Interactions & Animations
   ======================================== */

// ========================================
// COUNTER ANIMATION (Counting Up Effect)
// ========================================

function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format numbers with Arabic separators
        if (suffix === 'مليار ريال' || suffix === 'مليون ريال') {
            element.textContent = current.toFixed(1) + ' ' + suffix;
        } else if (suffix === '%') {
            element.textContent = Math.floor(current) + suffix;
        } else if (suffix === 'ساعة') {
            element.textContent = current.toFixed(1) + ' ' + suffix;
        } else {
            element.textContent = Math.floor(current) + (suffix ? ' ' + suffix : '');
        }
    }, 16);
}

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate all KPI values when section is active
    const observeCounters = () => {
        const activeSection = document.querySelector('.page-section.active');
        if (activeSection) {
            const counters = activeSection.querySelectorAll('.kpi-value');
            counters.forEach(counter => {
                const text = counter.textContent.trim();
                
                // Parse different number formats
                if (text.includes('مليار')) {
                    const value = parseFloat(text);
                    animateCounter(counter, value, 'مليار ريال', 2500);
                } else if (text.includes('مليون')) {
                    const value = parseFloat(text);
                    animateCounter(counter, value, 'مليون ريال', 2500);
                } else if (text.includes('%')) {
                    const value = parseInt(text);
                    animateCounter(counter, value, '%', 2000);
                } else if (text.includes('ساعة')) {
                    const value = parseFloat(text);
                    animateCounter(counter, value, 'ساعة', 2000);
                } else {
                    const value = parseInt(text);
                    animateCounter(counter, value, '', 2000);
                }
            });
        }
    };

    // Run counters on initial load
    setTimeout(observeCounters, 300);

    // Re-run counters when switching sections
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(observeCounters, 400);
        });
    });
});

// ========================================
// NAVIGATION SYSTEM
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections with fade out
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section with fade in
            const page = this.getAttribute('data-page');
            const targetSection = document.getElementById(page);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 100);
                
                // Update page title with smooth transition
                const pageTitle = document.querySelector('.page-title h1');
                pageTitle.style.opacity = '0';
                
                setTimeout(() => {
                    const pageTitles = {
                        'dashboard': 'نظرة عامة على الأصول',
                        'maintenance': 'الصيانة والتشغيل',
                        'reports': 'التقارير المالية',
                        'projects': 'مشاريعنا',
                        'community': 'تجربة المجتمع'
                    };
                    pageTitle.textContent = pageTitles[page] || 'رتال';
                    pageTitle.style.opacity = '1';
                }, 200);
            }
        });
    });
});

// ========================================
// MODAL MANAGEMENT
// ========================================

function openNewTicketModal() {
    document.getElementById('newTicketModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeNewTicketModal() {
    document.getElementById('newTicketModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

function submitTicket(e) {
    e.preventDefault();
    const ticketNumber = '#MT-' + Math.floor(Math.random() * 9000 + 1000);
    
    // Show success message with custom styling
    showNotification('تم إنشاء التذكرة بنجاح!', 'رقم التذكرة: ' + ticketNumber, 'success');
    
    closeNewTicketModal();
    e.target.reset();
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('newTicketModal');
    if (event.target == modal) {
        closeNewTicketModal();
    }
}

// ========================================
// CUSTOM NOTIFICATION SYSTEM
// ========================================

function showNotification(title, message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        padding: 20px 30px;
        border-radius: 16px;
        box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideDown 0.4s ease;
        border-left: 4px solid ${type === 'success' ? '#2D8C68' : '#C84C4C'};
        min-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 700; color: #2C2F33; margin-bottom: 5px; font-size: 16px;">${title}</div>
        <div style="color: #5A6370; font-size: 14px;">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
    
    .page-title h1 {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// ========================================
// CHART.JS CONFIGURATION WITH GRADIENTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    Chart.defaults.font.family = 'Tajawal';
    Chart.defaults.color = '#5A6370';
    
    // Collection Rate Chart (Bar) with Gradient
    const collectionCtx = document.getElementById('collectionChart');
    if (collectionCtx) {
        const ctx = collectionCtx.getContext('2d');
        
        // Create gradients
        const gradient1 = ctx.createLinearGradient(0, 0, 0, 250);
        gradient1.addColorStop(0, 'rgba(182, 227, 212, 0.9)');
        gradient1.addColorStop(1, 'rgba(182, 227, 212, 0.3)');
        
        const gradient2 = ctx.createLinearGradient(0, 0, 0, 250);
        gradient2.addColorStop(0, 'rgba(74, 166, 197, 0.9)');
        gradient2.addColorStop(1, 'rgba(74, 166, 197, 0.3)');
        
        const gradient3 = ctx.createLinearGradient(0, 0, 0, 250);
        gradient3.addColorStop(0, 'rgba(197, 164, 126, 0.9)');
        gradient3.addColorStop(1, 'rgba(197, 164, 126, 0.3)');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['الرياض', 'الخبر', 'جدة'],
                datasets: [{
                    label: 'معدل التحصيل %',
                    data: [92, 88, 95],
                    backgroundColor: [gradient1, gradient2, gradient3],
                    borderColor: ['#B6E3D4', '#4AA6C5', '#C5A47E'],
                    borderWidth: 2,
                    borderRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#2C2F33',
                        bodyColor: '#5A6370',
                        borderColor: 'rgba(182, 227, 212, 0.5)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: { color: 'rgba(182, 227, 212, 0.15)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Satisfaction Trend Chart (Line) with Gradient Fill
    const satisfactionCtx = document.getElementById('satisfactionChart');
    if (satisfactionCtx) {
        const ctx = satisfactionCtx.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(74, 166, 197, 0.3)');
        gradient.addColorStop(1, 'rgba(74, 166, 197, 0.05)');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'درجة الرضا',
                    data: [78, 82, 85, 88, 90, 92],
                    borderColor: '#4AA6C5',
                    backgroundColor: gradient,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointBackgroundColor: '#4AA6C5',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#2C2F33',
                        bodyColor: '#5A6370',
                        borderColor: 'rgba(74, 166, 197, 0.5)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: { color: 'rgba(74, 166, 197, 0.1)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Revenue Distribution Chart (Doughnut) with Gradient
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['إيوان سدرة', 'رتال رايز', 'نساج تاون'],
                datasets: [{
                    data: [380, 295, 175],
                    backgroundColor: [
                        'rgba(182, 227, 212, 0.85)',
                        'rgba(74, 166, 197, 0.85)',
                        'rgba(197, 164, 126, 0.85)'
                    ],
                    borderColor: ['#B6E3D4', '#4AA6C5', '#C5A47E'],
                    borderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: { size: 13, weight: '500' },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#2C2F33',
                        bodyColor: '#5A6370',
                        borderColor: 'rgba(182, 227, 212, 0.5)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + ' مليون ريال';
                            }
                        }
                    }
                }
            }
        });
    }

    // Revenue Growth Chart (Multi-line Area)
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        const ctx = growthCtx.getContext('2d');
        
        const gradient1 = ctx.createLinearGradient(0, 0, 0, 250);
        gradient1.addColorStop(0, 'rgba(182, 227, 212, 0.3)');
        gradient1.addColorStop(1, 'rgba(182, 227, 212, 0.05)');
        
        const gradient2 = ctx.createLinearGradient(0, 0, 0, 250);
        gradient2.addColorStop(0, 'rgba(74, 166, 197, 0.3)');
        gradient2.addColorStop(1, 'rgba(74, 166, 197, 0.05)');
        
        const gradient3 = ctx.createLinearGradient(0, 0, 0, 250);
        gradient3.addColorStop(0, 'rgba(197, 164, 126, 0.3)');
        gradient3.addColorStop(1, 'rgba(197, 164, 126, 0.05)');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [
                    {
                        label: 'إيوان سدرة',
                        data: [62, 65, 63, 64, 66, 68],
                        borderColor: '#B6E3D4',
                        backgroundColor: gradient1,
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    },
                    {
                        label: 'رتال رايز',
                        data: [48, 49, 50, 49, 51, 52],
                        borderColor: '#4AA6C5',
                        backgroundColor: gradient2,
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    },
                    {
                        label: 'نساج تاون',
                        data: [28, 29, 30, 29, 30, 31],
                        borderColor: '#C5A47E',
                        backgroundColor: gradient3,
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: { size: 13, weight: '500' },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#2C2F33',
                        bodyColor: '#5A6370',
                        borderColor: 'rgba(182, 227, 212, 0.5)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' مليون ريال';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + 'م';
                            }
                        },
                        grid: { color: 'rgba(182, 227, 212, 0.1)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
});

// ========================================
// SMOOTH SCROLL TO TOP ON NAV CLICK
// ========================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

console.log('%c🏗️ RETAL Asset Manager Premium', 'color: #B6E3D4; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ for Urban Luxury', 'color: #5A6370; font-size: 12px;');
