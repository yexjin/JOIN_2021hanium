import Router from "@koa/router";
import * as terms from "./terms";

const router = new Router();

// 학생 본인 팀 조회
router.get("/", ...terms.terms);

export default router;
