const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');
const userName = localStorage.getItem('userName');
const loginLink = document.querySelector('.login-link');

let scrim = document.querySelector('.nav-scrim');
if (!scrim) {
    scrim = document.createElement('div');
    scrim.className = 'nav-scrim';
    document.body.appendChild(scrim);
}

function toggleMenu() {
    hamburgerBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    navActions.classList.toggle('open');
    scrim.classList.toggle('open');
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
}

scrim.addEventListener('click', toggleMenu);

if (userName && loginLink) {
    loginLink.textContent = userName;
}