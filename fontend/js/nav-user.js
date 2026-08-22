// const userName = localStorage.getItem('userName');
const loginLink = document.querySelector('.login-link');


if (userName && loginLink) {
    loginLink.textContent = userName;
    // loginLink.href = '#';   
}