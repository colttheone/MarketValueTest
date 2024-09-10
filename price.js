const PRICE_KEY = 'dynamicPrice';
const UPDATE_INTERVAL = 1000; // 1 second
const CHART_UPDATE_INTERVAL = 500; // Update chart every 0.5 seconds

let priceData = [];
let timeData = [];
let priceChart;

// Initialize Chart.js
function initChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 'Price',
                data: priceData,
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.2)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price ($)'
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.1
                }
            }
        }
    });
}

function updatePrice() {
    let price = parseFloat(localStorage.getItem(PRICE_KEY)) || 1.00;
    
    // Generate a random change between -0.01 and +0.01
    let change = (Math.random() * 0.02 * (Math.random() < 0.5 ? -1 : 1)).toFixed(2);
    price = parseFloat(price) + parseFloat(change);
    
    // Ensure the price doesn't drop below 0
    price = Math.max(0.01, price).toFixed(2);
    
    // Update localStorage with the new price
    localStorage.setItem(PRICE_KEY, price);
    
    // Update the price on the page
    document.getElementById("price").innerText = price;
    
    // Update the timestamp
    let now = new Date().toLocaleTimeString();
    document.getElementById("last-updated").innerText = now;
    
    // Update chart data
    if (priceChart) {
        let nowTime = new Date();
        timeData.push(nowTime);
        priceData.push(price);
        
        if (timeData.length > 30) {
            timeData.shift();
            priceData.shift();
        }
        
        priceChart.data.labels = timeData;
        priceChart.data.datasets[0].data = priceData;
        priceChart.update();
    }
}

// Initialize the chart on page load
window.onload = function() {
    initChart();
    updatePrice(); // Initial update to set starting values

    // Update the price and chart every second
    setInterval(updatePrice, UPDATE_INTERVAL);
}
