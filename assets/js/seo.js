/* Adds deployment-specific metadata only when a verified public site URL is configured. */
(function () {
  var config = window.NIRMOH_SITE || {};
  var rawUrl = (config.siteUrl || "").replace(/\/$/, "");
  var path = document.body.getAttribute("data-seo-path") || "/";
  var indexable = document.body.getAttribute("data-indexable") === "true";
  var validUrl = /^https:\/\/[^\s/$.?#][^\s]*$/i.test(rawUrl);

  function addMeta(attribute, name, content) {
    if (!content || document.head.querySelector("meta[" + attribute + "='" + name + "']")) return;
    var tag = document.createElement("meta"); tag.setAttribute(attribute, name); tag.content = content; document.head.appendChild(tag);
  }
  if (validUrl) {
    var absoluteUrl = rawUrl + path;
    if (indexable && !document.head.querySelector("link[rel='canonical']")) {
      var canonical = document.createElement("link"); canonical.rel = "canonical"; canonical.href = absoluteUrl; document.head.appendChild(canonical);
    }
    addMeta("property", "og:url", absoluteUrl);
    addMeta("property", "og:image", rawUrl + "/assets/img/maharaj.webp");
    addMeta("property", "og:image:alt", "Shramana Muni Shri 108 Nirmoh Sagar Ji Maharaj");
    addMeta("name", "twitter:card", "summary");
    addMeta("name", "twitter:title", document.title);
    addMeta("name", "twitter:description", (document.querySelector("meta[name='description']") || {}).content || "Nirmoh Vatika");
    addMeta("name", "twitter:image", rawUrl + "/assets/img/maharaj.webp");
    if (config.googleSiteVerification) addMeta("name", "google-site-verification", config.googleSiteVerification);

    if (indexable && path === "/" && !document.head.querySelector("script[type='application/ld+json']")) {
      var schema = document.createElement("script"); schema.type = "application/ld+json";
      schema.text = JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "Nirmoh Vatika", url: absoluteUrl,
        description: (document.querySelector("meta[name='description']") || {}).content || ""
      });
      document.head.appendChild(schema);
    }
  }

  /* GA4 is deliberately opt-in. No request is made unless a valid ID is configured and the visitor agrees. */
  var measurementId = config.gaMeasurementId || "";
  if (!/^G-[A-Z0-9]+$/i.test(measurementId) || !validUrl) return;
  function loadAnalytics() {
    if (window.__nirmohAnalyticsLoaded) return;
    window.__nirmohAnalyticsLoaded = true;
    var script = document.createElement("script"); script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId); document.head.appendChild(script);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", measurementId, { anonymize_ip: true });
  }
  try { if (localStorage.getItem("nirmoh-analytics-consent") === "yes") loadAnalytics(); } catch (ignore) {}
  if (window.__nirmohAnalyticsLoaded) return;
  var notice = document.createElement("aside"); notice.className = "analytics-notice"; notice.setAttribute("aria-label", "Analytics consent");
  notice.innerHTML = '<p>This site can use anonymous visit analytics. <a href="privacy.html">Privacy policy</a></p><button class="btn btn-primary" type="button">Accept analytics</button><button class="btn" type="button">Decline</button>';
  notice.querySelector(".btn-primary").onclick = function () { try { localStorage.setItem("nirmoh-analytics-consent", "yes"); } catch (ignore) {} loadAnalytics(); notice.remove(); };
  notice.querySelectorAll(".btn")[1].onclick = function () { try { localStorage.setItem("nirmoh-analytics-consent", "no"); } catch (ignore) {} notice.remove(); };
  document.body.appendChild(notice);
})();
