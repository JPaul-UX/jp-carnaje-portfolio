(function () {
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  var nav = document.querySelector(".nav");
  var year = document.getElementById("y");

  function setOpen(open) {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
  }

  btn.addEventListener("click", function () {
    setOpen(!menu.classList.contains("open"));
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      setOpen(false);
      btn.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!menu.classList.contains("open")) return;
    if (e.target.closest("#menu") || e.target.closest(".menu-btn")) return;
    setOpen(false);
  });

  if (year) year.textContent = String(new Date().getFullYear());

  var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  function mark(id) {
    links.forEach(function (link) {
      var on = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function updateActive() {
    var line = nav.offsetHeight + 80;
    var current = "";
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 48) {
      current = sections[sections.length - 1].id;
    } else {
      sections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) current = section.id;
      });
    }
    mark(current);
  }

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 6);
    updateActive();
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
