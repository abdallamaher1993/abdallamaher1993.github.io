#!/usr/bin/env node
/* ============================================================
   dev-server.js — Zero-dependency static server for local dev.
   Usage: node admin/dev-server.js [--host 127.0.0.1] [--port 7100]
   Forwards npm run dev args: npm run dev -- --port 8000
   ============================================================ */

'use strict';

var http = require('http');
var fs = require('fs');
var path = require('path');

var root = path.resolve(__dirname, '..');

var host = '127.0.0.1';
var port = 7100;

var argv = process.argv.slice(2);
for (var i = 0; i < argv.length; i++) {
  var a = argv[i];
  if (a === '--host' && argv[i + 1]) host = argv[++i];
  else if (a.indexOf('--host=') === 0) host = a.slice(7);
  else if (a === '--port' && argv[i + 1]) port = parseInt(argv[++i], 10);
  else if (a.indexOf('--port=') === 0) port = parseInt(a.slice(7), 10);
  else if (a === '-p' && argv[i + 1]) port = parseInt(argv[++i], 10);
}
if (process.env.HOST) host = process.env.HOST;
if (process.env.PORT) port = parseInt(process.env.PORT, 10);

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4'
};

var server = http.createServer(function (req, res) {
  var urlPath = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
  var filePath = path.normalize(path.join(root, urlPath));

  if (filePath.indexOf(root) !== 0) { /* traversal guard */
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, function (err, stat) {
    if (!err && stat.isDirectory()) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, function (readErr, data) {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 — Not found: ' + urlPath);
        return;
      }
      var ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      res.end(data);
    });
  });
});

server.listen(port, host, function () {
  console.log('hermes-agent site dev server');
  console.log('  Site:    http://' + host + ':' + port + '/');
  console.log('  Admin:   http://' + host + ':' + port + '/admin/');
  console.log('  (Ctrl+C to stop)');
});
