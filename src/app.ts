import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import nunjucks from "nunjucks";
import path from "path";
import http from "http";
import https from "https";
import fs from "fs";

dotenv.config();

const cert = {
  key: fs.readFileSync(path.join(__dirname, "/cert/localhost.key")),
  cert: fs.readFileSync(path.join(__dirname, "/cert/localhost.crt")),
};

/* Basic Config */
const app = express();
app.set("port", process.env.PORT || 80);
app.set("view engine", "html");

/* Nunjucks Config */
nunjucks.configure("src/views", {
  express: app,
  watch: true,
});

/* MiddleWare Config */
app.use(morgan("dev"));
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));
app.use("/styles", express.static(path.join(__dirname, "/public/styles")));

/* Route */
import pageRouter from "./routes/page";
app.use("/", pageRouter);

https.createServer(cert, app).listen(app.get("port"), () => {
  console.log(app.get("port"), "Open!");
});
