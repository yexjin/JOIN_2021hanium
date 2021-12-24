import Router from "@koa/router";
import * as assignments from "./assignments";
import * as assignmentTeam from "./assignmentTeam";

const router = new Router();

// 생성
router.post("/", ...assignments.create);

// 전체 과제 조회
router.get("/", ...assignments.readAll);

//classCode 별 과제 조회
router.get("/byClassCode/:classCode", ...assignments.readByClassCode);

// memberId별 조회
router.get("/byStudent/:memberId", ...assignments.readByStudent);

router.get("/byProfessor/:memberId", ...assignments.readByProfessor);

// assignmentId&teamId 조회
// router.get("/", ...assignments.readByClass);

// teamId별 조회
router.get("/byTeam/:id", ...assignments.readByTeam);

// 상세 과제 조회
router.get("/:id", ...assignments.readId);

// 수정
router.put("/:id", ...assignments.update);

// 삭제
router.delete("/:id", ...assignments.remove);

// 제출
router.post("/submit/:assignmentId/:memberId", ...assignmentTeam.submit);

// 제출 확인
router.get("/team/:id", ...assignmentTeam.read);

router.get("/assignmentTeam/:assignmentId/:teamId", ...assignmentTeam.query);

export default router;
