import Router from "@koa/router";
import * as teams from "./teams";

const router = new Router();

// 팀 생성
router.post("/:classCode", ...teams.create);

// 랜덤 팀 생성
router.post("/random/:classCode", ...teams.randomTeam);

// 팀 전체 조회
router.get("/:classCode", ...teams.readAll);

// 학생 본인 팀 조회
router.get("/", ...teams.readStudentTeam);

// 팀이 없는 학생 조회
router.get("/noTeam/:classCode", ...teams.studentsNoTeam);

// 팀에서 학생 제거
router.delete("/students", ...teams.deleteStudentTeam);

// 팀에 학생 추가
router.post("/students/:classCode", ...teams.insertStudentTeam);

// 팀 삭제
router.delete("/:teamId", ...teams.removeTeam);

export default router;
