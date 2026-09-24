/* ============================================================
   admin.js — Site control dashboard
   Edits content.json (i18n strings ×3 languages + site config),
   previews live over postMessage, downloads or pushes to GitHub.
   ============================================================ */

(function () {
  'use strict';

  var REPO = 'abdallamaher1993/hermes-agent';
  var FILE_PATH = 'content.json';
  var DRAFT_KEY = 'hermes-admin-draft-v1';
  var TOKEN_KEY = 'hermes-admin-gh-token';

  var LANGS = ['en', 'ar', 'zh-TW'];
  var LANG_LABEL = { en: 'English', ar: 'العربية', 'zh-TW': '繁體中文' };
  var SOCIAL_KEYS = ['youtube', 'linkedin', 'github', 'instagram', 'bilibili', 'x', 'facebook', 'discord', 'whatsapp'];
  var SOCIAL_LABEL = {
    youtube: 'يوتيوب', linkedin: 'لينكدإن', github: 'جيت هاب',
    instagram: 'إنستغرام', bilibili: 'بيلي بيلي', x: 'إكس (تويتر)',
    facebook: 'فيسبوك', discord: 'ديسكورد', whatsapp: 'واتساب'
  };
  var PRICE_KEYS = [
    { key: 'basic', label: 'الباقة الأساسية' },
    { key: 'standard', label: 'الباقة القياسية' },
    { key: 'pro', label: 'الباقة الاحترافية' },
    { key: 'monthly', label: 'الاشتراك الشهري' }
  ];
  var PROJECT_IDS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];

  /* ---------- Field schema (i18n keys, grouped) ---------- */
  function F(key, label, long) { return { key: key, label: label, long: !!long }; }
  function feat(pkg, n) {
    var out = [];
    for (var i = 1; i <= n; i++) out.push(F('pricing_' + pkg + '_f' + i, 'ميزة ' + i));
    return out;
  }

  var GROUPS = [
    {
      id: 'site', label: 'بيانات الموقع والروابط', custom: true,
      desc: 'البريد الإلكتروني، رابط استقبال الطلبات (Webhook)، روابط منصات التواصل، أسعار البطاقات الأربع، وصور وروابط مشاريع الأعمال الثمانية. الحقول النصية للموقع نفسها (العناوين والأوصاف) في الأقسام التالية.'
    },
    {
      id: 'nav', label: 'شريط التنقل',
      desc: 'عناوين الروابط الستة في أعلى الموقع.',
      fields: [
        F('nav_about', 'رابط: نبذة'), F('nav_services', 'رابط: الخدمات'),
        F('nav_pricing', 'رابط: الأسعار'), F('nav_work', 'رابط: الأعمال'),
        F('nav_skills', 'رابط: المهارات'), F('nav_contact', 'رابط: التواصل')
      ]
    },
    {
      id: 'hero', label: 'الواجهة الرئيسية',
      desc: 'اللقب، الاسم، الوصف، الإحصائيات الثلاث، وزرا الانتقال.',
      fields: [
        F('hero_label', 'اللقب الوظيفي'), F('hero_title', 'الاسم الرئيسي'),
        F('hero_desc', 'الوصف التعريفي', true),
        F('hero_stat1_num', 'إحصائية ١ — الرقم'), F('hero_stat1_label', 'إحصائية ١ — التسمية'),
        F('hero_stat2_num', 'إحصائية ٢ — الرقم'), F('hero_stat2_label', 'إحصائية ٢ — التسمية'),
        F('hero_stat3_num', 'إحصائية ٣ — الرقم'), F('hero_stat3_label', 'إحصائية ٣ — التسمية'),
        F('hero_cta1', 'الزر الأول'), F('hero_cta2', 'الزر الثاني')
      ]
    },
    {
      id: 'about', label: 'قسم نبذة',
      desc: 'عنوان القسم والفقرات الثلاث وبطاقات المعلومات الجانبية.',
      fields: [
        F('about_title', 'عنوان القسم'),
        F('about_p1', 'الفقرة الأولى', true), F('about_p2', 'الفقرة الثانية', true), F('about_p3', 'الفقرة الثالثة', true),
        F('about_location_label', '«الموقع» — التسمية'), F('about_location_value', '«الموقع» — القيمة'),
        F('about_focus_label', '«التخصص» — التسمية'), F('about_focus_value', '«التخصص» — القيمة'),
        F('about_languages_label', '«اللغات» — التسمية'), F('about_languages_value', '«اللغات» — القيمة')
      ]
    },
    {
      id: 'services', label: 'قسم الخدمات',
      desc: 'عنوان القسم وبطاقات الخدمات الأربع.',
      fields: [F('services_title', 'عنوان القسم')].concat([1, 2, 3, 4].reduce(function (acc, i) {
        acc.push(F('services_s' + i + '_title', 'الخدمة ' + i + ' — العنوان'));
        acc.push(F('services_s' + i + '_desc', 'الخدمة ' + i + ' — الوصف', true));
        return acc;
      }, []))
    },
    {
      id: 'pricing_meta', label: 'الأسعار — العام',
      desc: 'عنوان القسم والوصف والعملة وأزرار الطلب والشارات.',
      fields: [
        F('pricing_title', 'عنوان القسم'), F('pricing_subtitle', 'وصف القسم', true),
        F('pricing_currency', 'العملة'), F('pricing_period', 'لاحقة المدة (/month)'),
        F('pricing_cta', 'زر الطلب'), F('pricing_cta_monthly', 'زر الاشتراك'),
        F('pricing_popular', 'شارة «الأكثر طلبًا»'), F('pricing_note', 'ملاحظة أسفل القسم')
      ]
    },
    {
      id: 'pricing_basic', label: 'باقة — أساسية',
      desc: 'عنوان الباقة وميزاتها الست. الرقم السعري نفسه يُعدّل من «بيانات الموقع».',
      fields: [F('pricing_basic_title', 'عنوان الباقة')].concat(feat('basic', 6))
    },
    {
      id: 'pricing_standard', label: 'باقة — قياسية',
      desc: 'عنوان الباقة وميزاتها السبع.',
      fields: [F('pricing_standard_title', 'عنوان الباقة')].concat(feat('standard', 7))
    },
    {
      id: 'pricing_pro', label: 'باقة — احترافية',
      desc: 'عنوان الباقة وميزاتها الثماني.',
      fields: [F('pricing_pro_title', 'عنوان الباقة')].concat(feat('pro', 8))
    },
    {
      id: 'pricing_monthly', label: 'باقة — شهرية',
      desc: 'عنوان الباقة وميزاتها السبع.',
      fields: [F('pricing_monthly_title', 'عنوان الباقة')].concat(feat('monthly', 7))
    },
    {
      id: 'work', label: 'قسم الأعمال',
      desc: 'عنوان القسم وزر المشاهدة وبطاقات المشاريع الثماني. الصور والروابط من «بيانات الموقع».',
      fields: [F('work_title', 'عنوان القسم'), F('work_watch', 'زر المشاهدة')].concat(
        [1, 2, 3, 4, 5, 6, 7, 8].reduce(function (acc, i) {
          return acc.concat([
            F('work_p' + i + '_tag', 'المشروع ' + i + ' — التصنيف'),
            F('work_p' + i + '_title', 'المشروع ' + i + ' — العنوان'),
            F('work_p' + i + '_desc', 'المشروع ' + i + ' — الوصف', true)
          ]);
        }, []))
    },
    {
      id: 'skills', label: 'قسم المهارات',
      desc: 'عنوان القسم والمجموعات الثلاث وخمس عناصر في كل منها.',
      fields: [F('skills_title', 'عنوان القسم')].concat(
        [['pipeline', 'خط الإنتاج'], ['tools', 'الأدوات'], ['auto', 'الأتمتة']].reduce(function (acc, g) {
          acc.push(F('skills_' + g[0] + '_title', 'مجموعة «' + g[1] + '» — العنوان'));
          for (var i = 1; i <= 5; i++) acc.push(F('skills_' + g[0] + '_' + i, 'مجموعة «' + g[1] + '» — عنصر ' + i));
          return acc;
        }, []))
    },
    {
      id: 'contact', label: 'قسم التواصل',
      desc: 'عنوان القسم والمقدمة ورسائل النموذج وحالاته.',
      fields: [
        F('contact_title', 'عنوان القسم'), F('contact_social_intro', 'المقدمة'),
        F('contact_name_label', 'تسمية حقل الاسم'), F('contact_email_label', 'تسمية حقل البريد'),
        F('contact_msg_label', 'تسمية حقل الرسالة'), F('contact_submit', 'زر الإرسال'),
        F('form_sending', 'رسالة «جارٍ الإرسال»'), F('form_success', 'رسالة النجاح'),
        F('form_error', 'رسالة الخطأ')
      ]
    },
    {
      id: 'order', label: 'نموذج الطلب',
      desc: 'عنوان النموذج ووصفه وتسميات حقوله وخيارات الباقات ورسالة النجاح.',
      fields: [
        F('order_title', 'عنوان النموذج'), F('order_subtitle', 'وصف النموذج', true),
        F('order_name_label', 'تسمية الاسم'), F('order_name_placeholder', 'نص مساعد — الاسم'),
        F('order_email_label', 'تسمية البريد'), F('order_email_placeholder', 'نص مساعد — البريد'),
        F('order_package_label', 'تسمية اختيار الباقة'), F('order_package_default', 'الخيار الافتراضي'),
        F('order_package_basic', 'خيار — أساسية'), F('order_package_standard', 'خيار — قياسية'),
        F('order_package_pro', 'خيار — احترافية'), F('order_package_monthly', 'خيار — شهرية'),
        F('order_message_label', 'تسمية وصف المشروع'), F('order_message_placeholder', 'نص مساعد — وصف المشروع', true),
        F('order_submit', 'زر الإرسال'), F('order_success', 'رسالة النجاح')
      ]
    },
    {
      id: 'misc', label: 'التذييل وصفحات أخرى',
      desc: 'وصف التذييل ونصوص صفحة 404 والعناصر المساعدة.',
      fields: [
        F('footer_desc', 'وصف التذييل'),
        F('skip_link', 'رابط تخطي المحتوى'), F('back_to_top_label', 'تسمية زر العودة للأعلى'),
        F('page_404_title', 'صفحة 404 — العنوان'), F('page_404_desc', 'صفحة 404 — الوصف', true),
        F('page_404_back', 'صفحة 404 — زر العودة')
      ]
    }
  ];

  /* Any key not covered by the schema lands here */
  var covered = {};
  GROUPS.forEach(function (g) { (g.fields || []).forEach(function (f) { covered[f.key] = true; }); });

  /* ---------- State ---------- */
  var defaults = null;      /* I18N factory defaults from js/i18n.js */
  var baseline = null;      /* committed/published content.json (may be null) */
  var state = null;         /* working copy: {site:{...}, i18n:{...}} */
  var baselineJSON = '';
  var activeGroup = 'site';
  var activeLang = 'en';
  var previewOn = false;

  /* ---------- DOM refs ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var sidebar = $('sidebar'), fieldsHost = $('fieldsHost'), langTabs = $('langTabs');
  var dirtyBadge = $('dirtyBadge'), loadStatus = $('loadStatus');
  var previewPane = $('previewPane'), previewFrame = $('previewFrame');
  var toastHost = $('toastHost');

  /* ---------- Utils ---------- */
  function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

  function debounce(fn, ms) {
    var t;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  function toast(msg, ok) {
    var el = document.createElement('div');
    el.className = 'toast' + (ok ? ' ok' : '');
    el.textContent = msg;
    toastHost.appendChild(el);
    setTimeout(function () { el.remove(); }, 4200);
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function toBase64Unicode(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = '';
    bytes.forEach(function (b) { bin += String.fromCharCode(b); });
    return btoa(bin);
  }

  /* ---------- Load ---------- */
  function fetchDefaults() {
    return fetch('../js/i18n.js', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.text() : Promise.reject(new Error('i18n.js ' + r.status)); })
      .then(function (src) { return new Function(src + '; return I18N;')(); });
  }

  function fetchBaseline() {
    return fetch('../content.json', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  function buildState() {
    var i18n = {};
    LANGS.forEach(function (l) {
      i18n[l] = deepClone(defaults[l] || {});
      if (baseline && baseline.i18n && baseline.i18n[l]) {
        Object.keys(baseline.i18n[l]).forEach(function (k) { i18n[l][k] = baseline.i18n[l][k]; });
      }
    });
    var site = deepClone(baseline && baseline.site ? baseline.site : {});
    site.socials = site.socials || {};
    site.prices = site.prices || {};
    site.projects = site.projects || {};
    return { site: site, i18n: i18n };
  }

  function init() {
    Promise.all([fetchDefaults(), fetchBaseline()]).then(function (res) {
      defaults = res[0];
      baseline = res[1];

      var draftRaw = localStorage.getItem(DRAFT_KEY);
      var staleDraft = false;
      if (draftRaw) {
        try {
          var d = JSON.parse(draftRaw);
          if (!d.i18n || !d.site) throw new Error('bad draft');
          /* A draft saved before the currently published content is stale
             (e.g. created while content.json was not published yet) and
             would otherwise shadow the published values forever. */
          if (baseline && baseline.updated && d.updated && String(d.updated) < String(baseline.updated)) {
            localStorage.removeItem(DRAFT_KEY);
            staleDraft = true;
          } else {
            state = d;
          }
        } catch (e) { state = null; localStorage.removeItem(DRAFT_KEY); }
      }
      if (!state) state = buildState();

      baselineJSON = JSON.stringify(buildState());

      /* collect uncovered keys into an extra group */
      var other = { id: 'other', label: 'مفاتيح إضافية', desc: 'مفاتيح غير مصنّفة تظهر تلقائيًا هنا.', fields: [] };
      LANGS.forEach(function (l) {
        Object.keys(defaults[l] || {}).forEach(function (k) {
          if (!covered[k] && !other.fields.some(function (f) { return f.key === k; })) {
            other.fields.push(F(k, 'مفتاح: ' + k, String(defaults[l][k] || '').length > 90));
          }
        });
      });
      if (other.fields.length) GROUPS.push(other);

      loadStatus.textContent = baseline
        ? 'محمّل من content.json المنشور — ' + (baseline.updated || 'بدون تاريخ')
        : 'لا يوجد content.json منشور — تعديل على القيم الافتراضية';
      renderSidebar();
      renderFields();
      updateDirty();
      if (staleDraft) toast('تم تجاهل مسودة قديمة (أقدم من آخر نشر)');
    }).catch(function (err) {
      loadStatus.textContent = 'تعذر التحميل';
      fieldsHost.innerHTML =
        '<div class="load-error"><h2>تعذر تحميل ملفات الموقع</h2><p>افتح اللوحة عبر خادم التطوير وليس كملف مباشر:</p>' +
        '<p><code>npm run dev</code> ثم <code>http://localhost:7100/admin/</code></p>' +
        '<p style="color:var(--c-text-dim);font-size:12px;margin-top:10px">' + escapeHtml(String(err && err.message || err)) + '</p></div>';
    });
  }

  /* ---------- Render: sidebar ---------- */
  function renderSidebar() {
    sidebar.innerHTML = '';
    GROUPS.forEach(function (g, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'side-link' + (g.id === activeGroup ? ' active' : '');
      b.innerHTML = '<span class="num">' + String(i + 1).padStart(2, '0') + '</span><span>' + escapeHtml(g.label) + '</span>';
      b.addEventListener('click', function () {
        activeGroup = g.id;
        renderSidebar();
        renderFields();
      });
      sidebar.appendChild(b);
    });
  }

  /* ---------- Render: fields ---------- */
  function groupById(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === id) return GROUPS[i];
    return null;
  }

  function renderFields() {
    var g = groupById(activeGroup);
    fieldsHost.innerHTML = '';
    langTabs.style.display = g.custom ? 'none' : '';

    var h = document.createElement('h2');
    h.className = 'group-title';
    h.textContent = g.label;
    var d = document.createElement('p');
    d.className = 'group-desc';
    d.textContent = g.desc || '';
    fieldsHost.appendChild(h);
    fieldsHost.appendChild(d);

    if (g.custom) { renderSiteFields(); return; }

    g.fields.forEach(function (f) {
      var wrap = document.createElement('div');
      wrap.className = 'field';

      var head = document.createElement('div');
      head.className = 'field-head';
      head.innerHTML = '<span class="field-label">' + escapeHtml(f.label) + '</span>' +
        '<span class="field-key" title="' + escapeHtml(f.key) + '">' + escapeHtml(f.key) + '</span>';
      wrap.appendChild(head);

      var input;
      if (f.long) {
        input = document.createElement('textarea');
        input.rows = 3;
      } else {
        input = document.createElement('input');
        input.type = 'text';
      }
      input.value = state.i18n[activeLang][f.key] !== undefined ? state.i18n[activeLang][f.key] : '';
      input.setAttribute('data-key', f.key);
      if (activeLang !== 'ar') input.setAttribute('dir', 'ltr');
      input.addEventListener('input', function () {
        state.i18n[activeLang][f.key] = input.value;
        markChanged(input, f.key);
        schedulePersist();
        schedulePreview();
      });
      wrap.appendChild(input);
      fieldsHost.appendChild(wrap);
    });
  }

  function markChanged(input, key) {
    var def = defaults[activeLang] || {};
    var base = baseline && baseline.i18n && baseline.i18n[activeLang] ? baseline.i18n[activeLang] : {};
    var original = base[key] !== undefined ? base[key] : def[key];
    input.classList.toggle('changed', input.value !== String(original !== undefined ? original : ''));
  }

  /* ---------- Render: site config ---------- */
  function siteInput(value, oninput, placeholder) {
    var input = document.createElement('input');
    input.type = 'text';
    input.value = value || '';
    if (placeholder) input.placeholder = placeholder;
    input.addEventListener('input', function () { oninput(input.value); schedulePersist(); schedulePreview(); });
    return input;
  }

  function subhead(text) {
    var el = document.createElement('h3');
    el.className = 'subhead';
    el.textContent = text;
    fieldsHost.appendChild(el);
  }

  function fieldWrap(labelText, input) {
    var wrap = document.createElement('div');
    wrap.className = 'field';
    var head = document.createElement('div');
    head.className = 'field-head';
    head.innerHTML = '<span class="field-label">' + escapeHtml(labelText) + '</span>';
    wrap.appendChild(head);
    wrap.appendChild(input);
    fieldsHost.appendChild(wrap);
  }

  function renderSiteFields() {
    subhead('التواصل الأساسي');
    fieldWrap('البريد الإلكتروني (يظهر في قسم التواصل)', siteInput(state.site.email, function (v) { state.site.email = v; }));
    fieldWrap('رابط استقبال الطلبات (Webhook)', siteInput(state.site.webhookUrl, function (v) { state.site.webhookUrl = v; }, 'https://…/webhook/order'));

    subhead('روابط منصات التواصل');
    var hint = document.createElement('p');
    hint.className = 'hint';
    hint.innerHTML = 'أي رابط تتركه فارغًا يُخفى من الموقع — بما فيه واتساب: أضف رابطك هنا وسيظهر تلقائيًا في قسم التواصل (مثل <code>https://wa.me/8869…</code>).';
    fieldsHost.appendChild(hint);
    SOCIAL_KEYS.forEach(function (k) {
      fieldWrap(SOCIAL_LABEL[k], siteInput(state.site.socials[k], function (v) { state.site.socials[k] = v; }, 'https://…'));
    });

    subhead('أسعار البطاقات الأربع (أرقام فقط كما تظهر)');
    PRICE_KEYS.forEach(function (p) {
      fieldWrap(p.label, siteInput(state.site.prices[p.key], function (v) { state.site.prices[p.key] = v; }, '1,000'));
    });

    subhead('مشاريع الأعمال الثمانية — الصورة والرابط');
    PROJECT_IDS.forEach(function (id) {
      var p = state.site.projects[id] || (state.site.projects[id] = { image: '', url: '' });
      var row = document.createElement('div');
      row.className = 'proj-row';
      var name = document.createElement('span');
      name.className = 'proj-name';
      name.textContent = id;
      var img = siteInput(p.image, function (v) { p.image = v; }, 'img/….jpg');
      var url = siteInput(p.url, function (v) { p.url = v; }, 'https://youtube.com/…');
      row.appendChild(name); row.appendChild(img); row.appendChild(url);
      fieldsHost.appendChild(row);
    });
    var hint2 = document.createElement('p');
    hint2.className = 'hint';
    hint2.textContent = 'ضع الصورة الجديدة في مجلد img/ عبر رفعها إلى المستودع (أو سلّمها لوكيلك ليرفعها)، ثم اكتب مسارها هنا.';
    fieldsHost.appendChild(hint2);
  }

  /* ---------- Language tabs ---------- */
  langTabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-tab');
    if (!btn) return;
    activeLang = btn.getAttribute('data-lang');
    langTabs.querySelectorAll('.lang-tab').forEach(function (t) {
      t.classList.toggle('active', t === btn);
    });
    renderFields();
  });

  /* ---------- Persist / dirty ---------- */
  var schedulePersist = debounce(function () {
    state.updated = new Date().toISOString().slice(0, 10);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    updateDirty();
  }, 350);

  function updateDirty() {
    var dirty = JSON.stringify(state) !== baselineJSON;
    dirtyBadge.hidden = !dirty;
    dirtyBadge.classList.toggle('pulse', dirty);
  }

  /* ---------- Live preview ---------- */
  var schedulePreview = debounce(pushPreview, 400);

  function pushPreview() {
    if (!previewOn || !previewFrame.contentWindow) return;
    previewFrame.contentWindow.postMessage({ type: 'ADMIN_DRAFT', payload: state }, window.location.origin);
  }

  previewFrame.addEventListener('load', pushPreview);

  $('btnPreview').addEventListener('click', function () {
    previewOn = !previewOn;
    previewPane.hidden = !previewOn;
    $('btnPreview').classList.toggle('btn-primary', previewOn);
    $('btnPreview').classList.toggle('btn-ghost', !previewOn);
    if (previewOn) { previewFrame.src = '../index.html'; }
  });

  /* ---------- Export ---------- */
  function currentJSON() {
    var out = {
      version: 1,
      updated: new Date().toISOString().slice(0, 10),
      site: state.site,
      i18n: state.i18n
    };
    return JSON.stringify(out, null, 2) + '\n';
  }

  $('btnDownload').addEventListener('click', function () {
    var blob = new Blob([currentJSON()], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('تم تنزيل content.json — استبدل الملف في جذر المستودع لنشره', true);
  });

  $('btnCopy').addEventListener('click', function () {
    navigator.clipboard.writeText(currentJSON()).then(function () {
      toast('تم نسخ JSON بالكامل إلى الحافظة', true);
    }, function () {
      toast('تعذر النسخ — استخدم زر التنزيل');
    });
  });

  $('btnReset').addEventListener('click', function () {
    if (!confirm('استعادة المحتوى من آخر نشر؟ ستفقد التعديلات غير المنشورة في هذه اللوحة.')) return;
    localStorage.removeItem(DRAFT_KEY);
    location.reload();
  });

  /* ---------- Publish to GitHub ---------- */
  var publishModal = $('publishModal'), publishStatus = $('publishStatus');
  var ghToken = $('ghToken'), ghBranch = $('ghBranch');

  $('btnPublish').addEventListener('click', function () {
    ghToken.value = localStorage.getItem(TOKEN_KEY) || '';
    publishStatus.textContent = '';
    publishStatus.className = 'modal-status';
    publishModal.hidden = false;
    ghToken.focus();
  });

  $('btnPublishCancel').addEventListener('click', function () {
    publishModal.hidden = true;
  });

  publishModal.addEventListener('click', function (e) {
    if (e.target === publishModal) publishModal.hidden = true;
  });

  $('btnPublishConfirm').addEventListener('click', function () {
    var token = ghToken.value.trim();
    var branch = ghBranch.value.trim() || 'main';
    if (!token) { publishStatus.textContent = 'أدخل رمز GitHub أولًا.'; publishStatus.className = 'modal-status err'; return; }

    localStorage.setItem(TOKEN_KEY, token);
    var btn = this;
    btn.disabled = true;
    publishStatus.textContent = 'جارٍ الجلب من GitHub…';
    publishStatus.className = 'modal-status';

    var api = 'https://api.github.com/repos/' + REPO + '/contents/' + FILE_PATH;
    var headers = { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json' };

    fetch(api + '?ref=' + encodeURIComponent(branch), { headers: headers })
      .then(function (r) {
        if (r.status === 404) return null; /* new file on this branch */
        if (!r.ok) throw new Error('GET ' + r.status + ' — تحقق من الرمز والفرع وصلاحية Contents');
        return r.json();
      })
      .then(function (file) {
        var body = {
          message: 'content: update via admin dashboard',
          content: toBase64Unicode(currentJSON()),
          branch: branch
        };
        if (file && file.sha) body.sha = file.sha;
        publishStatus.textContent = 'جارٍ الرفع…';
        return fetch(api, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(body)
        });
      })
      .then(function (r) {
        if (!r.ok) return r.json().then(function (e) { throw new Error(e.message || ('PUT ' + r.status)); });
        return r.json();
      })
      .then(function (res) {
        publishStatus.textContent = 'تم النشر بنجاح — commit: ' + (res.commit ? res.commit.sha.slice(0, 7) : '');
        publishStatus.className = 'modal-status ok';
        toast('تم النشر إلى GitHub — الموقع يتحدث خلال دقيقة تقريبًا', true);
        /* treat published state as new baseline */
        localStorage.removeItem(DRAFT_KEY);
        baseline = JSON.parse(currentJSON());
        baselineJSON = JSON.stringify(buildState());
        updateDirty();
        setTimeout(function () { publishModal.hidden = true; publishStatus.textContent = ""; publishStatus.className = "modal-status"; }, 800);
      })
      .catch(function (err) {
        publishStatus.textContent = 'فشل النشر: ' + err.message;
        publishStatus.className = 'modal-status err';
      })
      .finally(function () { btn.disabled = false; });
  });

  /* ---------- Go ---------- */
  init();
})();
