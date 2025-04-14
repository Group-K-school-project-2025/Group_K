document.addEventListener('DOMContentLoaded', function () {
  
  async function loadTemplates(category) {
    try {
      const response = await fetch(`http://localhost:3001/templates/${category}`);
      const templates = await response.json();

      const container = document.getElementById('templateContainer');
      container.innerHTML = '';

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

        
        const img = templateItem.querySelector('img');
        img.addEventListener('click', () => {
          const modal = document.getElementById('templateModal');
          const modalImg = document.getElementById('modalImage');
          const templatePrice = document.getElementById('templatePrice');  

          modal.style.display = 'block';
          modalImg.src = img.src;
          templatePrice.textContent = "Price: " + template.price + " €";
          templatePrice.classList.add("template-price");
          
 
        });
      });
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  }

  // close modal event listener
  const closeModal = document.querySelector('.close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      document.getElementById('templateModal').style.display = 'none';
    });
  }

  // load initial templates
  loadTemplates('business');

  // category select event listener
  const categorySelect = document.getElementById('categorySelect');
  if (categorySelect) {
    categorySelect.addEventListener('change', function (event) {
      const selectedCategory = event.target.value;
      loadTemplates(selectedCategory);
    });
  }
});
