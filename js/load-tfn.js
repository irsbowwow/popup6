(function () {
  var DISPLAY = "+1 (855) 251-3137";
  var TEL = "+18552513137";

  window.__CB5_TFN_DISPLAY__ = DISPLAY;
  window.__CB5_TFN_TEL__ = TEL;

  ["cb5-tfn-primary", "cb5-tfn-secondary"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = DISPLAY;
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.setAttribute("href", "tel:" + TEL);
  });

  document.querySelectorAll(
    ".red-info-phone, .support-phone-inline, .wsp-call-toast__num, #_pv_toppanic__phone, .win-mini-modal__phone, .win-toast__phone, .win-support-panel__phone, .win-br-notif__phone, .mac-call-text .num, .support-number"
  ).forEach(function (el) {
    if (el.id === "cb5-tfn-primary" || el.id === "cb5-tfn-secondary") return;
    var text = el.textContent || "";
    if (/\+?1[\s(.-]*000[\s).-]*000[\s.-]*0000/i.test(text) || /000 000-0000/.test(text)) {
      el.textContent = text.replace(/\+?1[\s(.-]*000[\s).-]*000[\s.-]*0000/gi, DISPLAY);
    }
  });
})();
