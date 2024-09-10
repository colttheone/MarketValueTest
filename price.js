// Initial price
let price = parseFloat(localStorage.getItem('price')) || 1.00;

function updatePrice() {
    // Generate a random change between -0.01 and +0.01 (i.e., 1 cent to 1 cent)
    let change = (Math.random() * 0.02 * (Math.random() < 0.5 ? -1 : 1)).toFixed(2);
    price = parseFloat(price) + parseFloat(change);
    
    // Ensure the price doesn't drop below 0 or exceed a reasonable range
    price = Math.max(0.01, price).toFixed(2);
    
    // Update the price in local storage
    localStorage.setItem('price', price);

    // Update the price on the page
    document.getElementById("price").innerText = price;
    
    // Update the timestamp
    let now = new Date().toLocaleTimeString();
    document.getElementById("last-updated").innerText = now;
}

// Update the price every second (1000 milliseconds)
setInterval(updatePrice, 1000);

// Initially display the price and timestamp on page load
updatePrice();
