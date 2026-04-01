import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..', '..');
const WEB_DIR = path.join(ROOT_DIR, 'web');
const DIST_PATH = path.join(WEB_DIR, 'dist');
const WEB_PORT = 3000;

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.txt': 'text/plain',
    '.webmanifest': 'application/manifest+json',
    '.xml': 'application/xml',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

function serveStatic(req, res) {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') {
    urlPath = '/index.html';
  }
  let filePath = path.join(DIST_PATH, urlPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_PATH, 'index.html');
  }

  const mimeType = getMimeType(filePath);

  res.setHeader('Content-Type', mimeType);
  res.setHeader('Access-Control-Allow-Origin', '*');

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    res.writeHead(200);
    res.end(content);
  });
}

function openBrowser(url) {
  const platform = process.platform;
  let command;
  let args;

  if (platform === 'win32') {
    command = 'cmd';
    args = ['/c', 'start', url];
  } else if (platform === 'darwin') {
    command = 'open';
    args = [url];
  } else {
    command = 'xdg-open';
    args = [url];
  }

  spawn(command, args, { detached: true, stdio: 'ignore' }).unref();
}

export async function web() {
  if (!fs.existsSync(DIST_PATH)) {
    console.log(chalk.yellow('\n⚠ Web app not built yet. Building now...\n'));

    const webPackageJson = path.join(WEB_DIR, 'package.json');
    if (!fs.existsSync(webPackageJson)) {
      console.error(
        chalk.red(
          '\n✗ Error: web folder not found. Please ensure you have the complete package.\n'
        )
      );
      process.exit(1);
    }

    const buildProcess = spawn('npm', ['run', 'build'], {
      cwd: WEB_DIR,
      stdio: 'inherit',
      shell: true,
    });

    buildProcess.on('close', code => {
      if (code !== 0) {
        console.error(chalk.red('\n✗ Build failed\n'));
        process.exit(1);
      }
      startServer();
    });
  } else {
    startServer();
  }
}

function startServer() {
  let isShuttingDown = false;
  const server = http.createServer((req, res) => {
    serveStatic(req, res);
  });

  server.listen(WEB_PORT, () => {
    const url = `http://localhost:${WEB_PORT}`;
    console.log(chalk.green('\n✓ MyRevisor Web Server Started!'));
    console.log(chalk.cyan(`\n  Local:   ${chalk.underline(url)}`));
    console.log(chalk.gray('\n  Press Ctrl+C to stop\n'));

    openBrowser(url);
  });

  const shutdown = () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(chalk.yellow('\n\nShutting down server...'));
    server.close(() => {
      console.log(chalk.green('Server closed.'));
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
