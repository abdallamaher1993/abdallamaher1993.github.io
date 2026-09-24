/* ============================================================
   yt.js — renders the "latest channel videos" strip.

   Data sources, in priority order:
   1) If window.YT_API_KEY is set, fetch live from YouTube Data
      API v3 (channel uploads playlist).
   2) Otherwise use the pre-baked snapshot in latest-videos.js,
      so the section always shows real channel data without
      exposing credentials.

   Renders into the static #latestStrip container in index.html
   (inside the work section, above the curated project grid).
   ============================================================ */
(function () {
  'use strict';

  var CHANNEL_UPLOADS = 'UUkMLbf6BLoqapmfbDECYVtQ';

  function init() {
    var strip = document.getElementById('latestStrip');
    if (!strip) { return; }

    var key = window.YT_API_KEY;
    if (key) {
      fetchLive(strip, key);
    } else {
      var baked = window.LATEST_VIDEOS;
      var items = Array.isArray(baked) ? baked : (baked && baked.videos ? baked.videos : []);
      if (items.length) {
        renderLatest(strip, items.slice(0, 8));
      } else {
        console.warn('[yt.js] No data source available; latest strip hidden.');
        strip.closest('.latest-wrap').style.display = 'none';
      }
    }
  }

  function fetchLive(strip, key) {
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems' +
      '?part=snippet&playlistId=' + CHANNEL_UPLOADS +
      '&maxResults=8&key=' + key;
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      var items = (data.items || []).map(function (i) {
        return {
          id: i.snippet.resourceId ? i.snippet.resourceId.videoId : '',
          title: i.snippet.title,
          thumb: (i.snippet.thumbnails.medium || i.snippet.thumbnails.default || {}).url
        };
      }).filter(function (v) { return v.id; });
      if (items.length) { renderLatest(strip, items); }
    }).catch(function (err) {
      console.warn('[yt.js] live fetch failed, using snapshot:', err);
      var baked = window.LATEST_VIDEOS;
      var items = Array.isArray(baked) ? baked : [];
      if (items.length) { renderLatest(strip, items.slice(0, 8)); }
    });
  }

  function renderLatest(strip, items) {
    if (strip.dataset.rendered) { return; }
    strip.dataset.rendered = '1';

    items.forEach(function (v) {
      var a = document.createElement('a');
      a.href = 'https://www.youtube.com/watch?v=' + v.id;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'latest-card';
      a.setAttribute('role', 'listitem');

      var img = document.createElement('img');
      img.src = v.thumb;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';

      var t = document.createElement('p');
      t.className = 'latest-title';
      t.textContent = v.title;

      a.appendChild(img);
      a.appendChild(t);

      if (v.duration || v.published) {
        var meta = document.createElement('span');
        meta.className = 'latest-meta';
        meta.textContent = [v.duration, v.published].filter(Boolean).join(' · ');
        a.appendChild(meta);
      }

      strip.appendChild(a);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
