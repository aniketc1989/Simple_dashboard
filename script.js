const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.url === '/executeScript') {
    exec('/bin/sh shell_script.sh', (error, stdout) => {
      if (error) {
        res.statusCode = 500;
        res.end('An error occurred while executing the script.');
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.end(stdout);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not found.');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
