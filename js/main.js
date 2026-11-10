/* ============================================================
   main.js — Language switch, showreel audio, live dub switcher,
             category filters, smart video pause, pipeline & a11y
   ============================================================ */

(function () {
  'use strict';

  function trackEvent(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  var html = document.documentElement;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var langBtns = document.querySelectorAll('.lang-btn');
  var heroVideo = document.getElementById('heroVideo');
  var heroSoundBtn = document.getElementById('heroSoundBtn');
  var heroSoundLabel = document.getElementById('heroSoundLabel');
  var heroPlayToggle = document.getElementById('heroPlayToggle');
  var heroPlayIcon = document.getElementById('heroPlayIcon');
  var hawkVideo = document.getElementById('hawkVideo');
  var hawkUserSelectedDub = false;

  function currentStrings() {
    var lang = html.getAttribute('lang') || 'en';
    return (typeof I18N !== 'undefined' && I18N[lang]) ? I18N[lang] : (typeof I18N !== 'undefined' ? I18N.en : {});
  }

  function syncHeroControlsText() {
    var strings = currentStrings();
    if (heroSoundLabel && heroVideo) {
      heroSoundLabel.textContent = heroVideo.muted
        ? (strings.hero_sound_off || 'Enable Sound (-14 LUFS)')
        : (strings.hero_sound_on || 'Sound On · Mute');
    }
    if (heroPlayToggle && heroVideo) {
      heroPlayToggle.setAttribute(
        'aria-label',
        heroVideo.paused
          ? (strings.hero_play_video || 'Play showreel')
          : (strings.hero_pause_video || 'Pause showreel')
      );
    }
  }

  function syncDefaultHawkLanguage(lang) {
    if (!hawkVideo || hawkUserSelectedDub || !hawkVideo.paused || hawkVideo.currentTime > 0.5) {
      return;
    }
    var map = {
      ar: 'assets/work-hawk-ar.mp4',
      en: 'assets/work-hawk-en.mp4',
      'zh-TW': 'assets/work-hawk-zh.mp4'
    };
    var targetSrc = map[lang] || map.ar;
    if (hawkVideo.getAttribute('src') !== targetSrc) {
      hawkVideo.setAttribute('src', targetSrc);
      document.querySelectorAll('.dub-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-dub-src') === targetSrc);
      });
    }
  }

  function applyLang(lang) {
    if (typeof I18N === 'undefined' || !I18N[lang]) {
      return;
    }
    var strings = I18N[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        el.textContent = strings[key];
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (strings[key] !== undefined) {
        el.setAttribute('aria-label', strings[key]);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
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

    syncHeroControlsText();
    syncDefaultHawkLanguage(lang);

    if (typeof window.__renderCaseStudy === 'function') {
      window.__renderCaseStudy();
    }

    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      /* ignore private mode storage errors */
    }
    trackEvent('language_change', { language: lang });
  }

  /* Detect initial language: ?lang= query param -> localStorage -> default 'en' */
  var urlParams = new URLSearchParams(window.location.search);
  var queryLang = urlParams.get('lang');
  var storedLang = null;
  try {
    storedLang = localStorage.getItem('lang');
  } catch (e) {
    storedLang = null;
  }
  var initialLang = (queryLang && typeof I18N !== 'undefined' && I18N[queryLang])
    ? queryLang
    : ((storedLang && typeof I18N !== 'undefined' && I18N[storedLang]) ? storedLang : 'en');
  applyLang(initialLang);

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(this.getAttribute('data-lang'));
    });
  });

  window.__applyLang = applyLang;

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

  /* ---- Hero Showreel Autoplay & Sound Controls ---- */
  if (heroVideo) {
    if (!prefersReducedMotion) {
      heroVideo.play().then(function () {
        if (heroPlayIcon) {
          heroPlayIcon.textContent = '❚❚';
        }
        syncHeroControlsText();
      }).catch(function () {
        if (heroPlayIcon) {
          heroPlayIcon.textContent = '▶';
        }
        syncHeroControlsText();
      });
    } else if (heroPlayIcon) {
      heroPlayIcon.textContent = '▶';
    }

    var toggleHeroSound = function () {
      heroVideo.muted = !heroVideo.muted;
      if (!heroVideo.muted && heroVideo.paused) {
        heroVideo.play().catch(function () {});
        if (heroPlayIcon) {
          heroPlayIcon.textContent = '❚❚';
        }
      }
      if (heroSoundBtn) {
        heroSoundBtn.classList.toggle('unmuted', !heroVideo.muted);
        heroSoundBtn.setAttribute('aria-pressed', heroVideo.muted ? 'false' : 'true');
      }
      syncHeroControlsText();
      trackEvent('hero_sound_toggle', { muted: heroVideo.muted });
    };

    heroVideo.style.cursor = 'pointer';
    heroVideo.addEventListener('click', toggleHeroSound);

    if (heroSoundBtn) {
      heroSoundBtn.addEventListener('click', toggleHeroSound);
    }

    if (heroPlayToggle) {
      heroPlayToggle.addEventListener('click', function () {
        if (heroVideo.paused) {
          heroVideo.play().catch(function () {});
          if (heroPlayIcon) {
            heroPlayIcon.textContent = '❚❚';
          }
        } else {
          heroVideo.pause();
          if (heroPlayIcon) {
            heroPlayIcon.textContent = '▶';
          }
        }
        syncHeroControlsText();
        trackEvent('hero_video_toggle', { paused: heroVideo.paused });
      });
    }
  }

  /* ---- Smart Exclusive Video Playback (No Overlapping Audio) ---- */
  var allVideos = document.querySelectorAll('video');
  allVideos.forEach(function (vid) {
    vid.addEventListener('play', function () {
      if (vid !== heroVideo && heroVideo && !heroVideo.muted) {
        heroVideo.muted = true;
        if (heroSoundBtn) {
          heroSoundBtn.classList.remove('unmuted');
          heroSoundBtn.setAttribute('aria-pressed', 'false');
        }
        syncHeroControlsText();
      }
      allVideos.forEach(function (other) {
        if (other !== vid && other !== heroVideo && !other.paused) {
          other.pause();
        }
      });
    });
  });

  /* ---- Interactive Hawk of Quraysh Live Dub Switcher ---- */
  var dubBtns = document.querySelectorAll('.dub-btn');
  if (hawkVideo && dubBtns.length) {
    dubBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newSrc = this.getAttribute('data-dub-src');
        if (!newSrc || hawkVideo.getAttribute('src') === newSrc) {
          if (hawkVideo.paused) {
            hawkVideo.play().catch(function () {});
          }
          return;
        }
        hawkUserSelectedDub = true;
        var savedTime = hawkVideo.currentTime || 0;
        dubBtns.forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        hawkVideo.setAttribute('src', newSrc);
        hawkVideo.load();
        var restoreAndPlay = function () {
          hawkVideo.removeEventListener('loadedmetadata', restoreAndPlay);
          if (savedTime > 0 && savedTime < hawkVideo.duration - 0.5) {
            hawkVideo.currentTime = savedTime;
          }
          hawkVideo.play().catch(function () {});
        };
        hawkVideo.addEventListener('loadedmetadata', restoreAndPlay);
        trackEvent('hawk_dub_switch', { src: newSrc });
      });
    });
  }

  /* ---- Portfolio Category Filter Tabs ---- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var workCards = document.querySelectorAll('#workGrid .project-card');
  var workGrid = document.getElementById('workGrid');
  var reelsSection = document.getElementById('reels');

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter') || 'all';
        filterBtns.forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });

        if (filter === 'reels') {
          if (workGrid) {
            workGrid.hidden = true;
          }
          if (reelsSection) {
            reelsSection.hidden = false;
            reelsSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
          }
        } else {
          if (workGrid) {
            workGrid.hidden = false;
          }
          workCards.forEach(function (card) {
            var cat = card.getAttribute('data-category');
            card.hidden = (filter !== 'all' && cat !== filter);
          });
          if (reelsSection) {
            reelsSection.hidden = (filter !== 'all');
          }
        }
        trackEvent('work_filter', { category: filter });
      });
    });
  }

  /* ---- Interactive Pipeline Gate Expansion & Progress ---- */
  var pipelineSection = document.getElementById('pipeline');
  var pipelineGrid = document.getElementById('pipelineGrid');
  var pipelineProgressFill = document.getElementById('pipelineProgressFill');
  var pipelineSteps = pipelineGrid ? pipelineGrid.querySelectorAll('.pipeline-step') : [];

  function updatePipelineProgress() {
    if (!pipelineSection || !pipelineProgressFill) {
      return;
    }
    var rect = pipelineSection.getBoundingClientRect();
    var winH = window.innerHeight || 800;
    var secH = pipelineSection.offsetHeight || 1;
    var scrolled = Math.min(1, Math.max(0, (winH - rect.top) / (secH + winH * 0.4)));
    pipelineProgressFill.style.width = Math.round(scrolled * 100) + '%';
  }

  if (pipelineSteps.length) {
    pipelineSteps.forEach(function (step) {
      step.style.cursor = 'pointer';
      step.setAttribute('tabindex', '0');
      step.addEventListener('click', function () {
        var expanded = this.classList.toggle('expanded');
        trackEvent('pipeline_step_click', { step: this.getAttribute('data-step'), expanded: expanded });
      });
      step.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  if (pipelineSection && pipelineProgressFill) {
    window.addEventListener('scroll', updatePipelineProgress, { passive: true });
    window.addEventListener('resize', updatePipelineProgress);
    updatePipelineProgress();
  }

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') {
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (href === '#reels' && reelsSection) {
          reelsSection.hidden = false;
        }
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        trackEvent('nav_click', { target: href });
      }
    });
  });

  /* ---- Scrollspy ---- */
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  var spyTargets = [];
  navAnchors.forEach(function (a) {
    var sec = document.querySelector(a.getAttribute('href'));
    if (sec) {
      spyTargets.push({ link: a, section: sec });
    }
  });
  if ('IntersectionObserver' in window && spyTargets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          spyTargets.forEach(function (item) {
            item.link.setAttribute('aria-current', item.section === entry.target ? 'true' : 'false');
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    spyTargets.forEach(function (item) {
      spy.observe(item.section);
    });
  }

  /* ---- Back to Top & Footer Year ---- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

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

  /* ---- Outbound Click Tracking ---- */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    a.addEventListener('click', function () {
      trackEvent('outbound_click', { url: this.getAttribute('href') });
    });
  });

})();
