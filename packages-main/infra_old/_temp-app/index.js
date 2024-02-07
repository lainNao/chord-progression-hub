const PORT = process.env.PORT || 8080;

require("http")
  .createServer((_, res) => {
    res.end("Hello World");
  })
  .listen(PORT);
