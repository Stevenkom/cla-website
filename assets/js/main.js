/* ========================================================
    CLEAN MAIN.JS  
    - Loads header/footer dynamically
    - Supports subfolders (team/, programs/, etc.)
    - Integrated Hero Reel (Smooth Slide), Impact Slider, and TSL Logic
   ======================================================== */
  
  
   // Cursor Follow Logic
document.addEventListener("mousemove", (e) => {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  
  // The ring follows with a slight delay for a "fluid" feel
  setTimeout(() => {
    ring.style.left = e.clientX + "px";
    ring.style.top = e.clientY + "px";
  }, 50);
});

// Scroll Reveal Logic
function handleReveal() {
  const reveals = document.querySelectorAll(".reveal");
  
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100; // Trigger when 100px is visible
    
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleReveal);
// Run once on load to catch items already in view
window.addEventListener("load", handleReveal);

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------
        DETECT BASE PATH (for subfolders)
       ----------------------------------------------- */
    const depth = window.location.pathname.split("/").length - 2;
    let base = "";
    for (let i = 0; i < depth; i++) base += "../";

    /* -----------------------------------------------
        LOAD HEADER / FOOTER
       ----------------------------------------------- */
    const loadPart = (element, file) => {
        fetch(base + file)
            .then(res => res.text())
            .then(html => {
                const target = document.querySelector(element);
                if (target) {
                    target.innerHTML = html;
                    if (element === "header") initNavbar();
                }
            })
            .catch(err => console.error("Load error:", err));
    };

    loadPart("header", "/includes/header.html");
    loadPart("footer", "/includes/footer.html");

    /* -----------------------------------------------
    HERO REEL LOGIC (Augustine Glide Style)
   ----------------------------------------------- */
const heroTrack = document.getElementById('reelTrack');
const heroDots = document.querySelectorAll('.cla-nav-dot');
const totalHeroSlides = 6; 
let heroCurrentIdx = 0;
let heroTypingTimer;
let heroAutoCycle;

// 1. Typing Effect (Remains the same)
function typeOut(el) {
    if (!el) return;
    const text = el.getAttribute('data-text') || "";
    el.innerText = '';
    let i = 0;
    clearInterval(heroTypingTimer);
    heroTypingTimer = setInterval(() => {
        if (i < text.length) {
            el.append(text.charAt(i));
            i++;
        } else {
            clearInterval(heroTypingTimer);
        }
    }, 80);
}

// 2. The Move Function
window.jumpToSlide = function(idx, isManual = false) {
    if (!heroTrack) return;
    
    if (isManual) clearInterval(heroAutoCycle);

    heroCurrentIdx = idx;
    heroTrack.style.transform = `translateX(-${idx * 100}vw)`;
    
    heroDots.forEach(d => d.classList.remove('active'));
    if(heroDots[idx]) heroDots[idx].classList.add('active');

    const slides = document.querySelectorAll('.cla-reel-slide');
    if(slides[idx]) {
        const h = slides[idx].querySelector('.typing-h');
        typeOut(h);
    }
};

// 3. The "Intro Run" - Glides through slides on refresh
function introRun() {
    // Glide to slide 2 briefly then back to 1 for that "reel" feel
    setTimeout(() => {
        heroTrack.style.transform = `translateX(-20vw)`; // Slight pull
        setTimeout(() => {
            window.jumpToSlide(0); // Snap back to start and type
            startHeroCycle(); // Then start the 6-second timer
        }, 1000);
    }, 500);
}

// 4. Automatic transition every 6 seconds
function startHeroCycle() {
    heroAutoCycle = setInterval(() => {
        heroCurrentIdx = (heroCurrentIdx + 1) % totalHeroSlides;
        window.jumpToSlide(heroCurrentIdx);
    }, 9000); 
}

// Initial trigger on load
window.addEventListener('load', () => {
    if (heroTrack) introRun();
});

    /* -----------------------------------------------
        IMPACT & VH SLIDERS
       ----------------------------------------------- */
    const setupSimpleSlider = (selector, slideCls, dotCls) => {
        document.querySelectorAll(selector).forEach(slider => {
            const slides = slider.querySelectorAll(slideCls);
            const dotsContainer = slider.querySelector(dotCls);
            if (!dotsContainer) return;

            slides.forEach((_, index) => {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                if (index === 0) dot.classList.add("active");
                dot.dataset.slide = index;
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll(".dot");
            dots.forEach(dot => {
                dot.addEventListener("click", () => {
                    const idx = dot.dataset.slide;
                    slides.forEach(s => s.classList.remove("active"));
                    dots.forEach(d => d.classList.remove("active"));
                    slides[idx].classList.add("active");
                    dot.classList.add("active");
                });
            });
        });
    };

    setupSimpleSlider(".impact-slider", ".impact-slide", ".impact-dots");
    setupSimpleSlider(".vh-slider", ".vh-slide", ".vh-dots");


    /* -----------------------------------------------
        TSL & FAQ ACCORDIONS
       ----------------------------------------------- */
    document.querySelectorAll(".course-header").forEach(header => {
        header.addEventListener("click", () => {
            const current = header.parentElement;
            document.querySelectorAll(".course-item").forEach(item => {
                if (item !== current) item.classList.remove("active");
            });
            current.classList.toggle("active");
        });
    });

    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            if (!item) return;
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                const icon = i.querySelector('.faq-icon');
                if(icon) icon.textContent = '+';
            });
            if (!isOpen) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon');
                if(icon) icon.textContent = '–';
            }
        });
    });


    /* -----------------------------------------------
        REVEAL ON SCROLL
       ----------------------------------------------- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

    document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up").forEach((t) => revealObserver.observe(t));


    /* -----------------------------------------------
        CONFERENCE SCHEDULE
       ----------------------------------------------- */
    document.querySelectorAll(".day-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const parent = btn.closest(".schedule-day");
            if (!parent) return;
            document.querySelectorAll(".schedule-day").forEach(day => {
                if (day !== parent) {
                    day.classList.remove("active");
                    day.querySelector(".day-content")?.classList.remove("open");
                }
            });
            parent.classList.toggle("active");
            parent.querySelector(".day-content")?.classList.toggle("open");
        });
    });


    /* -----------------------------------------------
        CONFERENCE HIGHLIGHTS & LIGHTBOX
       ----------------------------------------------- */
    const hTrack = document.querySelector('.highlight-track');
    const hSlides = document.querySelectorAll('.highlight-img');
    if (hTrack && hSlides.length > 0) {
        let hIndex = 0;
        const visible = 3;
        let isPaused = false;

        const updateH = () => {
            const width = hSlides[0].offsetWidth + 24;
            hTrack.style.transform = `translateX(-${hIndex * width}px)`;
        };

        document.querySelector('.slider-btn.next')?.addEventListener('click', () => {
            if (hIndex < hSlides.length - visible) { hIndex++; updateH(); }
        });

        document.querySelector('.slider-btn.prev')?.addEventListener('click', () => {
            if (hIndex > 0) { hIndex--; updateH(); }
        });

        setInterval(() => {
            if (isPaused) return;
            hIndex = (hIndex < hSlides.length - visible) ? hIndex + 1 : 0;
            updateH();
        }, 6000);

        // Lightbox
        const lightbox = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        if (lightbox && lbImg) {
            hSlides.forEach((img, i) => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    isPaused = true;
                    lightbox.style.display = 'flex';
                    lbImg.src = img.src;
                });
            });

            document.querySelector('.lightbox-close')?.addEventListener('click', () => {
                lightbox.style.display = 'none';
                isPaused = false;
            });
        }
    }

}); // END DOMCONTENTLOADED


/* -----------------------------------------------
    NAVBAR INITIALIZATION
   ----------------------------------------------- */
function initNavbar() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
        mobileMenu.addEventListener("click", (e) => {
            if (e.target.tagName === "A") mobileMenu.classList.remove("open");
        });
    }

    const mToggle = document.getElementById("mobile-program-toggle");
    const mDropdown = document.querySelector(".mobile-dropdown");
    if (mToggle && mDropdown) {
        mToggle.addEventListener("click", e => {
            e.preventDefault();
            mDropdown.classList.toggle("open");
        });
    }
}

/* -----------------------------------------------
    PROJECT SHOWCASE LOGIC (Auto-Glide)
   ----------------------------------------------- */
let projectIdx = 0;
let projectInterval;
const totalProjects = 6;

window.jumpToProject = function(idx, isManual = false) {
    const pTrack = document.getElementById('projectTrack');
    const pDots = document.querySelectorAll('.p-dot');
    
    if (pTrack) {
        if (isManual) clearInterval(projectInterval); // Stop auto-play on click
        
        projectIdx = idx;
        pTrack.style.transform = `translateX(-${idx * 100}%)`;
        
        pDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }
};

function startProjectCycle() {
    projectInterval = setInterval(() => {
        projectIdx = (projectIdx + 1) % totalProjects;
        window.jumpToProject(projectIdx);
    }, 10000); // 10 seconds per slide
}

// Start only if section exists
if (document.getElementById('projectTrack')) {
    startProjectCycle();
}

/* -----------------------------------------------
    EVENT REMINDER LOGIC (Google Calendar)
   ----------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const reminderBtns = document.querySelectorAll('.btn-reminder');

    reminderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          // Add this inside the click listener above
            btn.classList.add('clicked');
            btn.textContent = "Added to Calendar";
            e.preventDefault();

            // Extract data from HTML attributes
            const title = encodeURIComponent(btn.getAttribute('data-title'));
            const start = btn.getAttribute('data-start'); // Format: YYYYMMDDTHHMMSSZ
            const location = encodeURIComponent(btn.getAttribute('data-location'));
            const desc = encodeURIComponent(btn.getAttribute('data-desc'));

            // Construct Google Calendar Link
            const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${start}&details=${desc}&location=${location}&sf=true&output=xml`;

            // Open in new tab
            window.open(googleUrl, '_blank');
        });
    });
});

/* -----------------------------------------------
    FEATURED EVENTS LOGIC
   ----------------------------------------------- */
let featuredIdx = 0;
let featuredInterval;
const totalEvents = 5; // Adjust this if you add more

window.moveFeatured = function(idx, isManual = false) {
    const track = document.getElementById('featuredTrack');
    const dots = document.querySelectorAll('.featured-dots .p-dot');
    
    if (track) {
        if (isManual) clearInterval(featuredInterval); // Stop auto-play if user clicks
        
        featuredIdx = idx;
        track.style.transform = `translateX(-${idx * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }
};

function startFeaturedCycle() {
    featuredInterval = setInterval(() => {
        featuredIdx = (featuredIdx + 1) % totalEvents;
        window.moveFeatured(featuredIdx);
    }, 8000); // Moves every 8 seconds
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('featuredTrack')) {
        startFeaturedCycle();
    }
});


  const slides = document.querySelectorAll('.testimonial-slide');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  setInterval(nextSlide, 6000); // auto-slide every 6s
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('cla-resource-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.cla-card');

      cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const description = card.querySelector('p').innerText.toLowerCase();
        
        if (title.includes(term) || description.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const placeholders = document.querySelectorAll('.cla-video-placeholder');
  
  placeholders.forEach(function(item) {
    item.addEventListener('click', function() {
      const youtubeId = this.getAttribute('data-video-id');
      const vimeoId = this.getAttribute('data-vimeo-id');
      let videoSrc = "";

      if (youtubeId) {
        videoSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
      } else if (vimeoId) {
        videoSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      }

      if (videoSrc) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', videoSrc);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '1');
        iframe.style.width = "100%";
        iframe.style.height = this.offsetHeight + "px"; // Matches the height of your image

        this.innerHTML = '';
        this.appendChild(iframe);
      }
    });
  });
});

document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('btn-reminder-small')) {
    const btn = e.target;
    const title = encodeURIComponent(btn.getAttribute('data-event'));
    const dates = btn.getAttribute('data-date');
    const location = encodeURIComponent(btn.getAttribute('data-loc'));
    
    // Construct Google Calendar URL
    const gCalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=Reminder+from+Church+Life+Africa&location=${location}&sf=true&output=xml`;
    
    // Open in new tab
    window.open(gCalUrl, '_blank');
  }
});
