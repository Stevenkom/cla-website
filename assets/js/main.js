// ====== LOAD HEADER AND FOOTER AUTOMATICALLY ======
document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (selector, file) => {
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then(data => {
        document.querySelector(selector).innerHTML = data;
        if (selector === "header") initializeNavbar(); // run navbar logic after header loads
      })
      .catch(err => console.error(err));
  };

  loadComponent("header", "includes/header.html");
  loadComponent("footer", "includes/footer.html");
});


// ====== NAVBAR FUNCTIONALITY ======
function initializeNavbar() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!menuToggle || !navLinks) return;

  const menuIcon = menuToggle.querySelector('i');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    if (isOpen) {
      menuIcon.classList.replace('fa-bars', 'fa-times');
    } else {
      menuIcon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Dropdown behavior
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
}

// main.js
document.addEventListener("DOMContentLoaded", () => {

  // ===== Dropdown Behavior =====
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });

    window.addEventListener('scroll', () => {
      dropdown.classList.remove('open');
    });
  }

  function openBishopVideo() {
  const modal = document.getElementById("bishopVideoModal");
  const video = document.getElementById("bishopVideo");

  modal.classList.add("active");
  video.currentTime = 0;
  video.play();
}

function closeBishopVideo() {
  const modal = document.getElementById("bishopVideoModal");
  const video = document.getElementById("bishopVideo");

  modal.classList.remove("active");
  video.pause();
}


 // MOBILE MENU HANDLER
(function () {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

  function openMobileMenu() {
    mobileMenu.style.display = 'block';
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    // prevent body scroll when menu open
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.style.display = 'none';
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  // Close when clicking a link in mobile menu
  mobileMenu.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName === 'A') {
      // let normal navigation happen, but close menu first
      closeMobileMenu();
      return;
    }
  });

  // Mobile dropdown toggles (Programs submenu)
  mobileDropdownToggles.forEach(btn => {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      const submenu = this.nextElementSibling;
      if (submenu) {
        if (expanded) submenu.style.display = 'none';
        else submenu.style.display = 'flex';
      }
    });
  });

  // Close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // CLOSE MOBILE MENU when clicking outside (optional)
  document.addEventListener('click', (e) => {
    if (!mobileMenu) return;
    const inside = e.composedPath().includes(mobileMenu) || (mobileToggle && e.composedPath().includes(mobileToggle));
    if (!inside && mobileMenu.style.display === 'block') {
      closeMobileMenu();
    }
  });
})();

});
