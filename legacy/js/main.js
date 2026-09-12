/* =========================================================================
   Andrew Adrian Ansah — portfolio behaviour
   Progressive enhancement only: every section is readable and navigable
   with this file absent or blocked.
   ========================================================================= */

(function () {
  "use strict";

  // Signals to CSS that JS is available, so the mobile nav may collapse.
  // Without it the nav stays open and usable.
  document.documentElement.classList.add("js");

  /* ---------- Mobile navigation ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    var desktop = window.matchMedia("(min-width: 48em)");

    var setNav = function (open) {
      nav.setAttribute("data-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };

    setNav(false);

    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Escape closes the menu and returns focus to the control that opened it.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });

    // Following a link should dismiss the menu on small screens.
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setNav(false);
      }
    });

    // Reset state when crossing the breakpoint, so the desktop nav is never
    // left hidden by a stale toggle.
    desktop.addEventListener("change", function () {
      setNav(false);
    });
  }

  /* ---------- Motion ----------
     Gated twice over: the CSS that hides revealable content only applies when
     html.js-motion is present, and that class is only added when JavaScript is
     running and the visitor has not asked for reduced motion. If either is
     false the page renders complete and static. */

  var calmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var supported = "IntersectionObserver" in window;

  var startMotion = function () {
    document.documentElement.classList.add("js-motion");

    /* Reveal on scroll, with a stagger across grouped children. */
    var solo = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    var groups = Array.prototype.slice.call(document.querySelectorAll("[data-reveal-group]"));
    var targets = solo.slice();

    groups.forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, index) {
        child.setAttribute("data-reveal", "");
        child.style.setProperty("--reveal-delay", index * 90 + "ms");
        targets.push(child);
      });
    });

    // Elements outside a group may request their own delay via data-reveal-delay.
    solo.forEach(function (el) {
      var step = Number(el.getAttribute("data-reveal-delay") || 0);
      if (step) {
        el.style.setProperty("--reveal-delay", step * 90 + "ms");
      }
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      // Fire a little before the element reaches the viewport edge, so the
      // motion finishes as it settles into view rather than after.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });

    /* Scroll progress bar and header state, both read inside rAF so scrolling
       never triggers synchronous layout. */
    var progress = document.querySelector(".scroll-progress");
    var header = document.querySelector(".site-header");
    var ticking = false;

    var onFrame = function () {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

      if (progress) {
        progress.style.setProperty("--progress", Math.min(1, Math.max(0, ratio)).toFixed(4));
      }

      if (header) {
        header.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(onFrame);
        }
      },
      { passive: true }
    );

    onFrame();
  };

  var stopMotion = function () {
    document.documentElement.classList.remove("js-motion");
    // Anything mid-reveal is left visible rather than stranded at opacity 0.
    Array.prototype.forEach.call(document.querySelectorAll("[data-reveal]"), function (el) {
      el.classList.add("is-revealed");
    });
  };

  if (supported && !calmQuery.matches) {
    startMotion();
  }

  // Honour the preference changing mid-session.
  calmQuery.addEventListener("change", function (event) {
    if (event.matches) {
      stopMotion();
    } else if (supported && !document.documentElement.classList.contains("js-motion")) {
      startMotion();
    }
  });

  /* ---------- Footer year ---------- */

  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ---------- Contact form ---------- */

  var form = document.forms["submit-to-google-sheet"];
  var status = document.getElementById("form-status");

  if (form && status) {
    var endpoint =
      "https://script.google.com/macros/s/AKfycbz2C8Ot1Df0LJ4e_GUzr_h-YWlGnl74oCUtBJdex1Q04HFljwuEsR8Bl2UdMqXkwcGX/exec";

    var button = form.querySelector("button[type='submit']");

    var say = function (message, state) {
      status.textContent = message;
      status.setAttribute("data-state", state);
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // novalidate is set on the form so this message is ours, not the browser's.
      if (!form.checkValidity()) {
        say("Please fill in your name, a valid email and a message.", "error");
        var invalid = form.querySelector(":invalid");
        if (invalid) {
          invalid.focus();
        }
        return;
      }

      button.disabled = true;
      say("Sending your message...", "pending");

      fetch(endpoint, { method: "POST", body: new FormData(form) })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
          }
          form.reset();
          say("Thank you, your message was sent. I will reply by email.", "success");
        })
        .catch(function () {
          // Never fail silently: give the visitor a route that still works.
          say("Something went wrong. Please email aaaansah@gmail.com directly.", "error");
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }
})();
