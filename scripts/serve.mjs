// Tiny static server for the built site (mimics Vercel cleanUrls). Usage: node scripts/serve.mjs [port]
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
const OUT = 'dist/client'
const port = Number(process.argv[2] ?? 4173)
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.webp': 'image/webp', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json' }
http
  .createServer((req, res) => {
    let f = path.join(OUT, decodeURIComponent(req.url.split('?')[0]))
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html')
    if (!fs.existsSync(f)) {
      res.writeHead(404, { 'content-type': MIME['.html'] })
      return res.end(fs.readFileSync(path.join(OUT, '404.html')))
    }
    const headers = { 'content-type': MIME[path.extname(f)] ?? 'application/octet-stream' }
    if (f.includes(`${path.sep}assets${path.sep}`)) headers['cache-control'] = 'public, max-age=31536000, immutable'
    res.writeHead(200, headers)
    fs.createReadStream(f).pipe(res)
  })
  .listen(port, () => console.log(`Serving ${OUT} on http://localhost:${port}`))
