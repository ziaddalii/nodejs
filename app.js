// Core Module
const http = require("http");
const books = [
    {
        id:1,
        name:"book 1"
    },
    {
        id:2,
        name:"book 2"
    },
]
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<h1>Welcome to NODE JS</h1>");
    res.end();
  }
  if (req.url === "/api/books") {
    res.write(JSON.stringify(books));
    res.end();
  }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const { log } = require("./logger");
console.log("welcome to node js");

log();
