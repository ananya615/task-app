const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;

// Function to serve static files from React build
function serveStaticFile(filePath, contentType, response) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        response.writeHead(500);
        response.end(`Server Error: ${err.code}`);
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let filePath = path.join(__dirname, '../client/build', parsedUrl.pathname);

  // API routes (example)
  if (req.url === '/api/tasks') {
    const tasks = [
      { id: 1, title: 'Sample Task 1', status: 'Pending' },
      { id: 2, title: 'Sample Task 2', status: 'Completed' },
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
    return;
  }

  // Serve static files
  if (filePath.endsWith('/')) filePath += 'index.html';
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Fallback to index.html for React routes
  fs.exists(filePath, (exists) => {
    if (!exists && !filePath.includes('/api/')) {
      filePath = path.join(__dirname, '../client/build', 'index.html');
    }
    serveStaticFile(filePath, contentType, res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
