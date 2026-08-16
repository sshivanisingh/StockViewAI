const dns = require("node:dns");

const mongoose = require("mongoose");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const string = process.env.URI;

mongoose
  .connect(string)
  .then(() => console.log(`DB connected 🎉`))
  .catch((err) => console.error(`DB Connection Error: ${err.message}`));
