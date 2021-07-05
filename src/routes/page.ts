import * as express from "express";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.render("main");
});

export default router;
