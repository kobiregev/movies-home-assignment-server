require("dotenv").config();
import express from "express";
import config from "config";
import router from "./routes";

const port = config.get("port");
const app = express();

app.use(router);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
