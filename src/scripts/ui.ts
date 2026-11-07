// Small UI enhancements: header shadow on scroll, gentle entrance for sections below the fold.
const header = document.querySelector('.site-header');
const sticky = document.querySelector('.sticky-cta');
const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
  sticky?.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  // Only sections that start below the first screen – content already visible is never hidden.
  document.querySelectorAll<HTMLElement>('main > section:not(:first-child) .section-head, main > section:not(:first-child) .grid-3, main > section:not(:first-child) .service-grid, main > section:not(:first-child) .steps, main > section:not(:first-child) .pricing-card')
    .forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('reveal'); io.observe(el); }
    });
}
