import Router from "@koa/router";
import * as discuss from "./discuss";

const router = new Router();

// 토론 댓글 생성
router.post("/", ...discuss.create);

router.get("/:assignmentTeamId", ...discuss.readAll);

router.delete("/:id", ...discuss.remove);

export default router;
