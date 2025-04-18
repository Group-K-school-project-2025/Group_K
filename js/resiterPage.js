
//database connection  register page
// Sending user data to the server
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', function(event) {
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
                window.location.href = 'login.html'; // Redirect to login page after successful registration
                //form.reset(); // Reset the form after successful registration
            } else {
                alert('Failed to create user.');
            }
        })
        .catch(error => {
            console.error('Error saving user:', error);
            alert('An error occurred while saving the user.');
        });
    });
});


