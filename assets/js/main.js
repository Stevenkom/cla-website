/* ========================================================
   CLEAN MAIN.JS  
   - Loads header/footer dynamically
   - Supports subfolders (team/, programs/, etc.)
   - NEW NAVIGATION ONLY
   ======================================================== */

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
        document.querySelector(element).innerHTML = html;

        // Initialize navbar AFTER header loads
        if (element === "header") initNavbar();
      })
      .catch(err => console.error("Load error:", err));
  };

  loadPart("header", "includes/header.html");
  loadPart("footer", "includes/footer.html");

});

/* ========================================================
   NEW NAVIGATION — CLEAN + MINIMAL
   ======================================================== */
function initNavbar() {

  // HAMBURGER
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  // MOBILE PROGRAM DROPDOWN
  const mobileToggle = document.getElementById("mobile-program-toggle");
  const mobileDropdown = document.querySelector(".mobile-dropdown");

  if (mobileToggle && mobileDropdown) {
    mobileToggle.addEventListener("click", e => {
      e.preventDefault();
      mobileDropdown.classList.toggle("open");
    });
  }

  // CLOSE MOBILE MENU WHEN CLICKING A LINK
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mobileMenu.classList.remove("open");
      }
    });
  }
}
