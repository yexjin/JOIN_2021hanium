import Router from "@koa/router";
import * as downloads from "./downloads";

const router = new Router();

router.get("/:fileName", ...downloads.create);

export default router;
