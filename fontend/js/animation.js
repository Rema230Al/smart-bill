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


//              ######################3
const heroTl = gsap.timeline({
  defaults: { ease: 'power3.out' }
});

heroTl
  .from('.hero-tag', {
    y: -30, opacity: 0, duration: 0.6
  })
  .from('#hero-title', {
    y: -40, opacity: 0, duration: 0.7
  }, '-=0.3')
  .from('.hero-desc', {
    y: -20, opacity: 0, duration: 0.6
  }, '-=0.4')
  .from('.hero-buttons', {
    y: -15, opacity: 0, duration: 0.5
  }, '-=0.3')
  .from('.receipt-card', {
    y: -50, opacity: 0, duration: 0.8
  }, '-=0.6')
  .from('.receipt-step', {
    y: -15, opacity: 0, duration: 0.4, stagger: 0.15
  }, '-=0.4');