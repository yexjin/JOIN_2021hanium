import * as CommonMd from "../middlewares";
import { v4 as UUID } from "uuid";

export const createChatMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { memberId, assignmentTeamId, contents } = ctx.request.body;

  const id = UUID();
  ctx.state.id = id;

  await conn.query(
    "INSERT INTO tb_chat(id, member_id, contents, assignment_team_id) VALUES (?, ?, ?, ?)",
    [id, memberId, contents, assignmentTeamId]
  );

  await next();
};

export const queryChatMd = async (ctx, next) => {
  const { conn, io, id } = ctx.state;
  const { assignmentTeamId } = ctx.request.body;

  const response = await conn.query(
    "SELECT m.id, m.name, m.profileImg, c.contents, c.createdAt \
    FROM tb_chat c JOIN tb_member m ON c.member_id = m.id\
    WHERE c.id = ?",
    [id]
  );

  const nsp = io.of(`/${assignmentTeamId}`);
  nsp.emit("message", response);
  await next();
};

export const readChatLogMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { assignmentTeamId } = ctx.params;
  const rows = await conn.query(
    "SELECT m.id, m.name, m.profileImg, c.contents, c.createdAt \
    FROM tb_chat c JOIN tb_member m ON c.member_id = m.id\
    WHERE c.assignment_team_id = ? ORDER BY c.createdAt ASC",
    [assignmentTeamId]
  );

  ctx.state.body = {
    count: rows.length,
    results: rows,
  };

  await next();
};

export const create = [
  CommonMd.createConnectionMd,
  createChatMd,
  queryChatMd,
  CommonMd.responseMd,
];

export const readChatLog = [
  CommonMd.createConnectionMd,
  readChatLogMd,
  CommonMd.responseMd,
];
