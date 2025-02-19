// index.js
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory path (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  // Get the path from the URL
  const url = req.url === "/" ? "/index.html" : req.url;

  // Map URLs to HTML files
  let filePath;
  switch (url) {
    case "/index.html":
      filePath = path.join(__dirname, "index.html");
      break;
    case "/about":
      filePath = path.join(__dirname, "about.html");
      break;
    case "/contact-me":
      filePath = path.join(__dirname, "contact-me.html");
      break;
    default:
      filePath = path.join(__dirname, "404.html");
  }

  // Read the file and serve it
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If file reading error occurs, serve 404
      fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content, "utf-8");
      });
      return;
    }

    // Serve the requested page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content, "utf-8");
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
