/* admin-instant.js — Modal closes INSTANTLY on publish success */
(function () {
  'use strict';
  var REPO = 'abdallamaher1993/hermes-agent';
  var FILE_PATH = 'content.json';
  var TOKEN_KEY = 'hermes-admin-gh-token';
  var DRAFT_KEY = 'hermes-admin-draft-v1';
  var LANGS = ['en', 'ar', 'zh-TW'];
  var $ = function (id) { return document.getElementById(id); };

  var publishModal = $('publishModal'), publishStatus = $('publishStatus');
  var ghToken = $('ghToken'), ghBranch = $('ghBranch');

  function toBase64Unicode(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = '';
    bytes.forEach(function (b) { bin += String.fromCharCode(b); });
    return btoa(bin);
  }

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
    if (!token) {
      publishStatus.textContent = 'أدخل رمز GitHub أولًا.';
      publishStatus.className = 'modal-status err';
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
    var btn = this;
    btn.disabled = true;
    publishStatus.textContent = 'جارٍ النشر...';
    publishStatus.className = 'modal-status';

    var api = 'https://api.github.com/repos/' + REPO + '/contents/' + FILE_PATH;
    var headers = { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json' };

    // CLOSE MODAL IMMEDIATELY
    publishModal.hidden = true;

    fetch(api + '?ref=' + encodeURIComponent(branch), { headers: headers })
      .then(function (r) {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error('GET ' + r.status);
        return r.json();
      })
      .then(function (file) {
        var body = {
          message: 'content: update via admin dashboard',
          content: toBase64Unicode(JSON.stringify({version: 1, updated: new Date().toISOString().slice(0, 10)}, null, 2)),
          branch: branch
        };
        if (file && file.sha) body.sha = file.sha;
        return fetch(api, { method: 'PUT', headers: headers, body: JSON.stringify(body) });
      })
      .then(function (r) {
        if (!r.ok) return r.json().then(function (e) { throw new Error(e.message || ('PUT ' + r.status)); });
        return r.json();
      })
      .then(function (res) {
        // UPDATE UI WITHOUT OPENING MODAL
        var toast = document.createElement('div');
        toast.className = 'toast ok';
        toast.textContent = '✅ Published! ' + (res.commit ? res.commit.sha.slice(0, 7) : '');
        document.getElementById('toastHost').appendChild(toast);
        setTimeout(function () { toast.remove(); }, 3000);
        // UPDATE BASELINE
        localStorage.removeItem(DRAFT_KEY);
        if (typeof baseline !== 'undefined') {
          baseline = JSON.parse(JSON.stringify({version: 1, updated: new Date().toISOString().slice(0, 10)}));
          if (typeof buildState === 'function') baselineJSON = JSON.stringify(buildState());
          if (typeof updateDirty === 'function') updateDirty();
        }
      })
      .catch(function (err) {
        publishModal.hidden = false;
        publishStatus.textContent = 'فشل: ' + err.message;
        publishStatus.className = 'modal-status err';
      })
      .finally(function () { btn.disabled = false; });
  });
})();
