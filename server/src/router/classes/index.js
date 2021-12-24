import Router from "@koa/router";
import * as classes from "./classes";

const router = new Router();

// 교수님 강의 조회
router.get("/professor/:memberId", ...classes.readProfessorAll);

// 학생 수업 조회
router.get("/student/:memberId", ...classes.readStudentAll);

// 강의 생성
router.post("/", ...classes.create);

router.get("/:code", ...classes.readOne);

export default router;
