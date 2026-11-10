/* ============================================================
   content-loader.js — Loads content.json and overlays it cleanly
   ============================================================ */

(function () {
  'use strict';

  var currentScript = document.currentScript;
  var basePrefix = '';
  if (currentScript && currentScript.src) {
    basePrefix = currentScript.src.replace(/js\/content-loader\.js(\?.*)?$/, '');
  }

  function overlayI18n(i18n) {
    if (typeof I18N === 'undefined' || !i18n || typeof i18n !== 'object') {
      return;
    }
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
    if (!site || typeof site !== 'object') {
      return;
    }

    if (site.sections && typeof site.sections === 'object') {
      Object.keys(site.sections).forEach(function (id) {
        var visible = site.sections[id] !== false;
        var sec = document.getElementById(id);
        if (sec) {
          sec.hidden = !visible;
        }
        var nav = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (nav) {
          nav.style.display = visible ? '' : 'none';
        }
      });
    }

    if (typeof site.email === 'string' && site.email) {
      document.querySelectorAll('a[data-cfg="email"]').forEach(function (a) {
        a.setAttribute('href', 'mailto:' + site.email);
        if (a.hasAttribute('data-cfg-text')) {
          a.textContent = site.email;
        }
      });
    }

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

    if (typeof site.webhookUrl === 'string' && site.webhookUrl) {
      window.__WEBHOOK_URL__ = site.webhookUrl;
    }
  }

  function applyContent(data) {
    if (!data) {
      return;
    }
    overlayI18n(data.i18n);
    overlaySite(data.site);
  }

  window.__applyContent = applyContent;

  fetch((basePrefix || '') + 'content.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(applyContent)
    .catch(function () { /* defaults remain */ });

  window.addEventListener('message', function (e) {
    if (e.origin !== window.location.origin) {
      return;
    }
    if (e.data && e.data.type === 'ADMIN_DRAFT' && e.data.payload) {
      applyContent(e.data.payload);
    }
  });
})();
