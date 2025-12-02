/* =========================================
   SIMPLE SHOPPING CART LOGIC
   ========================================= */

// 1. Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('chaiCart')) || [];

// 2. Add Item to Cart
function addToCart(name, price) {
    // Check if item exists
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    
    updateCart();
    showToast(`${name} added to cart!`);
}

// 3. Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 4. Update Cart Storage & UI
function updateCart() {
    localStorage.setItem('chaiCart', JSON.stringify(cart));
    updateCartCount();
    if(document.getElementById('cart-table-body')) renderCheckout();
}

// 5. Update Header Badge (Optional Visual)
function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    // You can add a badge to your header if you want, for now we just log it
    console.log("Cart Items:", count);
}

// 6. Render Checkout Table
function renderCheckout() {
    const tbody = document.getElementById('cart-table-body');
    const totalEl = document.getElementById('cart-total');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>x ${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})" class="btn-remove">×</button></td>
            </tr>
        `;
    });

    totalEl.innerText = `$${total.toFixed(2)}`;
}

// 7. Simple Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Load cart on page load
updateCart();