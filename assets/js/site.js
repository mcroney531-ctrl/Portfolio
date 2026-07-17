/* ==========================================================================
   site.js — small, optional progressive enhancement.
   The site is fully functional with JavaScript disabled. This only:
     1. Fills in the current year in the footer.
     2. Powers the capability filter on the Work page (when projects exist).
   ========================================================================== */
(function () {
  'use strict';

  // ---- 1. Footer year -----------------------------------------------------
  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- 2. Work page capability filter -------------------------------------
  // Filters project cards by their data-capabilities across all format groups.
  // Empty format groups are hidden while a filter is active so visitors don't
  // see empty section headings.
  var filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length) return;

  var cards = document.querySelectorAll('.project-card');
  var groups = document.querySelectorAll('.format-group');
  var status = document.querySelector('[data-filter-status]');

  function applyFilter(value) {
    var shown = 0;

    cards.forEach(function (card) {
      var caps = (card.getAttribute('data-capabilities') || '').split(',');
      var match = value === 'all' || caps.indexOf(value) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });

    // Hide format groups that have no visible cards under the active filter.
    groups.forEach(function (group) {
      var visible = group.querySelectorAll('.project-card:not([hidden])').length;
      group.hidden = visible === 0;
    });

    filterButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-filter') === value));
    });

    if (status) {
      status.textContent = value === 'all'
        ? shown + ' projects shown.'
        : shown + ' project' + (shown === 1 ? '' : 's') + ' matching this capability.';
    }
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });
})();

/* ==========================================================================
   Off-canvas sidebar (secondary navigation).
   Progressive enhancement: the toggle ships hidden and this reveals it, so
   users without JS never see a button that does nothing. Accessible: manages
   aria-expanded/aria-hidden, `inert` (so closed links aren't focusable),
   Escape to close, overlay click to close, focus moved in and returned out,
   and body scroll lock while open.
   ========================================================================== */
(function () {
  'use strict';

  var toggle  = document.querySelector('.menu-toggle');
  var sidebar = document.getElementById('site-sidebar');
  if (!toggle || !sidebar) return;

  var overlay  = document.querySelector('[data-sidebar-overlay]');
  var closeBtn = sidebar.querySelector('[data-sidebar-close]');

  // Enable the mechanism now that JS is running.
  sidebar.setAttribute('inert', '');
  toggle.hidden = false;

  function onKeydown(e) {
    if (e.key === 'Escape') closeSidebar();
  }

  function openSidebar() {
    sidebar.classList.add('is-open');
    sidebar.removeAttribute('inert');
    sidebar.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    if (overlay) {
      overlay.hidden = false;
      // next frame so the opacity transition runs
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    }
    document.body.style.overflow = 'hidden';
    (closeBtn || sidebar).focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    sidebar.setAttribute('inert', '');
    sidebar.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    if (overlay) {
      overlay.classList.remove('is-open');
      overlay.hidden = true; // remove from the page so it never traps clicks
    }
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('is-open')) closeSidebar();
    else openSidebar();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay)  overlay.addEventListener('click', closeSidebar);
})();
