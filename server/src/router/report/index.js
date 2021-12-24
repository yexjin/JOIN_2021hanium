import Router from "@koa/router";
import * as report from "./report";

const router = new Router();

// 팀 전체 조회
router.get("/:classCode", ...report.readAll);

// 팀별 과제 조회
router.get("/byTeam/:classCode", ...report.readReportByTeam);

// 과제별 팀 조회
router.get("/byAssignment/:classCode", ...report.readReportByAssignment);

export default router;
