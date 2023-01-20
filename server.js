//Code from Steven Bradley, our course lecturer!
//From: https://github.com/stevenaeola/progblack_2223/blob/main/Pasta/server.js
const app = require("./app.js");

const hostname = "127.0.0.1";
const port = 8090;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ -- yippee!`);
});
