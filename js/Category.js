document.addEventListener('DOMContentLoaded', function () {

  // This function gets the 'category' from the URL like: ?category=business
  function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
  }

  // This function fetches templates from the server based on the selected category
  async function loadTemplates(category) {
    try {
      const response = await fetch(`http://localhost:3001/templates/${category}`);
      const templates = await response.json();

      // Find the container where we want to show templates
      const container = document.getElementById('templateContainer');
      container.innerHTML = ''; // Clear old templates

      // Loop through each template and create HTML elements to display them
      templates.forEach(template => {
        const templateItem = document.createElement('div');
        templateItem.classList.add('template-item');
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

        // Add click event to open modal when user clicks on image
        const img = templateItem.querySelector('img');
        img.addEventListener('click', () => {
          const modal = document.getElementById('templateModal');
          const modalImg = document.getElementById('modalImage');
          const templatePrice = document.getElementById('templatePrice');  

          modal.style.display = 'block'; // show modal
          modalImg.src = img.src; // show clicked image
          templatePrice.textContent = "Price: " + template.price + " €"; // show price
          templatePrice.classList.add("template-price");
        });
      });
    } catch (error) {
      console.error('Error loading templates:', error); // show error in console if something goes wrong
    }
  }

  // Get the category from URL (or use 'business' if it's not found)
  const categorySelect = document.getElementById('categorySelect');
  const initialCategory = getCategoryFromURL() || 'business';

  // If the select box exists, set its value to the category from the URL
  if (categorySelect) {
    categorySelect.value = initialCategory;
  }

  // Load templates for the selected category
  loadTemplates(initialCategory);

  // When user changes the category from the dropdown, go to the new URL
  if (categorySelect) {
    categorySelect.addEventListener('change', function (event) {
      const selectedCategory = event.target.value;

      // This reloads the page with the new category in the URL
      window.location.href = `Category.html?category=${selectedCategory}`;
    });
  }

  // This closes the modal when the 'X' button is clicked
  const closeModal = document.querySelector('.close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      document.getElementById('templateModal').style.display = 'none';
    });
  }
});
