// Define the emptyCartHTML function first
function emptyCartHTML() {
  return `
    <div class="empty-cart-message">
      <img src="images/WhiteFigure1.png" alt="Empty Cart" class="mb-3" style="width: 150px;">
      <p>Sorry, Your cart is currently empty<br></p>
      <a href="Category.html" class="go-shopping">Browse Templates</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async function () {
  const userId = localStorage.getItem('userId');
  const cartItemsFromLocal = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  let total = 0;

  // If the user is logged in
  if (userId) {
    try {
      const response = await fetch(`http://localhost:3001/cart/${userId}`);
      const items = await response.json();

      if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = emptyCartHTML(); // Call the emptyCartHTML function
        cartTotal.textContent = "€0.00";
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
      }

      items.forEach((item, index) => {
        if (typeof item.price === 'number' && typeof item.quantity === 'number') {
          total += item.price * item.quantity;

          const itemDiv = document.createElement('div');
          itemDiv.className = 'cart-item d-flex justify-content-between align-items-center mb-3';
          itemDiv.innerHTML = `
            <img src="http://localhost:3001/${item.image_url}" alt="${item.title}" />
            <div>
              <h5>${item.title}</h5>
              <p>€${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeProduct(${index})">✖</button>
          `;
          container.appendChild(itemDiv);
        }
      });

      cartTotal.textContent = `€${total.toFixed(2)}`;
    } catch (err) {
      console.error("Error loading cart from database:", err);
    }
  } else {
    // If the user is not logged in, use localStorage cart items
    if (cartItemsFromLocal.length === 0) {
      container.innerHTML = emptyCartHTML();
      cartTotal.textContent = "€0.00";
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    cartItemsFromLocal.forEach((item, index) => {
      const price = parseFloat(item.price);

      if (!isNaN(price)) {
        total += price;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item d-flex justify-content-between align-items-center mb-3';
        itemDiv.innerHTML = `
          <img src="${item.img}" alt="${item.name}" />
          <div>
            <h5>${item.name}</h5>
            <p>€${price.toFixed(2)}</p>
          </div>
          <button class="btn btn-danger btn-sm" onclick="removeProduct(${index})">✖</button>
        `;
        container.appendChild(itemDiv);
      }
    });

    cartTotal.textContent = `€${total.toFixed(2)}`;
  }
});

// Function to remove product from the cart
function removeProduct(index) {
  // Update localStorage after removing the item from the cart
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1); // Remove product from array
  localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage

  // After removing the product, update the cart display
  displayCart();
}

// Function to update the total price
function updateTotal() {
  let total = 0;
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.forEach(item => {
    total += parseFloat(item.price);
  });

  document.getElementById('cart-total').innerText = `€${total.toFixed(2)}`;
}

// Display the cart when the page loads
function displayCart() {
  const container = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  let total = 0;

  container.innerHTML = ''; // Clear current cart items

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartItems.length === 0) {
    container.innerHTML = emptyCartHTML();
    cartTotal.textContent = "€0.00";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  cartItems.forEach((item, index) => {
    const price = parseFloat(item.price);

    if (!isNaN(price)) {
      total += price;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item d-flex justify-content-between align-items-center mb-3';
      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div>
          <h5>${item.name}</h5>
          <p>€${price.toFixed(2)}</p>
        </div>
        <button class="btn btn-danger btn-sm" onclick="removeProduct(${index})">✖</button>
      `;
      container.appendChild(itemDiv);
    }
  });

  cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Sending cart data to the server
async function sendCartToServer(userId) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  try {
    for (let item of cartItems) {
      const response = await fetch(`http://localhost:3001/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: item.id, // Or any ID you have
          quantity: item.quantity
        })
      });

      const result = await response.json();
      console.log(result);
    }
  } catch (err) {
    console.error('Error sending cart items to server:', err);
  }
}
