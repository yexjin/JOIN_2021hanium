/* eslint-disable no-multi-str */
import Boom from "@hapi/boom";
import { v4 as UUID } from "uuid";
import * as CommonMd from "../middlewares";

export const createDiscussMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { content, memberId, assignmentTeamId } = ctx.request.body;

  await conn.query(
    "INSERT INTO tb_discuss(id, content, member_id, assignment_team_id) \
    VALUES (?, ?, ?, ?)",
    [UUID(), content, memberId, assignmentTeamId]
  );

  await next();
};

export const removeDiscussMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { id } = ctx.params;

  await conn.query("DELETE FROM tb_discuss WHERE id = ?", [id]);

  await next();
};

export const readDiscussMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { assignmentTeamId } = ctx.params;

  const rows = await conn.query(
    // eslint-disable-next-line max-len
    "SELECT d.id, m.name, d.content, d.createdAt \
    FROM tb_discuss d \
    JOIN tb_member m ON m.id = d.member_id \
    WHERE d.assignment_team_id = ?\
    ORDER BY d.createdAt ASC",
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
  createDiscussMd,
  CommonMd.responseMd,
];

export const remove = [
  CommonMd.createConnectionMd,
  removeDiscussMd,
  CommonMd.responseMd,
];

export const readAll = [
  CommonMd.createConnectionMd,
  readDiscussMd,
  CommonMd.responseMd,
];
