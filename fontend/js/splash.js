const splash = document.getElementById('splash-screen');
const line = document.getElementById('printer-line');
const slip = document.getElementById('splash-slip');

requestAnimationFrame(() => {
    splash.style.backgroundColor = 'rgb(50,38,32)';   
});

setTimeout(() => {
    line.style.opacity = '1';
    line.style.transform = 'scaleX(1)';   
}, 800);

setTimeout(() => {
    slip.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease-out';
    slip.style.opacity = '1';
    slip.style.transform = 'translateY(-10px)';   
}, 2400);