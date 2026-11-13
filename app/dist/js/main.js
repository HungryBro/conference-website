(function () {
  "use strict";
  var doc = document;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile menu */
  var toggle = doc.querySelector(".menu-toggle");
  var nav = doc.getElementById("site-nav");
  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
    doc.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });

  /* Dropdowns: click/tap + keyboard (hover handled by CSS on desktop) */
  var dropButtons = doc.querySelectorAll(".nav-item > button.nav-link");
  function closeDrops(except) {
    dropButtons.forEach(function (b) {
      if (b === except) return;
      b.parentElement.classList.remove("open");
      b.setAttribute("aria-expanded", "false");
    });
  }
  dropButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var item = btn.parentElement;
      var open = !item.classList.contains("open");
      closeDrops(btn);
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  doc.addEventListener("click", function () { closeDrops(); });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrops(); setMenu(false); }
  });

  /* Tabs (program) */
  doc.querySelectorAll("[role=tablist]").forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll("[role=tab]"));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = doc.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* Header shadow + back-to-top */
  var toTop = doc.querySelector(".to-top");
  function onScroll() {
    var y = window.scrollY;
    doc.body.classList.toggle("scrolled", y > 36);
    if (toTop) toTop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* Section nav highlight (home) */
  var links = doc.querySelectorAll(".section-nav a");
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
        var a = map[en.target.id];
        if (a) {
          a.classList.add("active");
          a.setAttribute("aria-current", "true");
          // Scroll only the pill bar sideways. scrollIntoView() would also start a
          // (smooth) page scroll and cancel the user's own scrolling → visible jerk.
          var bar = a.closest("ul");
          if (bar && bar.scrollWidth > bar.clientWidth) {
            var left = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2;
            bar.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = doc.getElementById(id); if (s) spy.observe(s); });
  }
  links.forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* Reveal on scroll */
  var reveals = doc.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
