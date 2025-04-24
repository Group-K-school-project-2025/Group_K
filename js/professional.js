const form = document.getElementById('request-form');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // ensure the form doesn't submit the default way

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    deliveryDate: form.deliveryDate.value,
    category: form.category.value,
    purpose: form.purpose.value
  };

  fetch('http://localhost:3001/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Form submitted:", data);

    alert("Our experts will contact you soon!");
    const goToHomepage = confirm("Would you like to go back to the homepage?");
    if (goToHomepage) {
      window.location.href = '/index.html'; // Redirect to the homepage
    }
  
    
  })
  .catch(error => {
    console.error("Error submitting form:", error);
  });
});

