/* ============================================================
   CHURCH LIFE AFRICA — DYNAMIC ENHANCEMENTS
   Drop this file as: assets/js/dynamic.js
   Then add in your HTML just before </body>:
     <script src="./assets/js/dynamic.js"></script>
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. INJECT STYLES ─────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `

    /* ── SCROLL PROGRESS BAR ── */
    #cla-scroll-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #7B1C1C, #C9A84C, #7B1C1C);
      background-size: 200% 100%;
      z-index: 99999;
      transition: width 0.1s linear;
      animation: barShimmer 3s linear infinite;
    }
    @keyframes barShimmer {
      to { background-position: -200% 0; }
    }

    /* ── PROTECT SLIDER & AUTOTYPING — never hidden by our JS ── */
    .cla-reel-section,
    .cla-reel-viewport,
    .cla-reel-track,
    .cla-reel-slide,
    .cla-reel-img,
    .cla-reel-content,
    .cla-reel-content *,
    .typing-h,
    [data-text],
    .cla-reel-dots,
    .cla-nav-dot {
      opacity: 1 !important;
      transform: none !important;
      visibility: visible !important;
      animation-play-state: running !important;
    }

    /* ── STAT STRIP ── */
    #cla-stat-strip {
      width: 100%;
      background: #4A0E0E;
      padding: 0;
      overflow: hidden;
      position: relative;
      z-index: 900;
    }

    .cla-stat-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    .cla-stat-item {
      padding: 14px 20px;
      text-align: center;
      border-right: 1px solid rgba(201,168,76,0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .cla-stat-item:last-child { border-right: none; }
    .cla-stat-item.cla-visible { opacity: 1; transform: translateY(0); }

    .cla-stat-num {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.45rem;
      font-weight: 700;
      color: #C9A84C;
      line-height: 1;
      letter-spacing: -0.01em;
    }

    .cla-stat-lbl {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.6);
      line-height: 1.3;
    }

    @media (max-width: 640px) {
      .cla-stat-inner { grid-template-columns: repeat(2, 1fr); }
      .cla-stat-item:nth-child(2) { border-right: none; }
      .cla-stat-item:nth-child(3) { border-top: 1px solid rgba(201,168,76,0.2); }
      .cla-stat-item:nth-child(4) { border-top: 1px solid rgba(201,168,76,0.2); }
    }

    /* ── BACK TO TOP ── */
    #cla-top-btn {
      position: fixed;
      bottom: 2rem; right: 2rem;
      width: 42px; height: 42px;
      background: #7B1C1C;
      color: #C9A84C;
      border: 1px solid rgba(201,168,76,0.4);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9000;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.35s, transform 0.35s, background 0.2s;
      box-shadow: 0 4px 20px rgba(74,14,14,0.35);
      font-size: 14px;
    }
    #cla-top-btn.cla-visible { opacity: 1; transform: translateY(0); }
    #cla-top-btn:hover { background: #4A0E0E; }

    /* ── SCROLL REVEAL ── */
    .cla-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94),
                  transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }

    .cla-reveal.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .cla-reveal-left {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94),
                  transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .cla-reveal-left.cla-visible { opacity: 1; transform: translateX(0); }

    .cla-reveal-right {
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94),
                  transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .cla-reveal-right.cla-visible { opacity: 1; transform: translateX(0); }

    /* ── MISSION BODY PARAGRAPHS ── */
    .about-mission .mission-body p,
    .about-mission .mission-body h2 {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .about-mission .mission-body p.cla-visible,
    .about-mission .mission-body h2.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── EDITORIAL SPLIT ROWS ── */
    .editorial-row-split .editorial-text-major {
      opacity: 0;
      transform: translateX(-24px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .editorial-row-split .editorial-image-minor {
      opacity: 0;
      transform: translateX(24px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .editorial-row-split.reverse .editorial-text-major {
      transform: translateX(24px);
    }
    .editorial-row-split.reverse .editorial-image-minor {
      transform: translateX(-24px);
    }
    .editorial-row-split .editorial-text-major.cla-visible,
    .editorial-row-split .editorial-image-minor.cla-visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* ── IMAGE HOVER ── */
    .image-frame-editorial {
      overflow: hidden;
      position: relative;
    }
    .image-frame-editorial img {
      transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
      display: block;
      width: 100%;
    }
    .image-frame-editorial:hover img {
      transform: scale(1.045);
    }
    .image-frame-editorial::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px solid rgba(201,168,76,0);
      transition: border-color 0.4s ease;
      pointer-events: none;
    }
    .image-frame-editorial:hover::after {
      border-color: rgba(201,168,76,0.6);
    }

    /* ── VIDEO FRAMES ── */
    .video-frame-ai {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .video-frame-ai.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── MEDIA CARDS ── */
    .media-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease,
                  box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .media-card.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .media-card:hover {
      box-shadow: 0 8px 28px rgba(74,14,14,0.13);
      border-left-color: #C9A84C !important;
    }

    /* ── VIDEO COLUMNS ── */
    .video-column {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .video-column.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── FAQ ITEMS ── */
    /* accordion-item reveal is handled by original page CSS — we don't override it */

    /* ── ACCORDION CONTENT SMOOTH ── */
    /* NOTE: We only enhance the icon transition here.
       The max-height animation is handled by the original stylesheet
       to avoid conflicts with existing accordion behaviour. */
    .accordion-header .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94),
                  color 0.25s ease;
    }
    .accordion-item.active .accordion-header .icon {
      transform: rotate(45deg);
    }

    /* ── SPONSOR MARQUEE PAUSE ON HOVER ── */
    .sponsor-marquee:hover .marquee-track {
      animation-play-state: paused !important;
    }
    .marquee-track img {
      transition: filter 0.3s ease, transform 0.3s ease;
    }
    .marquee-track img:hover {
      filter: grayscale(0) opacity(1) !important;
      transform: scale(1.05);
    }

    /* ── CTA BUTTON PULSE ── */
    .cta-btn {
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease, background 0.2s ease !important;
    }
    .cta-btn::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 0; height: 0;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
      opacity: 0;
    }
    .cta-btn:hover::after {
      width: 300px; height: 300px; opacity: 1;
    }
    .cta-btn:hover {
      transform: translateY(-2px) !important;
    }

    /* ── READ MORE LINK ANIMATION ── */
    .read-more-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: gap 0.25s ease, color 0.25s ease;
    }
    .read-more-link:hover { gap: 10px; }

    /* ── SECTION LABELS ── */
    .mission-label,
    .editorial-label,
    .about-label {
      opacity: 0;
      transform: translateX(-12px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      display: inline-block;
    }
    .mission-label.cla-visible,
    .editorial-label.cla-visible,
    .about-label.cla-visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* ── FAQ CATEGORY LABELS ── */
    .faq-category-label {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .faq-category-label.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── TRIPLE CONTENT ── */
    .triple-content h2,
    .triple-content p,
    .triple-content h3,
    .triple-content a {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .triple-content h2.cla-visible,
    .triple-content p.cla-visible,
    .triple-content h3.cla-visible,
    .triple-content a.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── ENDORSEMENT HEADER ── */
    .endorsement-header h2,
    .endorsement-header .maroon-divider-center,
    .playfair-title-black,
    .mission-title {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .endorsement-header h2.cla-visible,
    .endorsement-header .maroon-divider-center.cla-visible,
    .playfair-title-black.cla-visible,
    .mission-title.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .faq-header-box h2,
    .faq-header-box .maroon-divider-center {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .faq-header-box h2.cla-visible,
    .faq-header-box .maroon-divider-center.cla-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── HERO FOOTER BANNER ── */
    .hero-footer {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .hero-footer.cla-visible { opacity: 1; transform: translateY(0); }

    /* ── SECTION TITLES ── */
    .section-title {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .section-title.cla-visible { opacity: 1; transform: translateY(0); }

    /* ── PROGRAM CARDS ── */
    .program-card {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease,
                  box-shadow 0.3s ease, transform 0.3s ease;
    }
    .program-card.cla-visible { opacity: 1; transform: translateY(0); }
    .program-card:hover {
      box-shadow: 0 12px 36px rgba(74,14,14,0.15) !important;
      transform: translateY(-4px) !important;
    }
    .program-card .program-header {
      transition: transform 0.6s ease;
      transform-origin: center;
    }
    .program-card:hover .program-header {
      transform: scale(1.04);
    }
    .program-card .learn-more {
      transition: background 0.25s ease, letter-spacing 0.25s ease !important;
    }
    .program-card .learn-more:hover {
      background: #4A0E0E !important;
      letter-spacing: 0.04em;
    }

    /* ── AMEN SECTION ── */
    .amen-section {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s ease, transform 0.75s ease;
    }
    .amen-section.cla-visible { opacity: 1; transform: translateY(0); }

    .amen-image img {
      transition: transform 0.6s ease, filter 0.4s ease;
      filter: drop-shadow(0 8px 24px rgba(0,0,0,0.12));
    }
    .amen-image:hover img {
      transform: translateY(-6px) scale(1.02);
      filter: drop-shadow(0 16px 32px rgba(0,0,0,0.18));
    }

    .app-buttons a img {
      transition: transform 0.25s ease, opacity 0.25s ease;
    }
    .app-buttons a:hover img {
      transform: translateY(-3px);
      opacity: 0.9;
    }

    /* ── FORMED SPLIT SECTION ── */
    .formed-split-section {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s ease, transform 0.75s ease;
    }
    .formed-split-section.cla-visible { opacity: 1; transform: translateY(0); }

    .formed-image img {
      transition: transform 0.6s ease;
    }
    .formed-image:hover img { transform: scale(1.03); }

    .label-gold {
      opacity: 0;
      transform: translateX(-12px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      display: inline-block;
    }
    .label-gold.cla-visible { opacity: 1; transform: translateX(0); }

    .maroon-divider {
      opacity: 0;
      transform: scaleX(0);
      transform-origin: left;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .maroon-divider.cla-visible { opacity: 1; transform: scaleX(1); }

    .faith-cta-flex a {
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    }
    .faith-cta-flex a:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(74,14,14,0.2);
    }

    /* ── TSL VIDEO SECTION ── */
    #tsl-launch-section {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    #tsl-launch-section.cla-visible { opacity: 1; transform: translateY(0); }

    /* ── IMPACT / PROJECT SLIDES ── */
    .project-showcase {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s ease, transform 0.75s ease;
    }
    .project-showcase.cla-visible { opacity: 1; transform: translateY(0); }

    .project-slide .project-image-side img {
      transition: transform 0.6s ease;
    }
    .project-slide .project-image-side:hover img { transform: scale(1.04); }

    .project-btn {
      transition: background 0.25s ease, transform 0.25s ease, letter-spacing 0.25s ease !important;
    }
    .project-btn:hover {
      transform: translateY(-2px) !important;
      letter-spacing: 0.04em;
    }

    /* ── EVENTS SECTION ── */
    .events-editorial {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s ease, transform 0.75s ease;
    }
    .events-editorial.cla-visible { opacity: 1; transform: translateY(0); }

    .event-card {
      opacity: 0;
      transform: translateX(-20px);
      transition: opacity 0.6s ease, transform 0.6s ease,
                  box-shadow 0.3s ease;
    }
    .event-card.cla-visible { opacity: 1; transform: translateX(0); }
    .event-card:hover {
      box-shadow: 0 6px 24px rgba(74,14,14,0.12);
    }

    .btn-reminder-small {
      transition: background 0.25s ease, transform 0.25s ease !important;
    }
    .btn-reminder-small:hover {
      transform: translateY(-2px) !important;
    }

    /* ── REEL SLIDE CONTENT ── */
    /* IMPORTANT: Never hide reel content or typing elements.
       The slider JS controls visibility. We must not set opacity:0
       on anything inside the reel or it breaks the autotyping. */
    .cla-reel-section,
    .cla-reel-slide,
    .cla-reel-content,
    .cla-reel-content h2,
    .cla-reel-content p,
    .typing-h,
    [data-text] {
      opacity: 1 !important;
      transform: none !important;
      visibility: visible !important;
    }
  `;
  document.head.appendChild(style);

  /* ── 2. SCROLL PROGRESS BAR ───────────────────────────── */
  const bar = document.createElement('div');
  bar.id = 'cla-scroll-bar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }, { passive: true });

  /* ── 3. STAT STRIP (insert after hero section) ── */
  const stats = [
    { num: 94,   suffix: '%',  label: 'Sunday Mass Attendance' },
    { num: 35,   suffix: 'M+', label: 'Nigerian Catholics' },
    { num: 200,  suffix: '+',  label: 'Conference Participants' },
    { num: 2022, suffix: '',   label: 'Year Founded' },
  ];

  const strip = document.createElement('div');
  strip.id = 'cla-stat-strip';

  const inner = document.createElement('div');
  inner.className = 'cla-stat-inner';

  stats.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'cla-stat-item';
    item.style.transitionDelay = (i * 0.1) + 's';

    const numEl = document.createElement('div');
    numEl.className = 'cla-stat-num';
    numEl.dataset.target = s.num;
    numEl.dataset.suffix = s.suffix;
    numEl.textContent = '0' + s.suffix;

    const lbl = document.createElement('div');
    lbl.className = 'cla-stat-lbl';
    lbl.textContent = s.label;

    item.appendChild(numEl);
    item.appendChild(lbl);
    inner.appendChild(item);
  });

  strip.appendChild(inner);

  // Insert after .about-hero (about page) or after .hero-footer (homepage)
  function insertStrip() {
    const aboutHero = document.querySelector('.about-hero');
    const heroFooter = document.querySelector('.hero-footer');
    const reelSection = document.querySelector('.cla-reel-section');

    if (aboutHero && aboutHero.parentNode) {
      // About page: after hero section
      aboutHero.parentNode.insertBefore(strip, aboutHero.nextSibling);
    } else if (heroFooter && heroFooter.parentNode) {
      // Homepage: after the hero footer banner
      heroFooter.parentNode.insertBefore(strip, heroFooter.nextSibling);
    } else if (reelSection && reelSection.parentNode) {
      // Homepage fallback: after reel
      reelSection.parentNode.insertBefore(strip, reelSection.nextSibling);
    } else {
      document.body.appendChild(strip);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertStrip);
  } else {
    insertStrip();
  }

  // Trigger counters when strip scrolls into view
  let countersRun = false;
  const stripObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersRun) {
        countersRun = true;
        strip.querySelectorAll('.cla-stat-item').forEach(el => el.classList.add('cla-visible'));
        strip.querySelectorAll('[data-target]').forEach((el, i) => {
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix;
          const isYear = target > 999;
          const duration = isYear ? 2000 : 1600;
          setTimeout(() => animateCount(el, target, suffix, duration), i * 180);
        });
        stripObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  stripObserver.observe(strip);

  function animateCount(el, target, suffix, duration) {
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── 4. BACK TO TOP ───────────────────────────────────── */
  const topBtn = document.createElement('button');
  topBtn.id = 'cla-top-btn';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  document.body.appendChild(topBtn);

  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('cla-visible', window.scrollY > 500);
  }, { passive: true });

  /* ── 5. INTERSECTION OBSERVER — SCROLL REVEALS ──────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cla-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  function observe(selector, delayFn) {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (delayFn) el.style.transitionDelay = delayFn(i) + 's';
      io.observe(el);
    });
  }

  // Wait for DOM ready
  function init() {
    // Section labels
    observe('.mission-label');
    observe('.faq-category-label', i => i * 0.05);

    // Headings
    observe('.mission-title');
    observe('.playfair-title-black');
    observe('.endorsement-header h2');
    observe('.endorsement-header .maroon-divider-center');
    observe('.faq-header-box h2');
    observe('.faq-header-box .maroon-divider-center');

    // Mission body paragraphs — staggered
    document.querySelectorAll('.about-mission .mission-body p, .about-mission .mission-body h2').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.09) + 's';
      io.observe(el);
    });

    // Editorial splits — text and image sides
    document.querySelectorAll('.editorial-row-split .editorial-text-major').forEach(el => io.observe(el));
    document.querySelectorAll('.editorial-row-split .editorial-image-minor').forEach(el => io.observe(el));

    // Video frames (endorsement)
    observe('.video-frame-ai');

    // Story section labels
    document.querySelectorAll('#story .editorial-label, #story .playfair-title-black').forEach(el => io.observe(el));

    // Media cards — staggered
    observe('.media-card', i => i * 0.1);

    // Video columns — staggered
    observe('.video-column', i => i * 0.12);

    // FAQ items — NOT observed (original CSS/JS handles their visibility)

    // Triple content children — staggered
    document.querySelectorAll('.triple-content h2, .triple-content p, .triple-content h3, .triple-content a').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.1) + 's';
      io.observe(el);
    });

    // ── HOMEPAGE-SPECIFIC ──────────────────────────────────
    // NOTE: .cla-reel-section, .cla-reel-slide, .cla-reel-content,
    // .typing-h and [data-text] are intentionally excluded from
    // the reveal observer — the slider JS manages these directly.

    // Hero footer banner
    observe('.hero-footer');

    // Section titles
    observe('.section-title');

    // TSL video section
    observe('#tsl-launch-section');

    // Program cards — staggered
    observe('.program-card', i => i * 0.1);

    // Amen section
    observe('.amen-section');
    observe('.formed-split-section');

    // FORMED labels and dividers
    observe('.label-gold');
    observe('.maroon-divider');

    // Impact / project showcase
    observe('.project-showcase');

    // Events section and individual cards — staggered
    observe('.events-editorial');
    observe('.event-card', i => i * 0.12);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── 6. ACCORDION — no override, original handler is preserved ── */
  /* We intentionally do NOT re-bind accordion clicks here.
     The original handler in the HTML script block runs fine.
     We only ensure .accordion-item elements are visible after reveal. */


  /* ══════════════════════════════════════════════════════════
     7. CUSTOM CURSOR
     A small maroon dot + larger gold ring that follow the mouse.
     The ring lags behind with a lerp for a fluid feel.
  ══════════════════════════════════════════════════════════ */
  (function setupCursor() {
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
      /* Hide default cursor on everything EXCEPT typing/input elements */
      html, body,
      div, section, main, header, footer, nav, article, aside,
      h1, h2, h3, h4, h5, h6, p, span, li, ul, ol,
      img, figure, figcaption, blockquote,
      .program-card, .media-card, .event-card, .project-slide,
      .triple-img, .triple-content, .sponsors, .sponsor-marquee,
      .cla-reel-section, .cla-reel-slide, .cla-reel-img,
      .amen-section, .formed-split-section, .editorial-row-split,
      .accordion-item, .accordion-header, .faq-category-label,
      .endorsement-header, .video-frame-ai, .video-column,
      .about-hero, .about-mission, .mission-vision-final,
      .hero-footer, .events-editorial, .project-showcase,
      .stat-strip, #cla-stat-strip,
      a, button, label, select { cursor: none !important; }

      /* CRITICAL: never hide cursor on text inputs or typing elements */
      input, textarea, [contenteditable],
      input[type="text"], input[type="email"], input[type="search"],
      .typing-h, .typed-cursor, [class*="typing"],
      .cla-reel-content h2, .cla-reel-content p { cursor: auto !important; }
      #cla-cursor-dot {
        position: fixed; pointer-events: none; z-index: 999999;
        width: 8px; height: 8px; border-radius: 50%;
        background: #7B1C1C;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease, background 0.3s ease, width 0.3s ease, height 0.3s ease;
        mix-blend-mode: multiply;
      }
      #cla-cursor-ring {
        position: fixed; pointer-events: none; z-index: 999998;
        width: 36px; height: 36px; border-radius: 50%;
        border: 1.5px solid rgba(201,168,76,0.7);
        transform: translate(-50%, -50%);
        transition: border-color 0.3s ease, width 0.35s ease, height 0.35s ease, opacity 0.3s ease;
      }
      body:has(a:hover) #cla-cursor-dot,
      body:has(button:hover) #cla-cursor-dot { width: 14px; height: 14px; background: #C9A84C; }
      body:has(a:hover) #cla-cursor-ring,
      body:has(button:hover) #cla-cursor-ring { width: 52px; height: 52px; border-color: rgba(123,28,28,0.5); }
      #cla-cursor-dot.clicking { transform: translate(-50%,-50%) scale(0.6); }
      #cla-cursor-ring.clicking { transform: translate(-50%,-50%) scale(0.8); }
    `;
    document.head.appendChild(cursorStyle);

    const dot  = document.createElement('div'); dot.id  = 'cla-cursor-dot';
    const ring = document.createElement('div'); ring.id = 'cla-cursor-ring';
    document.body.append(dot, ring);

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mousedown', () => { dot.classList.add('clicking'); ring.classList.add('clicking'); });
    document.addEventListener('mouseup',   () => { dot.classList.remove('clicking'); ring.classList.remove('clicking'); });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

    function tickCursor() {
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(tickCursor);
    }
    tickCursor();
  })();

  /* ══════════════════════════════════════════════════════════
     8. MAGNETIC BUTTONS
     CTA buttons and nav links softly pull toward the cursor
     when it hovers nearby (within 80px).
  ══════════════════════════════════════════════════════════ */
  (function setupMagnetic() {
    function applyMagnetic(el, strength) {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        el.style.transition = 'transform 0.2s ease';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.cta-btn, .btn-maroon-solid, .btn-outline-black, .project-btn, .learn-more').forEach(el => applyMagnetic(el, 0.28));
      document.querySelectorAll('.btn-reminder-small').forEach(el => applyMagnetic(el, 0.2));
    });
  })();

  /* ══════════════════════════════════════════════════════════
     9. GOLD PARTICLE TRAIL
     Tiny gold cross/dot particles burst from the cursor as
     you move — fades out gracefully.
  ══════════════════════════════════════════════════════════ */
  (function setupTrail() {
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
      .cla-trail {
        position: fixed; pointer-events: none; z-index: 999990;
        width: 5px; height: 5px; border-radius: 50%;
        background: #C9A84C;
        transform: translate(-50%,-50%) scale(1);
        animation: cla-trail-fade 0.7s ease forwards;
      }
      @keyframes cla-trail-fade {
        0%   { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
        100% { opacity: 0;   transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.2); }
      }
    `;
    document.head.appendChild(trailStyle);

    let lastX = 0, lastY = 0, frameCount = 0;
    document.addEventListener('mousemove', e => {
      frameCount++;
      if (frameCount % 4 !== 0) return; // spawn every 4th frame
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 8) return;
      lastX = e.clientX; lastY = e.clientY;

      const p = document.createElement('div');
      p.className = 'cla-trail';
      p.style.left = e.clientX + 'px';
      p.style.top  = e.clientY + 'px';
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 14;
      p.style.setProperty('--tx', Math.cos(angle) * radius + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * radius + 'px');
      // Alternate between gold dot and tiny cross shape
      if (Math.random() > 0.6) {
        p.style.borderRadius = '0';
        p.style.width  = '3px';
        p.style.height = '8px';
        p.style.background = 'rgba(123,28,28,0.6)';
      }
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 750);
    });
  })();

  /* ══════════════════════════════════════════════════════════
     10. CARD TILT (3-D perspective shift on mousemove)
     Program cards and media cards tilt toward the cursor.
  ══════════════════════════════════════════════════════════ */
  (function setupTilt() {
    const tiltStyle = document.createElement('style');
    tiltStyle.textContent = `
      .program-card, .media-card, .event-card {
        transform-style: preserve-3d;
        will-change: transform;
      }
      .program-card .card-content,
      .media-card .media-info {
        transform: translateZ(0px);
        transition: transform 0.4s ease;
      }
      .program-card:hover .card-content { transform: translateZ(12px); }
    `;
    document.head.appendChild(tiltStyle);

    function addTilt(el, maxDeg) {
      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        const xPct = (e.clientX - r.left) / r.width  - 0.5;
        const yPct = (e.clientY - r.top)  / r.height - 0.5;
        const rotY =  xPct * maxDeg;
        const rotX = -yPct * maxDeg;
        el.style.transform    = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        el.style.transition   = 'transform 0.1s ease';
        el.style.boxShadow    = `${-rotY * 1.5}px ${rotX * 1.5}px 28px rgba(74,14,14,0.18)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform  = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
        el.style.boxShadow  = '';
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.program-card').forEach(el => addTilt(el, 6));
      document.querySelectorAll('.media-card').forEach(el => addTilt(el, 5));
      document.querySelectorAll('.event-card').forEach(el => addTilt(el, 4));
    });
  })();

  /* ══════════════════════════════════════════════════════════
     11. SECTION ENTRANCE SHIMMER
     A one-shot gold shimmer sweeps across section headings
     the first time they enter the viewport.
  ══════════════════════════════════════════════════════════ */
  (function setupShimmer() {
    const shimStyle = document.createElement('style');
    shimStyle.textContent = `
      .cla-shimmer-wrap { position: relative; display: inline-block; overflow: hidden; }
      .cla-shimmer-wrap::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.35) 50%, transparent 70%);
        transform: skewX(-20deg);
        animation: none;
      }
      .cla-shimmer-wrap.cla-shimmer-run::after {
        animation: claShimmerSweep 0.9s ease forwards;
      }
      @keyframes claShimmerSweep {
        from { left: -100%; }
        to   { left: 160%;  }
      }
    `;
    document.head.appendChild(shimStyle);

    const shimIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('cla-shimmer-wrap');
        setTimeout(() => el.classList.add('cla-shimmer-run'), 400);
        shimIO.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.section-title, .playfair-title-black, .mission-title, .cla-hero-title, .editorial-heading').forEach(el => shimIO.observe(el));
    });
  })();

  /* ══════════════════════════════════════════════════════════
     12. PARALLAX HERO IMAGES
     The reel slide backgrounds and triple-section images
     move at a slower rate than the scroll for depth.
  ══════════════════════════════════════════════════════════ */
  (function setupParallax() {
    function tickParallax() {
      const sy = window.scrollY;
      document.querySelectorAll('.cla-reel-img').forEach(el => {
        el.style.backgroundPositionY = `calc(50% + ${sy * 0.22}px)`;
      });
      document.querySelectorAll('.triple-img img').forEach(el => {
        const r = el.closest('.triple-img').getBoundingClientRect();
        const rel = (r.top + r.height / 2) - window.innerHeight / 2;
        el.style.transform = `scale(1.08) translateY(${rel * 0.06}px)`;
      });
      requestAnimationFrame(tickParallax);
    }
    tickParallax();
  })();

  /* ══════════════════════════════════════════════════════════
     13. CLICK RIPPLE ON BUTTONS
     A radial ripple pulse radiates from the exact click point.
  ══════════════════════════════════════════════════════════ */
  (function setupRipple() {
    const ripStyle = document.createElement('style');
    ripStyle.textContent = `
      .cla-ripple-host { position: relative; overflow: hidden; }
      .cla-ripple-wave {
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.35);
        transform: scale(0); pointer-events: none;
        animation: claRippleGo 0.55s ease-out forwards;
      }
      @keyframes claRippleGo {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(ripStyle);

    document.addEventListener('click', e => {
      const btn = e.target.closest('button, .btn, .cta-btn, .learn-more, .project-btn, .btn-maroon-solid, .btn-outline-black, .btn-reminder-small');
      if (!btn) return;
      btn.classList.add('cla-ripple-host');
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const wave = document.createElement('span');
      wave.className = 'cla-ripple-wave';
      wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
      btn.appendChild(wave);
      setTimeout(() => wave.remove(), 600);
    });
  })();

})();