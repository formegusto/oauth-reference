import * as express from "express";

const app = express();

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("Oauth Reference");
  }
);

app.listen(3000, () => {
  console.log("3000번 포트 오픈");
});
