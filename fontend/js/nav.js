const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
        navActions.classList.toggle('open');
    });
}