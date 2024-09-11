let tokenPrice = 1.00;  // Initial token price in real dollars
let tokenBalance = 0;   // Number of tokens the user owns
let virtualDollars = 0.00;  // Virtual dollars in the user's account

// HTML elements
const priceDisplay = document.getElementById('price');
const tokenBalanceDisplay = document.getElementById('tokenBalance');
const virtualBalanceDisplay = document.getElementById('virtualBalance');
const buyButton = document.getElementById('buyToken');
const sellButton = document.getElementById('sellToken');
const itemButtons = document.querySelectorAll('.buyItem');

// Function to simulate price change every 500 milliseconds
function updatePrice() {
    let priceChange = (Math.random() - 0.5) * 0.04; // Random price change between -0.02 and +0.02
    tokenPrice = Math.max(0.01, tokenPrice + priceChange); // Ensure price never drops below $0.01
    priceDisplay.innerText = tokenPrice.toFixed(2);
}

// Buy token for real money (1 token = $1 real money)
buyButton.addEventListener('click', function() {
    tokenBalance++;
    tokenBalanceDisplay.innerText = tokenBalance;
    sellButton.disabled = false;  // Enable sell button when user has tokens
});

// Sell token for virtual dollars at current price
sellButton.addEventListener('click', function() {
    if (tokenBalance > 0) {
        virtualDollars += tokenPrice;  // Add token value in virtual dollars
        tokenBalance--;  // Decrease user's token balance
        tokenBalanceDisplay.innerText = tokenBalance;
        virtualBalanceDisplay.innerText = virtualDollars.toFixed(2);

        if (tokenBalance === 0) {
            sellButton.disabled = true;  // Disable sell button if no tokens left
        }
    }
});

// Handle item purchases in the marketplace
itemButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemPrice = parseFloat(this.getAttribute('data-price'));
        if (virtualDollars >= itemPrice) {
            virtualDollars -= itemPrice;
            virtualBalanceDisplay.innerText = virtualDollars.toFixed(2);
            alert('You bought this item!');
        } else {
            alert('Not enough virtual dollars!');
        }
    });
});

// Update the token price every 500 milliseconds
setInterval(updatePrice, 500);
