(function () {
  const header = document.getElementById("header");
  if (!header) return;

  // Inject header markup
  header.innerHTML = `
    <div id="site-header-outer">
      <div id="site-header-inner">
        <a class="logo-link" href="/">
          <img class="logo-img" src="/assets/images/logo/cla-logo.png" alt="CLA Logo">
        </a>

        <div class="hamburger" id="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>

        <div class="nav-box">
          <nav class="main-nav">
            <ul class="nav-list">
              <li><a class="nav-link" href="/index.html">HOME</a></li>
              <li class="nav-item nav-has-dropdown">
                <a class="nav-link" href="#">ABOUT US</a>
                <div class="dropdown">
                  <a href="/about.html">About US</a>
                  <a href="/about.html#story">Our Story</a>
                  <a href="/team/meet-team.html">Our Team</a>
                  <a href="/team/board-directors.html">Board of Directors</a>
                  <a href="/contact.html">Contact Us</a>
                  <a href="/events.html">Events</a>
                  <a href="https://give.augustineinstitute.org/campaign/747049/donate" target="_blank">Support Us</a>
                </div>
              </li>
              <li class="nav-item nav-has-dropdown">
                <a class="nav-link" href="#">FORMATION PROGRAMS</a>
                <div class="dropdown">
                  <a href="/programs/exploring-catholicism.html">Exploring Catholicism</a>
                  <a href="/programs/bible-in-the-year.html">Bible in a Year</a>
                  <a href="/programs/tsl.html">Theology for Service Leadership</a>
                  <a href="/programs/conferences.html">Conferences</a>
                </div>
              </li>
              <li class="nav-item nav-has-dropdown">
                <a class="nav-link" href="#">OUTREACH PROGRAMS</a>
                <div class="dropdown">
                  <a href="/programs/tribes.html">Tribes Initiative</a>
                  <a href="/programs/rural-evangelism.html">Rural Evangelization</a>
                  <a href="/programs/special-projects.html">Special Projects</a>
                </div>
              </li>
              <li><a class="nav-link" href="/resources.html">RESOURCES</a></li>
            </ul>
          </nav>
          <div class="nav-ctas">
            <a class="btn btn-donate" href="https://give.augustineinstitute.org/campaign/747049/donate" target="_blank">DONATE</a>
          </div>
        </div>
      </div>
    </div>

    <div id="mobile-menu" class="mobile-menu">
      <ul class="nav-list-mobile">
        <li><a href="/index.html">HOME</a></li>
        
        <li class="has-mobile-submenu">
          <a href="#" class="mobile-toggle-trigger">ABOUT US <i class="fa-solid fa-chevron-down"></i></a>
          <div class="mobile-submenu">
            <a href="/about.html">About US</a>
            <a href="/about.html#story">Our Story</a>
            <a href="/team/meet-team.html">Our Team</a>
            <a href="/team/board-directors.html">Board of Directors</a>
            <a href="/contact.html">Contact Us</a>
          </div>
        </li>

        <li class="has-mobile-submenu">
          <a href="#" class="mobile-toggle-trigger">FORMATION PROGRAMS <i class="fa-solid fa-chevron-down"></i></a>
          <div class="mobile-submenu">
            <a href="/programs/bible-in-the-year.html">Bible in a Year</a>
            <a href="/programs/exploring-catholicism.html">Exploring Catholicism</a>
            <a href="/programs/tsl.html">Theology for Service Leadership</a>
            <a href="/programs/conferences.html">Conferences</a>
          </div>
        </li>

        <li class="has-mobile-submenu">
          <a href="#" class="mobile-toggle-trigger">OUTREACH PROGRAMS <i class="fa-solid fa-chevron-down"></i></a>
          <div class="mobile-submenu">
            <a href="/programs/tribes.html">Tribes Initiative</a>
            <a href="/programs/rural-evangelism.html">Rural Evangelization</a>
            <a href="/programs/special-projects.html">Special Projects</a>
          </div>
        </li>

        <li><a href="/events.html">EVENTS</a></li>
        <li><a href="/resources.html">RESOURCES</a></li>
        <li><a href="/contact.html">CONTACT US</a></li>

        <div class="mobile-nav-ctas">
          <a class="btn btn-join" href="/join.html" style="display: block; background: #800000; color: #fff; text-align: center; padding: 12px; margin-bottom: 10px; border-radius: 4px; font-weight: bold; text-decoration: none;">JOIN TRIBE</a>
          <a class="btn btn-donate" href="https://give.augustineinstitute.org/campaign/747049/donate" target="_blank" style="display: block; text-align: center;">DONATE</a>
        </div>
      </ul>
    </div>
  `;

  // --- INTERACTION LOGIC ---
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    // Toggle main mobile menu
    hamburger.addEventListener("click", function() {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.classList.toggle("no-scroll"); 
    });
  }

  // Handle Mobile Submenus (Accordion style)
  document.querySelectorAll(".mobile-toggle-trigger").forEach(trigger => {
    trigger.addEventListener("click", function(e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      
      // Close other submenus first (Accordion effect)
      document.querySelectorAll(".mobile-submenu").forEach(el => {
        if (el !== submenu) el.classList.remove("open");
      });

      submenu.classList.toggle("open");
      this.classList.toggle("active");
    });
  });

  // Auto-activate current menu item links
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .nav-list-mobile a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && (href === currentPath || href === "/" + currentPath)) {
      link.classList.add("active");
    }
  });

})();