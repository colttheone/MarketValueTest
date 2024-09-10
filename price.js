const PRICE_KEY = 'dynamicPrice';
const UPDATE_INTERVAL = 1000; // 1 second

function updatePrice() {
    // Retrieve the current price from localStorage or initialize if not present
    let price = parseFloat(localStorage.getItem(PRICE_KEY)) || 1.00;
    
    // Generate a random change between -0.01 and +0.01 (i.e., 1 cent to 1 cent)
    let change = (Math.random() * 0.02 * (Math.random() < 0.5 ? -1 : 1)).toFixed(2);
    price = parseFloat(price) + parseFloat(change);
    
    // Ensure the price doesn't drop below 0 or exceed a reasonable range
    price = Math.max(0.01, price).toFixed(2);
    
    // Update localStorage with the new price
    localStorage.setItem(PRICE_KEY, price);
    
    // Update the price on the page
    document.getElementById("price").innerText = price;
    
    // Update the timestamp
    let now = new Date().toLocaleTimeString();
    document.getElementById("last-updated").innerText = now;
}

// Initially display the price and timestamp on page load
updatePrice();

// Update the price every second
setInterval(updatePrice, UPDATE_INTERVAL);

