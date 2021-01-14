const server = require("./server/api");

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
