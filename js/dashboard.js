
  const username = localStorage.getItem('username');
// Check if the user is logged in by checking local storage

  const welcomeText = document.getElementById('welcomeText');
  if (username) {
    welcomeText.textContent = `Welcome, ${username}!`;
  } else {
    welcomeText.textContent = 'Welcome, Guest!';
  }

  function showDetails(id) {
    alert("Template " + id + " clicked!");
    // یا کاری که می‌خوای انجام بدی
  }
  