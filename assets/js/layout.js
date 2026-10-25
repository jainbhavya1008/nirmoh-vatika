/* Builds the header (portraits, name, menu) and footer on every page.
   To change the menu, header or footer: edit the text in this file. */
(function () {
  var page = document.body.getAttribute("data-page") || "";
  var onHome = page === "home";
  var to = onHome ? "" : "index.html";                      // on the home page the links are plain "#section" links
  var links = [
    ["home", onHome ? "#top" : "index.html", "Home"],
    ["books", to + "#books", "Jain Books"],
    ["questions", to + "#questions", "Questions"],
    ["pratiyogita", to + "#pratiyogita", "Pratiyogita"],
    ["clock-to-rosary", to + "#clock-to-rosary", "From Clock to Contemplation – From Clock to Rosary"]
  ];
  var current = onHome ? "home" : (page === "rosary" ? "clock-to-rosary" : page);
  var menu = links.map(function (l) {
    return '<li><a href="' + l[1] + '" data-nav="' + l[0] + '"' + (l[0] === current ? ' aria-current="page"' : "") + ">" + l[2] + "</a></li>";
  }).join("");

  var header = `
  <div class="masthead">
    <figure class="guru">
      <img src="assets/img/vishuddh.webp" width="112" height="112" alt="Adhyatmayogi Pattacharya Shri 108 Vishuddh Sagar Ji Gurudev">
      <figcaption>Adhyatmayogi Pattacharya Shri 108 Vishuddh Sagar Ji Gurudev</figcaption>
    </figure>
    <div class="brand"><a href="` + (onHome ? "#top" : "index.html") + `">Nirmoh Vatika</a><p>Jain Dharma · Learning · Pratiyogita</p></div>
    <figure class="guru">
      <img src="assets/img/nirmoh.webp" width="112" height="112" alt="Muni Shri 108 Nirmoh Sagar Ji Gurudev">
      <figcaption>Muni Shri 108 Nirmoh Sagar Ji Gurudev</figcaption>
    </figure>
  </div>`;

  var navHtml = `
    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu">Menu</button>
    <ul id="nav-menu">` + menu + `</ul>`;

  var footer = '<span>Nirmoh Vatika</span><a href="privacy.html">Privacy Policy</a>';

  var h = document.getElementById("site-header"), f = document.getElementById("site-footer");
  if (f) { f.className = "site-footer"; f.innerHTML = footer; }
  if (!h) return;
  h.className = "site-header"; h.innerHTML = header;
  var nav = document.createElement("nav");                    // the menu bar stays at the top while scrolling
  nav.className = "nav"; nav.id = "site-nav"; nav.setAttribute("aria-label", "Main menu"); nav.innerHTML = navHtml;
  h.insertAdjacentElement("afterend", nav);

  var t = document.getElementById("nav-toggle"), m = document.getElementById("nav-menu");
  function closeMenu() { m.classList.remove("open"); t.setAttribute("aria-expanded", "false"); }
  t.addEventListener("click", function () {
    var open = m.classList.toggle("open");
    t.setAttribute("aria-expanded", open ? "true" : "false");
  });
  m.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });

  // keep headings visible below the sticky menu after a link scrolls to them
  function setOffset() { document.documentElement.style.setProperty("--nav-h", nav.offsetHeight + "px"); }
  setOffset(); window.addEventListener("resize", setOffset); window.addEventListener("load", setOffset);

  // on the home page, highlight the menu item for the section being read
  if (onHome) {
    var ids = ["books", "questions", "pratiyogita", "clock-to-rosary"], ticking = false;
    var update = function () {
      ticking = false;
      var line = nav.offsetHeight + 120, active = "home";
      ids.forEach(function (id) { var s = document.getElementById(id); if (s && s.getBoundingClientRect().top <= line) active = id; });
      [].forEach.call(m.querySelectorAll("a"), function (a) {
        if (a.getAttribute("data-nav") === active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
