/* ============================================================
   main.js — Language switch, form, interactions, a11y
   ============================================================ */

(function () {
  'use strict';

  /* ---- Analytics-ready event layer (inert until GA4 is added) ---- */
  // To enable GA4: paste your gtag snippet before </head> in index.html.
  // The events below flow into dataLayer automatically once GA is present.
  function trackEvent(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  /* ---- Language Switcher ---- */
  const html = document.documentElement;
  const langBtns = document.querySelectorAll('.lang-btn');
  const i18nEls = document.querySelectorAll('[data-i18n]');
  const i18nAriaEls = document.querySelectorAll('[data-i18n-aria]');
  const storedLang = localStorage.getItem('lang');

  function applyLang(lang) {
    if (!I18N[lang]) return;
    const strings = I18N[lang];

    i18nEls.forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        el.textContent = strings[key];
      }
    });
    i18nAriaEls.forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      if (strings[key] !== undefined) {
        el.setAttribute('aria-label', strings[key]);
      }
    });

    // Handle placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (strings[key] !== undefined) {
        el.setAttribute('placeholder', strings[key]);
      }
    });

    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', lang);
    }

    langBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('lang', lang);
    trackEvent('language_change', { language: lang });
  }

  if (storedLang && I18N[storedLang]) {
    applyLang(storedLang);
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(this.getAttribute('data-lang'));
    });
  });

  /* ---- Mobile Menu ---- */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- (Contact form removed) ---- */

  /* ---- Order Form ---- */
  var orderForm = document.getElementById('orderForm');

  /* Orders go to a public webhook if one is configured
     (js/webhook-config.js; content.json site.webhookUrl wins — read at
     submit time so the content-loader.js overlay is already in effect).
     An empty/localhost URL means "no server yet": the order opens as a
     pre-filled email instead, so it always reaches the site owner. */
  function currentStrings() {
    var lang = document.documentElement.getAttribute('lang') || 'en';
    return I18N[lang] || I18N.en;
  }

  function isPublicWebhook(u) {
    if (typeof u !== 'string') return false;
    var m = u.match(/^https:\/\/([^/]+)/i);
    if (!m) return false;
    var host = m[1].toLowerCase();
    return host !== 'localhost' && host.indexOf('127.') !== 0 &&
      host !== '0.0.0.0' && host !== '::' && host !== '[::]';
  }

  function orderEmailTo() {
    var el = document.querySelector('a[data-cfg="email"]');
    if (el && /^mailto:/i.test(el.href)) {
      var a = el.href.replace(/^mailto:/i, '').split('?')[0].trim();
      if (a) return a;
    }
    return 'abdalla2.1993@gmail.com';
  }

  function openOrderEmail(data) {
    var PKG = { basic: 'Basic', standard: 'Standard', professional: 'Professional', monthly: 'Monthly Subscription' };
    var subject = 'New order request — ' + (PKG[data.package] || data.package || '');
    var body = [
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Package: ' + (PKG[data.package] || data.package),
      '',
      'Project description:',
      data.message,
      '',
      '---',
      'Sent from the portfolio site · ' + data.date
    ].join('\n');
    var a = document.createElement('a');
    a.href = 'mailto:' + orderEmailTo() +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(orderForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });
      data.date = new Date().toISOString();
      data.source = location.href;

      var successMsg = document.getElementById('formSuccess');

      function showMailtoResult() {
        if (successMsg) {
          successMsg.textContent = currentStrings().order_mailto_note;
          successMsg.classList.add('show');
        }
        trackEvent('order_email', { package: data.package || 'unknown' });
      }

      var webhookUrl = window.__WEBHOOK_URL__ || '';

      if (!isPublicWebhook(webhookUrl)) {
        /* No public server configured — open the order as a pre-filled email. */
        openOrderEmail(data);
        showMailtoResult();
      } else {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          if (successMsg) {
            successMsg.textContent = currentStrings().order_success;
            successMsg.classList.add('show');
          }
          trackEvent('order_submit', { package: data.package || 'unknown' });
        })
        .catch(function (error) {
          console.error('Order submission error:', error);
          /* Webhook down — fall back to email so the order is not lost. */
          openOrderEmail(data);
          showMailtoResult();
        });
      }

      // Don't reset immediately so the user sees the result message
      setTimeout(function () { orderForm.reset(); }, 3000);
    });
  }

  /* ---- Footer Year ---- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Smooth Scroll (respects reduced motion) ---- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        trackEvent('nav_click', { target: this.getAttribute('href') });
      }
    });
  });

  /* ---- Navbar Scroll State ---- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.pageYOffset > 100
        ? '0 1px 0 rgba(213,56,41,0.1)'
        : 'none';
    }, { passive: true });
  }

  /* ---- Scrollspy: mark active nav link ---- */
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  var spyTargets = [];
  navAnchors.forEach(function (a) {
    var sec = document.querySelector(a.getAttribute('href'));
    if (sec) spyTargets.push({ link: a, section: sec });
  });
  if ('IntersectionObserver' in window && spyTargets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          spyTargets.forEach(function (item) {
            var isActive = item.section === entry.target;
            item.link.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    spyTargets.forEach(function (item) { spy.observe(item.section); });
  }

  /* ---- Back to Top ---- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.pageYOffset > 600);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      trackEvent('back_to_top', {});
    });
  }

  /* ---- Track outbound links (social / projects) ---- */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    a.addEventListener('click', function () {
      trackEvent('outbound_click', { url: this.getAttribute('href') });
    });
  });

  /* ---- Section fade-in (skipped for reduced motion) ---- */
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var sections = document.querySelectorAll('section');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(function (s) {
      s.style.opacity = '0';
      s.style.transform = 'translateY(24px)';
      s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(s);
    });
  }

  /* Exposed for js/content-loader.js (content.json overlay + admin preview) */
  window.__applyLang = applyLang;

})();
