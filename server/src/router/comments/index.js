import Router from "@koa/router";
import * as comments from "./comments";

const router = new Router();

// 생성
router.post("/", ...comments.create);

// 조회
router.get("/:assignmentId", ...comments.readAll);

// 삭제
router.delete("/:id", ...comments.remove);

export default router;
