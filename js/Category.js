document.addEventListener('DOMContentLoaded', function () {

  // Get the selected category from the URL like: ?category=business
  function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
  }

  // Load templates from the server based on the selected category
  async function loadTemplates(category) {
    try {
      const response = await fetch(`http://localhost:3001/templates/${category}`);
      const templates = await response.json();

      const container = document.getElementById('templateContainer');
      container.innerHTML = ''; // Clear any old templates

      templates.forEach(template => {
        const templateItem = document.createElement('div');
        templateItem.classList.add('template-item');

        // Create HTML for each template
        templateItem.innerHTML = `
          <img src="http://localhost:3001${template.image_url}" alt="${template.title}">
          <div class="like-price-container">
            <p>${template.price} €</p>
            <button class="like-btn" data-id="${template.id}">
              <span class="like-icon">&#x2764;</span>
              <span class="like-count">${template.likes}</span>
            </button>
          </div>
        `;

        container.appendChild(templateItem);

        // When the user clicks on the image, show the modal
        const img = templateItem.querySelector('img');

        img.addEventListener('click', () => {
          const modal = document.getElementById('templateModal');
          const modalImg = document.getElementById('modalImage');
          const templatePrice = document.getElementById('templatePrice');  
         

          modal.style.display = 'block'; // Show the modal
          modalImg.src = img.src; // Show the clicked image
          templatePrice.textContent = "Price: " + template.price + " €";
          templatePrice.classList.add("template-price");

           // انتخاب دکمه بعد از باز شدن modal
           const cartBtn = modal.querySelector('.add-to-cart');

           if (cartBtn) {
             cartBtn.setAttribute("data-id", template.id);
             cartBtn.setAttribute("data-name", template.title);
             cartBtn.setAttribute("data-img", img.src);
             cartBtn.setAttribute("data-price", template.price);
           }
         });
       });
     } catch (error) {
       console.error('Error loading templates:', error);
     }
   }
 


  // Get category from URL or use "business" by default
  const categorySelect = document.getElementById('categorySelect');
  const initialCategory = getCategoryFromURL() || 'business';

  // If dropdown exists, set its value
  if (categorySelect) {
    categorySelect.value = initialCategory;
  }

  // Load the templates based on selected category
  loadTemplates(initialCategory);

  // If user changes the category from dropdown
  if (categorySelect) {
    categorySelect.addEventListener('change', function (event) {
      const selectedCategory = event.target.value;
      // Reload page with selected category in the URL
      window.location.href = `Category.html?category=${selectedCategory}`;
    });
  }

  // Close the modal when the user clicks on the X button
  const closeModal = document.querySelector('.close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      document.getElementById('templateModal').style.display = 'none';
    });
  }

  // Add item to cart when user clicks the button inside the modal
  const addToCartBtn = document.querySelector('.add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      const name = this.getAttribute('data-name');
      const img = this.getAttribute('data-img');
      const price = this.getAttribute('data-price'); // Assuming you have a price variable in the modal

      // Get existing cart items or start with an empty array
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      // Add new item to the cart
      cartItems.push({ id, name, img, price });

      // Save back to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      alert("Added to cart!");
    });
  }
});


