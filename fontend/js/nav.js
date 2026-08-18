const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');
const userName = localStorage.getItem('userName');
const loginLink = document.querySelector('.login-link');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
        navActions.classList.toggle('open');
    });
}

if (userName && loginLink) {
    loginLink.textContent = userName;
    // loginLink.href = '#';   
}