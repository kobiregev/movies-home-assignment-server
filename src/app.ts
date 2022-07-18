require("dotenv").config();
import express from "express";
import config from "config";
import router from "./routes";
import cors from "cors";

const port = config.get("port") || 3000;
const app = express();

app.use(cors());
app.use(router);

app.get("/", (_, res) => {
  return res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
