// gsap.registerPlugin(ScrollTrigger);

// gsap.fromTo('.features',
//     { y: 30, opacity: 0.7 },
//     {
//         y: 0,
//         opacity: 1,
//         ease: 'none',
//         scrollTrigger: {
//             trigger: '.features',
//             start: 'top bottom',
//             end: 'top top',
//             scrub: true
//         }
//     }
// );

// ########
gsap.registerPlugin(ScrollTrigger);

const scrollConfig = {
    trigger: '.features',
    start: 'top bottom',
    end: 'top top',
    scrub: true
};

gsap.fromTo('.features',
    { y: 5, opacity: 0.2 },
    {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: scrollConfig
    }
);

gsap.to('.hero', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: scrollConfig
});