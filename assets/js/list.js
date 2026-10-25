/* Shows the books / documents listed in content-data.js, with a search box.
   Works for every <div data-list data-section="books|questions|pratiyogita"> on the page. */
(function () {
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }

  function init(box) {
    var section = box.getAttribute("data-section");
    var limit = parseInt(box.getAttribute("data-limit") || "0", 10);
    var emptyText = box.getAttribute("data-empty") || "No documents available yet.";
    var out = box.querySelector(".results, #results"), search = box.querySelector("input[type=search]");
    var searchWrap = box.querySelector(".search");
    if (!out) return;
    function message(text, error) { out.innerHTML = ""; out.appendChild(el("p", "message" + (error ? " error" : ""), text)); }

    var all = window.NIRMOH_CONTENT && window.NIRMOH_CONTENT[section];
    if (!Array.isArray(all)) { message("The list could not be loaded. Please refresh the page.", true); return; }
    var items = limit ? all.slice(0, limit) : all;
    if (!items.length && searchWrap && box.hasAttribute("data-hide-search-empty")) searchWrap.hidden = true;

    function card(it) {
      var li = el("li", "card book");
      var cover = el("div", "cover");
      if (it.cover) { var img = el("img"); img.src = it.cover; img.loading = "lazy"; img.decoding = "async"; img.alt = "Cover of " + it.title;
        img.onerror = function () { cover.textContent = "॥"; }; cover.appendChild(img); } else { cover.textContent = "॥"; }
      li.appendChild(cover);
      li.appendChild(el("h3", "", it.title));
      var meta = [it.edition, it.language, it.date, it.pages ? it.pages + " pages" : "", it.size].filter(Boolean).join(" · ");
      if (meta) li.appendChild(el("p", "meta", meta));
      if (it.description) li.appendChild(el("p", "", it.description));
      var actions = el("div", "actions");
      var read = el("a", "btn btn-primary", "Read Online");
      read.href = "reader.html?s=" + encodeURIComponent(section) + "&id=" + encodeURIComponent(it.id);
      actions.appendChild(read);
      if (it.download !== false && it.pdf) { var d = el("a", "btn", "Download PDF"); d.href = it.pdf; d.setAttribute("download", ""); actions.appendChild(d); }
      li.appendChild(actions);
      return li;
    }

    function render() {
      var q = search ? search.value.trim().toLowerCase() : "";
      var shown = items.filter(function (it) {
        return !q || [it.title, it.edition, it.language, it.category, it.description].join(" ").toLowerCase().indexOf(q) !== -1;
      });
      if (!items.length) return message(emptyText);
      if (!shown.length) return message("Nothing matches “" + search.value.trim() + "”. Try another word.");
      out.innerHTML = "";
      var ul = el("ul", "grid"); shown.forEach(function (it) { ul.appendChild(card(it)); }); out.appendChild(ul);
    }
    if (search) search.addEventListener("input", render);
    render();
  }

  [].forEach.call(document.querySelectorAll("#list, [data-list]"), init);
})();
