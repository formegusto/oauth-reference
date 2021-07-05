import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import nunjucks from "nunjucks";
import path from "path";

dotenv.config();

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
app.use("/styles", express.static(path.join(__dirname, "/public/styles")));

/* Route */
import pageRouter from "./routes/page";
app.use("/", pageRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Open!");
});
