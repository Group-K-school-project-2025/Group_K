////////// first page /////////////
// when the page is loaded, the first image is shown and the rest are hidden

document.addEventListener("DOMContentLoaded", function () {
    const openGalleryBtn = document.getElementById("openGallery");
    if (openGalleryBtn) {
        openGalleryBtn.addEventListener("click", function () {
            let gallery = document.getElementById("galleryBox");

            // Check if the gallery is already open or closed
            if (gallery.classList.contains("show")) {
                gallery.classList.remove("show"); // if it was open, close it
            } else {
                gallery.classList.add("show"); // if it was closed, open it
            }
        });
    }

    const indicators = document.querySelectorAll('.indicator');
    const images = document.querySelectorAll('.gallery-images img');

    if (indicators.length && images.length) {
        // when clicking on the indicators(circles), show the corresponding image
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function () {
                // disable all indicators
                indicators.forEach(ind => ind.classList.remove('active'));
                // activate the clicked indicator
                indicator.classList.add('active');

                // hide all images
                images.forEach(img => img.style.display = 'none');
                // show the corresponding image
                images[index].style.display = 'block';
            });
        });

        // initialize the first indicator and image
        indicators[0].classList.add('active');
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });
    }

    ///slider horizontal
    let slides = document.querySelectorAll(".clickable-slide");

    slides.forEach((slide) => {
        slide.addEventListener("click", function () {
            let url = this.getAttribute("data-url"); // retrieve the URL from the data attribute
            if (url) {
                window.location.href = url; // change the window location to the URL
            }
        });
    });

    //database connection register page
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Getting values from form inputs
            const first_name = document.getElementById('firstName').value;
            const last_name = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirm_password = document.getElementById('confirm-password').value;

            // Check if password and confirm password match
            if (password !== confirm_password) {
                alert('Passwords do not match.');
                return;
            }

            // Check if all fields are filled
            if (!first_name || !last_name || !email || !mobile || !username || !password) {
                return alert('Please fill in all fields.');
            }

            // Sending data to the server
            fetch('http://localhost:3001/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    mobile,
                    username,
                    password
                })
            })
                .then(response => {
                    console.log('Server response:', response); // Log response for debugging
                    if (!response.ok) {
                        throw new Error('Server responded with an error');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data); // Log data for debugging
                    if (data.message === 'User created successfully') {
                        alert('User registered successfully!');
                        form.reset(); // Reset the form after successful registration
                    } else {
                        alert('Failed to create user.');
                    }
                })
                .catch(error => {
                    console.error('Error saving user:', error);
                    alert('An error occurred while saving the user.');
                });
        });
    }
});
