const splashHTML = `
    <div id="splash-screen" style="display:none;">
        <div class="splash-slip-wrap">
            <div id="splash-slip" class="splash-slip">
                <p class="splash-logo">RECEIPTVAULT</p>
                <div class="splash-divider"></div>
                <p class="splash-status" id="splash-status">loading...</p>
            </div>
        </div>
        <div id="printer-line" class="printer-line"></div>
    </div>
`;
document.body.insertAdjacentHTML('afterbegin', splashHTML);


document.querySelectorAll('.nav-links a,.nav-actions a, .signup-text a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const destination = this.getAttribute('href');

        const splash = document.getElementById('splash-screen');
        const line = document.getElementById('printer-line');
        const slip = document.getElementById('splash-slip');

        splash.style.display = 'flex';
        splash.style.backgroundColor = '#F3F3F3';

        requestAnimationFrame(() => {
            splash.style.backgroundColor = 'rgb(50,38,32)';
        });

        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(-50%) scaleX(1)';
        }, 400);

        setTimeout(() => {
            slip.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease-out';
            slip.style.opacity = '1';
            slip.style.transform = 'translateY(-10px)';
        }, 1000);

        setTimeout(() => {
            window.location.href = destination;   
        }, 2000);
    });
});