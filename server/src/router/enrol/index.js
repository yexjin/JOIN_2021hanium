import Router from "@koa/router";
import * as enrol from "./enrol";

const router = new Router();

//학생이 수강신청 누른 경우
router.post("/", ...enrol.create);

//수강신청 목록
router.get("/:classCode", ...enrol.readEnrol);

//수강생 목록
router.get("/students/:classCode", ...enrol.readStudent);

// 교수님이 수강생 목록에서 수락을 누른 경우
router.put("/", ...enrol.accept);

// 교수님이 수강 신청 목록에서 거절을 누른 경우
router.delete("/", ...enrol.reject);

// 교수님이 수강생을 삭제한 경우
router.delete("/students", ...enrol.remove);

export default router;
