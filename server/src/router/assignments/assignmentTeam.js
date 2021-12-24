import * as CommonMd from "../middlewares";
import fs from "fs";
import path from "path";

export const getDataFromBodyMd = async (ctx, next) => {
  const { contents } = ctx.request.body;

  ctx.state.reqBody = {
    contents,
  };
  await next();
};

export const updateAssignmentTeamMd = async (ctx, next) => {
  const { conn } = ctx.state;

  const { assignmentId } = ctx.params;
  const { memberId } = ctx.params;
  console.log(memberId);
  console.log(assignmentId);
  const { contents } = ctx.state.reqBody;
  const file = ctx.request.files === undefined ? null : ctx.request.files.file;
  let fileName = null;
  if(file!=null){
    const appDir = path.dirname(file.path);
    fileName = `${Date.now()}_${file.name}`;
    await fs.renameSync(file.path, `${appDir}/${fileName}`);
  }
  const rows = await conn.query(
    "SELECT at.id " +
      "FROM tb_assignment_team at " +
      "JOIN tb_team t ON t.id = at.team_id " +
      "JOIN tb_team_member tm ON tm.team_id = t.id " +
      "WHERE tm.member_id = ? AND at.assignment_id = ?",
    [memberId, assignmentId]
  );
  const id = rows[0].id;
  await conn.query(
    "UPDATE tb_assignment_team SET contents = ?, file = ? " + "WHERE id = ?",
    [contents, fileName, id]
  );
  ctx.state.id = id;
  await next();
};

export const queryAssignmentTeamMd = async (ctx, next) => {
  const { id } = ctx.state;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT id, isCheck, assignment_id, team_id, contents, file From tb_assignment_team WHERE id = ?",
    [id]
  );

  ctx.state.body = {
    ...rows[0],
  };

  await next();
};

export const readAssignmentTeamMd = async (ctx, next) => {
  const { id } = ctx.params;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT id, isCheck, assignment_id, team_id, contents, file From tb_assignment_team WHERE id = ?",
    [id]
  );

  ctx.state.body = {
    ...rows[0],
  };

  await next();
};

export const queryAssignmentTeamByteamIdMd = async (ctx, next) => {
  const { assignmentId, teamId } = ctx.params;
  const { conn } = ctx.state;
  const rows = await conn.query(
    "SELECT * FROM tb_assignment_team WHERE assignment_id = ? AND team_id = ?",
    [assignmentId, teamId]
  );

  ctx.state.body = {
    ...rows[0],
  };

  await next();
};

export const submit = [
  CommonMd.createConnectionMd,
  getDataFromBodyMd,
  updateAssignmentTeamMd,
  queryAssignmentTeamMd,
  CommonMd.responseMd,
];

export const read = [
  CommonMd.createConnectionMd,
  readAssignmentTeamMd,
  CommonMd.responseMd,
];

export const query = [
  CommonMd.createConnectionMd,
  queryAssignmentTeamByteamIdMd,
  CommonMd.responseMd,
];
