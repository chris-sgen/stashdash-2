(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var $ = function (s, n) { return (n || doc).querySelector(s); };
  var $$ = function (s, n) { return Array.prototype.slice.call((n || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  var sheet = $('link[rel="stylesheet"][href*="assets/css/site."]');
  var SITE = sheet ? sheet.href.split('assets/css/site.')[0] : new URL('.', doc.baseURI).href;
  var fromRoot = function (p) { return SITE + String(p).split('/').filter(Boolean).join('/'); };
  window.__sdRoot = fromRoot;
  function trap(box, e) {
    if (e.key !== 'Tab') return;
    var items = $$(FOCUSABLE, box).filter(function (el) { return el.offsetParent !== null || el === doc.activeElement; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function setInert(on, except) {
    $$('body > *').forEach(function (el) { if (el === except || el.tagName === 'SCRIPT') return; if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
  }
  (function () {
    var gate = $('[data-gate]');
    if (!gate) return;
    var KEY = 'stashdash2_preview_age';
    var passed = false;
    try { passed = localStorage.getItem(KEY) === '1'; } catch (e) {   }
    if (passed) { root.classList.add('age-ok'); return; }
    var box = $('#gate-agree', gate), yes = $('#gate-yes', gate), no = $('#gate-no', gate), err = $('#gate-error', gate);
    setInert(true, gate);
    (box || yes).focus({ preventScroll: true });
    gate.addEventListener('keydown', function (e) { trap(gate, e); });
    if (box) box.addEventListener('change', function () { err.hidden = true; box.removeAttribute('aria-invalid'); });
    yes.addEventListener('click', function (e) {
      e.preventDefault();
      if (box && !box.checked) { err.hidden = false; box.setAttribute('aria-invalid', 'true'); box.focus(); return; }
      try { localStorage.setItem(KEY, '1'); } catch (e2) {   }
      root.classList.add('age-ok');
      setInert(false);
      var main = $('#main');
      if (main) main.focus({ preventScroll: true });
    });
    yes.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); yes.click(); } });
    no.addEventListener('click', function (e) { e.preventDefault(); window.location.replace('about:blank'); });
  })();
  var drawer = $('[data-drawer]'), drawerOpener = null;
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    root.classList.remove('has-drawer');
    doc.body.style.overflow = '';
    $$('[data-drawer-open]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (drawerOpener) drawerOpener.focus();
  }
  function showPanel(id) {
    $$('[data-drawer-panel]', drawer).forEach(function (p) { var on = p.id === id; p.hidden = !on; p.classList.toggle('is-open', on); });
    var first = $('#' + id + ' ' + FOCUSABLE.split(',')[0] + ', #' + id + ' button', drawer);
    if (first) first.focus();
  }
  if (drawer) {
    $$('[data-drawer-open]').forEach(function (b) {
      b.setAttribute('role', 'button');
      b.addEventListener('click', function (e) {
        e.preventDefault();
        drawerOpener = b;
        drawer.hidden = false;
        b.setAttribute('aria-expanded', 'true');
        doc.body.style.overflow = 'hidden';
        showPanel('drawer-root');
        var c = $('[data-drawer-close]', drawer);
        if (c) c.focus();
      });
    });
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer || e.target.closest('[data-drawer-close]')) { closeDrawer(); return; }
      var push = e.target.closest('[data-drawer-push]');
      if (push) { showPanel(push.getAttribute('data-drawer-push')); return; }
      if (e.target.closest('[data-drawer-back]')) showPanel('drawer-root');
    });
    drawer.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); else trap(drawer, e); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1280) closeDrawer(); });
  }
  (function () {
    var nav = $('.nav');
    if (!nav) return;
    var items = $$('.nav__item.has-panel', nav);
    var isOpen = function (it) { return !it.classList.contains('is-shut') && (it.classList.contains('is-open') || it.matches(':hover')); };
    function sync() { items.forEach(function (it) { var b = $('[data-panel]', it); if (b) b.setAttribute('aria-expanded', String(isOpen(it))); }); }
    function closeAll(except) { items.forEach(function (it) { if (it !== except) it.classList.remove('is-open'); }); sync(); }
    items.forEach(function (it) {
      var btn = $('[data-panel]', it);
      it.addEventListener('mouseenter', sync);
      it.addEventListener('mouseleave', function () { it.classList.remove('is-open'); it.classList.remove('is-shut'); sync(); });
      if (btn) btn.addEventListener('click', function () {
        var on = !isOpen(it);
        closeAll(it);
        it.classList.toggle('is-open', on);
        it.classList.toggle('is-shut', !on);
        sync();
      });
      it.addEventListener('focusout', function () { setTimeout(function () { if (!it.contains(doc.activeElement)) { it.classList.remove('is-open'); sync(); } }, 0); });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = items.filter(isOpen)[0];
      if (!open) return;
      var inside = open.contains(doc.activeElement);
      open.classList.remove('is-open');
      open.classList.add('is-shut');
      sync();
      var btn = $('[data-panel]', open);
      if (inside && btn) btn.focus();
    });
    doc.addEventListener('click', function (e) { if (!e.target.closest('.nav__item.has-panel')) closeAll(); });
  })();
  (function () {
    var h = $('[data-header]');
    if (!h) return;
    var on = function () { h.classList.toggle('is-stuck', window.scrollY > 24); };
    window.addEventListener('scroll', on, { passive: true });
    on();
  })();
  (function () {
    var heroes = $$('.hero--home, .hero');
    requestAnimationFrame(function () { heroes.forEach(function (h) { h.classList.add('is-ready'); }); doc.body.classList.add('is-ready'); });
    var els = $$('.rv');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  })();
  $$('[data-map]').forEach(function (box) {
    var show = $('[data-map-show]', box);
    if (!show) return;
    show.setAttribute('role', 'button');
    show.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      var frame = doc.createElement('iframe');
      frame.src = box.getAttribute('data-map');
      frame.title = box.getAttribute('data-map-title') || '';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer';
      frame.setAttribute('allowfullscreen', '');
      frame.className = 'mapbox__frame';
      box.classList.add('is-map');
      box.appendChild(frame);
      frame.focus();
    });
  });
  (function () {
    var loops = $$('[data-loop]');
    if (!loops.length || reduce) return;
    var conn = navigator.connection || {};
    if (conn.saveData) return;
    var start = function (box) {
      if (box._started) return;
      box._started = true;
      var small = box.getAttribute('data-loop-small');
      var src = small && window.innerWidth < 800 ? small : box.getAttribute('data-loop');
      var v = doc.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = 'auto';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true'); v.tabIndex = -1;
      v.disablePictureInPicture = true;
      v.addEventListener('playing', function () { box.classList.add('is-playing'); }, { once: true });
      var tg = doc.createElement('button');
      tg.type = 'button'; tg.className = 'loop__toggle';
      var setTg = function (paused) { tg.setAttribute('aria-label', paused ? box.getAttribute('data-play') : box.getAttribute('data-pause')); tg.setAttribute('aria-pressed', paused ? 'true' : 'false'); tg.innerHTML = paused ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>'; };
      setTg(false);
      tg.addEventListener('click', function () { if (v.paused) { box._held = false; var p2 = v.play(); if (p2 && p2.catch) p2.catch(function () {}); setTg(false); } else { box._held = true; v.pause(); setTg(true); } });
      box.appendChild(tg);
      v.src = fromRoot(src);
      box.appendChild(v);
      var p = v.play();
      if (p && p.catch) p.catch(function () {   });
    };
    if (!('IntersectionObserver' in window)) { loops.forEach(start); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target.querySelector('video');
        if (en.isIntersecting) { if (v) { if (!en.target._held) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } } else start(en.target); }
        else if (v) v.pause();
      });
    }, { rootMargin: '120px' });
    loops.forEach(function (l) { io.observe(l); });
  })();
  var under = function (im) { return im && im.tagName === 'IMG' && im.closest('.seal') && im.closest('.seal').querySelector('.seal__under'); };
  document.addEventListener('error', function (e) { if (under(e.target)) e.target.hidden = true; }, true);
  Array.prototype.forEach.call(document.querySelectorAll('.seal img'), function (im) { if (under(im) && im.loading !== 'lazy' && im.complete && !im.naturalWidth) im.hidden = true; });
})();
