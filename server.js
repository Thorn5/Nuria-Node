const http = require("node:http");
//const {getGreeting} = require("./greeting");
//import { getGreeting } from "./greeting";

const PORT = 8001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const data = {
    message: "Hello, world!",
    timestamp: new Date().toISOString(),
  };
  const jsonData = JSON.stringify(data);
  res.end(jsonData);
});

server.on("error", (error) => {
    console.error(error);
});

server.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});

//console.log(getGreeting("Ale"))