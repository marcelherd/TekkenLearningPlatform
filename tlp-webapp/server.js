const { createServer } = require('http');
const { parse } = require('url');

const next = require('next');
const conf = require('./next.config');
const open = require('open');

const app = next({ dev: false, conf, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res, parse(req.url, true).pathname)).listen(
    3000,
    (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:3000`);
      open('http://localhost:3000');
    },
  );
});
