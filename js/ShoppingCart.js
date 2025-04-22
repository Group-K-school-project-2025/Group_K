document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId');
    const cartItemsFromLocal = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
  
    let total = 0;
  
    // اگر کاربر لاگین کرده باشد
    if (userId) {
      try {
        const response = await fetch(`http://localhost:3001/cart/${userId}`);
        const items = await response.json();
  
        if (!Array.isArray(items) || items.length === 0) {
          container.innerHTML = emptyCartHTML();
          cartTotal.textContent = "€0.00";
          checkoutBtn.disabled = true;
          return;
        }
  
        items.forEach(item => {
          if (typeof item.price === 'number' && typeof item.quantity === 'number') {
            total += item.price * item.quantity;
  
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
              <img src="http://localhost:3001/${item.image_url}" alt="${item.title}" />
              <div>
                <h5>${item.title}</h5>
                <p>€${item.price.toFixed(2)} x ${item.quantity}</p>
              </div>
            `;
            container.appendChild(itemDiv);
          } else {
            console.error('Item missing price or quantity:', item);
          }
        });
  
        cartTotal.textContent = `€${total.toFixed(2)}`;
      } catch (err) {
        console.error("Error loading cart from database:", err);
      }
    } 
    // اگر کاربر وارد نشده باشد، از localStorage استفاده کن
    else {
      if (cartItemsFromLocal.length === 0) {
        container.innerHTML = emptyCartHTML();
        cartTotal.textContent = "€0.00";
        checkoutBtn.disabled = true;
        return;
      }
  
      cartItemsFromLocal.forEach(item => {
        if (typeof item.price === 'number') {
          total += item.price;
  
          const itemDiv = document.createElement('div');
          itemDiv.className = 'cart-item';
          itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <h5>${item.name}</h5>
              <p>€${item.price.toFixed(2)}</p>
            </div>
          `;
          container.appendChild(itemDiv);
        } else {
          console.error('Item missing price:', item);
        }
      });
  
      cartTotal.textContent = `€${total.toFixed(2)}`;
    }
  
    // تابع ساخت پیام سبد خرید خالی
    function emptyCartHTML() {
      return `
        <div class="empty-cart-message">
          <img src="images/WhiteFigure1.png" alt="Empty Cart" class="mb-3" style="width: 150px;">
          <p>Sorry, Your cart is currently empty<br></p>
          <a href="Category.html" class="go-shopping">Browse Templates</a>
        </div>
      `;
    }
  });
  