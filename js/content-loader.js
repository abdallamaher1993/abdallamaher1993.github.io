/* ============================================================
   content-loader.js — Loads content.json (edited via the admin
   dashboard) and overlays it on top of the built-in defaults.

   - i18n: content.json.i18n[lang] keys override js/i18n.js values
   - site:  social links, email, prices, project images/links,
            webhook URL — applied to tagged DOM nodes.

   The admin dashboard preview sends a draft payload via
   postMessage {type:'ADMIN_DRAFT', payload:...} which is applied
   the same way without touching committed files.
   ============================================================ */

(function () {
  'use strict';

  function overlayI18n(i18n) {
    if (typeof I18N === 'undefined' || !i18n || typeof i18n !== 'object') return;
    Object.keys(i18n).forEach(function (lang) {
      if (I18N[lang] && i18n[lang] && typeof i18n[lang] === 'object') {
        Object.keys(i18n[lang]).forEach(function (key) {
          I18N[lang][key] = i18n[lang][key];
        });
      }
    });
    if (typeof window.__applyLang === 'function') {
      window.__applyLang(document.documentElement.getAttribute('lang') || 'en');
    }
  }

  function overlaySite(site) {
    if (!site || typeof site !== 'object') return;

    /* Section visibility — hide/show any top-level section.
       {about:true, services:false, ...} from content.json (admin → الأقسام).
       Missing key or missing map = section stays visible (default). */
    if (site.sections && typeof site.sections === 'object') {
      Object.keys(site.sections).forEach(function (id) {
        var visible = site.sections[id] !== false;
        var sec = document.getElementById(id);
        if (sec) sec.hidden = !visible;
        var nav = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (nav) nav.style.display = visible ? '' : 'none';
      });
    }

    /* Email */
    if (typeof site.email === 'string' && site.email) {
      document.querySelectorAll('a[data-cfg="email"]').forEach(function (a) {
        a.setAttribute('href', 'mailto:' + site.email);
        if (a.hasAttribute('data-cfg-text')) a.textContent = site.email;
      });
    }

    /* Social links — [data-social="youtube"] etc.
       Empty string = explicitly cleared → hide the item;
       missing key  = keep the built-in default link. */
    if (site.socials && typeof site.socials === 'object') {
      document.querySelectorAll('[data-social]').forEach(function (a) {
        var key = a.getAttribute('data-social');
        var url = site.socials[key];
        var item = a.closest('li') || a;
        if (typeof url === 'string' && url) {
          a.setAttribute('href', url);
          item.style.display = '';
        } else if (url === '') {
          item.style.display = 'none';
        }
      });
    }

    /* Pricing numbers — [data-price="basic|standard|pro|monthly"] */
    if (site.prices && typeof site.prices === 'object') {
      document.querySelectorAll('[data-price]').forEach(function (el) {
        var v = site.prices[el.getAttribute('data-price')];
        if (typeof v === 'string' && v) el.textContent = v;
      });
    }

    /* Work projects — [data-project="p1..p8"] on .project-card */
    if (site.projects && typeof site.projects === 'object') {
      document.querySelectorAll('[data-project]').forEach(function (card) {
        var p = site.projects[card.getAttribute('data-project')];
        if (!p) return;
        var img = card.querySelector('img');
        if (img && typeof p.image === 'string' && p.image) {
          img.src = p.image;
          img.setAttribute('alt', p.image.split('/').pop().replace(/\.[a-z]+$/i, ''));
        }
        var link = card.querySelector('a.project-link');
        if (link && typeof p.url === 'string' && p.url) link.href = p.url;
      });
    }

    /* Order-form webhook endpoint */
    if (typeof site.webhookUrl === 'string' && site.webhookUrl) {
      window.__WEBHOOK_URL__ = site.webhookUrl;
    }
  }

  function applyContent(data) {
    if (!data) return;
    overlayI18n(data.i18n);
    overlaySite(data.site);
  }

  /* Exposed so the admin dashboard preview can push drafts */
  window.__applyContent = applyContent;

  /* Load the committed content file (404 / offline → keep defaults) */
  fetch('content.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(applyContent)
    .catch(function () { /* defaults remain */ });

  /* Draft previews from the admin dashboard (same origin only) */
  window.addEventListener('message', function (e) {
    if (e.origin !== window.location.origin) return;
    if (e.data && e.data.type === 'ADMIN_DRAFT' && e.data.payload) {
      applyContent(e.data.payload);
    }
  });
})();
