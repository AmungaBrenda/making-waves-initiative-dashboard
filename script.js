// Chart.js default configuration
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.color = '#333';

// AVA Kenya brand colors
const brandColors = {
    primary: '#0066cc',
    secondary: '#004499',
    accent: '#00cc66',
    warning: '#ff9900',
    success: '#28a745',
    info: '#17a2b8'
};

// Progress Chart (Doughnut)
const progressCtx = document.getElementById('progressChart').getContext('2d');
new Chart(progressCtx, {
    type: 'doughnut',
    data: {
        labels: ['Empowered', 'Remaining Target'],
        datasets: [{
            data: [28, 10972],
            backgroundColor: [brandColors.accent, '#e0e0e0'],
            borderWidth: 0,
            cutout: '70%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        }
    }
});

// Financial Breakdown Chart
const financialCtx = document.getElementById('financialChart').getContext('2d');
new Chart(financialCtx, {
    type: 'pie',
    data: {
        labels: ['Net Profit', 'Electricity', 'Labour', 'Rent'],
        datasets: [{
            data: [1505000, 40000, 30000, 25000],
            backgroundColor: [
                brandColors.primary,
                brandColors.warning,
                brandColors.info,
                brandColors.secondary
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    usePointStyle: true
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        return `${label}: KES ${value.toLocaleString()}`;
                    }
                }
            }
        }
    }
});

// Profit Distribution Chart
const profitCtx = document.getElementById('profitChart').getContext('2d');
new Chart(profitCtx, {
    type: 'doughnut',
    data: {
        labels: ['Member Distribution (50%)', 'Business Reinvestment (30%)', 'Savings (20%)'],
        datasets: [{
            data: [50, 30, 20],
            backgroundColor: [
                brandColors.accent,
                brandColors.primary,
                brandColors.info
            ],
            borderWidth: 0,
            cutout: '60%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    usePointStyle: true
                }
            }
        }
    }
});

// Training Chart
const trainingCtx = document.getElementById('trainingChart').getContext('2d');
new Chart(trainingCtx, {
    type: 'bar',
    data: {
        labels: [
            'Leadership & Group Dynamics',
            'Entrepreneurship',
            'Conflict Management',
            'Fish Handling & Food Safety',
            'Fish Value Addition',
            'Financial Management',
            'Community Procurement',
            'Off-Shore Fishing'
        ],
        datasets: [{
            label: 'Number of Members Trained',
            data: [23, 24, 23, 20, 20, 8, 8, 3],
            backgroundColor: brandColors.primary,
            borderColor: brandColors.secondary,
            borderWidth: 1,
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                }
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.parsed.y} out of 28 members trained`;
                    }
                }
            }
        }
    }
});

// Yearly Targets Chart
const yearlyCtx = document.getElementById('yearlyTargetsChart').getContext('2d');
new Chart(yearlyCtx, {
    type: 'line',
    data: {
        labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
        datasets: [
            {
                label: 'Cumulative Women Empowered',
                data: [28, 2228, 4428, 6628, 8828, 11000],
                borderColor: brandColors.primary,
                backgroundColor: brandColors.primary + '20',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: brandColors.primary,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            },
            {
                label: 'Annual Target',
                data: [28, 2200, 2200, 2200, 2200, 2172],
                borderColor: brandColors.accent,
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                borderWidth: 2,
                pointBackgroundColor: brandColors.accent,
                pointRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} women`;
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    }
});

// Animate progress bar on load
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.progress-fill').style.width = '0.25%';
    }, 500);
});