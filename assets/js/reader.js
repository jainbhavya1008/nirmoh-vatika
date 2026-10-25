/* PDF reader (Mozilla PDF.js). The page address says what to open: reader.html?s=books&id=hindi */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var status = $("status"), canvas = $("canvas"), wrap = $("wrap"), pageBox = $("page"), total = $("total"), zoomEl = $("zoom");
  var SECTIONS = { books: ["index.html#books", "Jain Books"], questions: ["index.html#questions", "Questions"], pratiyogita: ["index.html#pratiyogita", "Pratiyogita"] };
  function say(t, err) { status.textContent = t; status.className = "status" + (err ? " error" : ""); }
  function fail(t) { say(t, true); $("toolbar").hidden = true; wrap.hidden = true; }

  var p = new URLSearchParams(location.search), s = p.get("s") || "books", id = p.get("id");
  var sec = SECTIONS[s] || SECTIONS.books;
  $("back").href = sec[0]; $("back").textContent = "← " + sec[1];
  var list = (window.NIRMOH_CONTENT && window.NIRMOH_CONTENT[s]) || [];
  var item = list.filter(function (x) { return x.id === id; })[0];
  if (!item) { $("title").textContent = "Document not found"; return fail("This document is not in the library. Please go back and choose again."); }

  document.title = item.title + " – Nirmoh Vatika";
  $("title").textContent = item.title;
  if (item.description) $("desc").textContent = item.description;
  if (item.download !== false) { var d = $("download"); d.href = item.pdf; d.hidden = false; }
  if (location.protocol === "file:") return fail("To read the PDF, open this website through the preview server (see README). Browsers block PDFs opened directly from a folder.");
  if (!window.pdfjsLib) return fail("The PDF reader could not be loaded. Please refresh the page.");

  pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/vendor/pdfjs/pdf.worker.min.js";
  var pdf = null, page = 1, scale = 1, mode = "width", busy = false, again = false;

  function fit(pg) {
    var vp = pg.getViewport({ scale: 1 }), w = wrap.clientWidth - 24;
    if (mode === "width") return w / vp.width;
    if (mode === "page") return Math.min(w / vp.width, Math.max(window.innerHeight * 0.8, 320) / vp.height);
    return scale;
  }
  function render() {
    if (!pdf) return;
    if (busy) { again = true; return; }
    busy = true;
    pdf.getPage(page).then(function (pg) {
      var sc = fit(pg), vp = pg.getViewport({ scale: sc }), dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(vp.width * dpr); canvas.height = Math.floor(vp.height * dpr);
      canvas.style.width = Math.floor(vp.width) + "px"; canvas.style.height = Math.floor(vp.height) + "px";
      return pg.render({ canvasContext: canvas.getContext("2d"), viewport: vp, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null }).promise.then(function () {
        pageBox.value = page; zoomEl.textContent = Math.round(sc * 100) + "%"; say("");
      });
    }).catch(function () { say("This page could not be displayed.", true); }).then(function () { busy = false; if (again) { again = false; render(); } });
  }
  function go(n) { if (!pdf) return; n = Math.min(Math.max(1, n | 0), pdf.numPages); if (n !== page) { page = n; wrap.scrollTop = 0; } pageBox.value = page; render(); }
  function zoom(f) { if (!pdf) return; pdf.getPage(page).then(function (pg) { scale = Math.min(5, Math.max(0.3, fit(pg) * f)); mode = null; render(); }); }
  $("prev").onclick = function () { go(page - 1); }; $("next").onclick = function () { go(page + 1); };
  $("zin").onclick = function () { zoom(1.2); }; $("zout").onclick = function () { zoom(1 / 1.2); };
  $("fitw").onclick = function () { mode = "width"; render(); }; $("fitp").onclick = function () { mode = "page"; render(); };
  pageBox.onchange = function () { go(parseInt(pageBox.value, 10) || page); };
  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight" || e.key === "PageDown") go(page + 1); else if (e.key === "ArrowLeft" || e.key === "PageUp") go(page - 1);
  });
  var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { if (mode) render(); }, 150); });

  say("Loading…");
  var task = pdfjsLib.getDocument({ url: item.pdf, isEvalSupported: false, disableAutoFetch: true });
  task.onProgress = function (pr) { if (pr.total && !pdf) say("Loading… " + Math.min(99, Math.round(pr.loaded / pr.total * 100)) + "%"); };
  task.promise.then(function (doc) { pdf = doc; total.textContent = doc.numPages; render(); }).catch(function (err) {
    var n = err && err.name, code = err && err.status;
    fail(n === "MissingPDFException" || code === 404 ? "This PDF file could not be found. It may have been moved or renamed."
      : n === "InvalidPDFException" ? "This file is not a valid PDF."
      : "The PDF could not be loaded. Please check your connection and try again.");
  });
})();
