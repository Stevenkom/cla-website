(function () {
  const header = document.getElementById("header");
  if (!header) return;

  header.innerHTML = `
    <div id="site-header-outer">
      <div id="site-header-inner">

        <!-- LOGO LEFT -->
        <a class="logo-link" href="/">
          <img class="logo-img" src="/assets/images/logo/cla-logo.png">
        </a>

        <!-- HAMBURGER MOBILE -->
        <div class="hamburger" id="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>

        <!-- WHITE NAV BOX -->
        <div class="nav-box">

          <nav class="main-nav">
            <ul class="nav-list">

              <li class="nav-item"><a class="nav-link" href="/index.html">HOME</a></li>
              <li class="nav-item"><a class="nav-link" href="/about.html">ABOUT US</a></li>

              <li class="nav-item nav-has-dropdown">
                <a class="nav-link" href="#">PROGRAMS</a>
                <div class="dropdown">
                  <a href="/programs/exploring-catholicism.html">Exploring Catholicism</a>
                  <a href="/programs/virtual-hangout.html">Virtual Hangout</a>
                  <a href="/programs/theology-for-service-leadership.html">Theology for Service Leadership</a>
                  <a href="/programs/conferences.html">Conferences</a>
                </div>
              </li>

              <li class="nav-item"><a class="nav-link" href="/events.html">EVENTS</a></li>
              <li class="nav-item"><a class="nav-link" href="/resources.html">RESOURCES</a></li>
              <li class="nav-item"><a class="nav-link" href="/contact.html">CONTACT US</a></li>

            </ul>
          </nav>

          <!-- Buttons Right -->
          <div class="nav-ctas">
            <a class="btn btn-join" href="/join.html">JOIN</a>
            <a class="btn btn-donate" href="/donate.html">DONATE</a>
          </div>

        </div> <!-- end nav-box -->

      </div> <!-- end header-inner -->
    </div> <!-- end header-outer -->


    <!-- MOBILE MENU MUST BE OUTSIDE header-inner -->
    <div id="mobile-menu" class="mobile-menu">
      <ul class="nav-list-mobile">
        <li><a href="/index.html">HOME</a></li>
        <li><a href="/about.html">ABOUT US</a></li>

        <li>
          <a href="#" id="mobile-program-toggle">PROGRAMS ▾</a>
          <div class="mobile-submenu">
            <a href="/programs/exploring-catholicism.html">Exploring Catholicism</a>
            <a href="/programs/virtual-hangout.html">Virtual Hangout</a>
            <a href="/programs/theology-for-service-leadership.html">Theology for Service Leadership</a>
            <a href="/programs/conferences.html">Conferences</a>
          </div>
        </li>

        <li><a href="/events.html">EVENTS</a></li>
        <li><a href="/resources.html">RESOURCES</a></li>
        <li><a href="/contact.html">CONTACT US</a></li>

        <li><a class="btn btn-join" href="/join.html">JOIN</a></li>
        <li><a class="btn btn-donate" href="/donate.html">DONATE</a></li>
      </ul>
    </div>
  `;
  
  document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";

  // Desktop nav
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href.includes(current)) {
      link.classList.add("active");
      link.parentElement.classList.add("active");
    }
  });

  // Mobile nav
  document.querySelectorAll(".nav-list-mobile a").forEach(link => {
    const href = link.getAttribute("href");
    if (href.includes(current)) {
      link.classList.add("active");
    }
  });
});


  // JS INTERACTIONS
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileDropdownToggle = document.getElementById("mobile-program-toggle");
  const mobileSubmenu = document.querySelector(".mobile-submenu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("mobile-open");
  });

  mobileDropdownToggle.addEventListener("click", e => {
    e.preventDefault();
    mobileSubmenu.classList.toggle("open");
  });

})();
