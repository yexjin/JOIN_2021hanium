import Boom from "@hapi/boom";
import * as CommonMd from "../middlewares";
import { insertStudentTeamMd } from "../teams/teams";

export const readReportAllMd = async (ctx, next) => {
  const { skip, limit } = ctx.state.query;
  const { classCode } = ctx.params;
  const { dbPool } = ctx;
  const conn = await dbPool.getConnection();
  let sql =
    "select at.id, t.name, at.file " +
    "from tb_assignment_team at " +
    "JOIN tb_team t ON at.team_id = t.id " +
    "WHERE t.class_code = ? AND at.file IS NOT NULL LIMIT ?, ?";
  const rows = await conn.query(sql, [classCode, skip, limit]);
  // sql =
  // "select t.id AS team_id, m.name, m.department "
  // + "FROM tb_member m "
  // + "JOIN tb_team_member tm ON m.id = tm.member_id "
  // + "JOIN tb_team t ON tm.team_id = t.id";

  // const members = await conn.query(sql);
  // for (let i = 0; i<rows.length; i+=1) {
  //   const t = await conn.query(sql, [rows[i].team_id]);
  //   rows[i].team = t;
  // }
  // for (let i=0; i<rows.length; i+=1) {
  //   const t = members.filter((item)=> {if(rows[i].team_id===item.team_id) return true;});
  //   rows[i].team = t;
  // }

  ctx.state.conn = conn;
  ctx.state.params = { classCode };
  ctx.state.body = {
    results: rows,
  };

  await next();
};

export const readReportAllCountMd = async (ctx, next) => {
  const { skip, limit } = ctx.state.query;
  const { classCode } = ctx.state.params;
  const conn = ctx.state.conn;

  const sql =
    "select COUNT(*) AS count " +
    "from tb_assignment_team at " +
    "JOIN tb_team t ON at.team_id = t.id " +
    "WHERE t.class_code = ? AND at.file IS NOT NULL LIMIT ?, ?";
  const rows = await conn.query(sql, [classCode, skip, limit]);

  ctx.state.body = {
    ...ctx.state.body,
    total: rows[0].count,
  };

  await next();
};

export const readReportByTeamMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { classCode } = ctx.params;

  const rows = await conn.query(
    "SELECT * FROM tb_team WHERE class_code = ? ORDER BY name ASC",
    [classCode]
  );

  const assignments = await conn.query(
    "SELECT t.id as team_id,a.point as maxPoint, a.name as assignmentName, at.isCheck, at.report_file, at.point \
    FROM tb_team t JOIN tb_assignment_team at ON t.id = at.team_id \
    JOIN tb_assignment a ON a.id = at.assignment_id\
    WHERE t.class_code = ? ORDER BY a.createdAt ASC",
    [classCode]
  );

  for (let i = 0; i < rows.length; i += 1) {
    const t = assignments.filter((item) => {
      if (rows[i].id === item.team_id) return true;
    });
    rows[i].assignment = t;
  }

  ctx.state.body = {
    count: rows.length,
    results: rows,
  };
  await next();
};

export const readReportByAssignmentMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { classCode } = ctx.params;

  const rows = await conn.query(
    "SELECT id, name FROM tb_assignment WHERE class_code = ? ORDER BY createdAt ASC",
    [classCode]
  );

  const teams = await conn.query(
    "SELECT a.id as assignment_id, t.name as teamName, a.point as maxPoint,at.isCheck, at.report_file, at.point \
    FROM tb_assignment a JOIN tb_assignment_team at ON a.id = at.assignment_id \
    JOIN tb_team t ON t.id = at.team_id\
    WHERE t.class_code = ? ORDER BY t.name ASC",
    [classCode]
  );

  for (let i = 0; i < rows.length; i += 1) {
    const t = teams.filter((item) => {
      if (rows[i].id === item.assignment_id) return true;
    });
    rows[i].team = t;
  }

  ctx.state.body = {
    count: rows.length,
    results: rows,
  };
  await next();
};

export const readAll = [
  CommonMd.validataListParamMd,
  readReportAllMd,
  readReportAllCountMd,
  CommonMd.responseMd,
];

export const readReportByTeam = [
  CommonMd.createConnectionMd,
  readReportByTeamMd,
  CommonMd.responseMd,
];

export const readReportByAssignment = [
  CommonMd.createConnectionMd,
  readReportByAssignmentMd,
  CommonMd.responseMd,
];
