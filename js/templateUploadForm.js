fetch('http://localhost:3001/templates')
            .then(response => response.json())
            .then(data => {
                const gallery = document.querySelector('.gallery');
                data.forEach(template => {
                    const imgElement = document.createElement('img');
                    imgElement.src = template.image_url; // آدرس تصویر
                    imgElement.alt = template.title;
                    gallery.appendChild(imgElement);
                });
            })
            .catch(error => console.error('Error loading templates:', error));