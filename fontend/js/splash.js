function buildTileTransition() {
    const html = `
        <div id="tile-grid"></div>
        <div class="splash-content-wrap">
            <div id="printer-line"></div>
            <div id="splash-slip">
                <p class="splash-logo">RECEIPTVAULT</p>
                <div class="splash-divider"></div>
                <p class="splash-status">loading...</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', html);

    const grid = document.getElementById('tile-grid');
    for (let i = 0; i < 84; i++) {
        const tile = document.createElement('div');
        tile.className = 'wipe-tile';
        grid.appendChild(tile);
    }
}

function playTileTransition(destination) {
    buildTileTransition();
    const tiles = document.querySelectorAll('.wipe-tile');

    const tl = gsap.timeline();

    tl.to(tiles, {
        opacity: 1,
        duration: 0.2,
        stagger: { each: 0.003, from: 'random' }
    });

    tl.to('#printer-line', {
        opacity: 1,
        scaleX: 1,
        duration: 0.80,
        ease: 'power2.out'
    }, '-=0.02');

    tl.to('#splash-slip', {
        opacity: 1,
        duration: 0.90,
        ease: 'power2.out'
    }, '-=0.02');

   
    tl.call(() => {
        sessionStorage.setItem('splashReveal', 'true');
        window.location.href = destination;
    });
}

document.querySelectorAll('.nav-links a, .nav-actions a, .signup-text a').forEach(link => {
    link.addEventListener('click', function(event) {
        const destination = this.getAttribute('href');
        if (!destination || destination.startsWith('#')) return;

        event.preventDefault();
        playTileTransition(destination);
    });
});




window.addEventListener('DOMContentLoaded', function() {
    const shouldReveal = sessionStorage.getItem('splashReveal');

    if (shouldReveal) {
        sessionStorage.removeItem('splashReveal');

        buildTileTransition();
        const tiles = document.querySelectorAll('.wipe-tile');

        
        gsap.set(tiles, { opacity: 1 });
        gsap.set('#printer-line', { opacity: 1, scaleX: 1 });
        gsap.set('#splash-slip', { opacity: 1 });

        const tl = gsap.timeline({ delay: 0.15 });   

        tl.to(['#splash-slip', '#printer-line'], {
            opacity: 0,
            duration: 0.15
        });

        tl.to(tiles, {
            opacity: 0,
            duration: 0.2,
            stagger: { each: 0.003, from: 'random' }
        }, '-=0.05');
    }
});