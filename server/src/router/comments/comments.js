import Boom from "@hapi/boom";
import { v4 as UUID } from "uuid";
import * as CommonMd from "../middlewares";

export const getDataFromBodyMd = async (ctx, next) => {
  const { memberId, assignmentId, contents } = ctx.request.body;

  console.log(ctx.request.body);

  ctx.state.reqBody = {
    memberId,
    assignmentId,
    contents,
  };

  await next();
};

export const validateDataMd = async (ctx, next) => {
  const { memberId, assignmentId, contents } = ctx.state.reqBody;

  if (!memberId || !assignmentId || !contents) {
    throw Boom.badRequest("field is not fulfiled");
  }

  await next();
};

export const createCommentMd = async (ctx, next) => {
  const { memberId, assignmentId, contents } = ctx.state.reqBody;
  const { conn } = ctx.state;

  await conn.query(
    "INSERT INTO tb_comment(id, contents, member_id, assignment_id) \
    VALUES (?,?,?,?)",
    [UUID(), contents, memberId, assignmentId]
  );

  await next();
};

export const readCommentAllMd = async (ctx, next) => {
  const { skip, limit } = ctx.state.query;
  const { assignmentId } = ctx.params;
  const { conn } = ctx.state;

  const rows = await conn.query(
    // eslint-disable-next-line max-len
    "SELECT C.id, C.createdAt, C.contents, M.name, M.id as memberId FROM tb_comment C \
    JOIN tb_member M ON C.member_id = M.id \
    WHERE C.assignment_id=? \
    ORDER BY C.createdAt ASC \
    LIMIT ?, ?",
    [assignmentId, skip, limit]
  );

  ctx.state.body = {
    results: rows,
    total: rows.length,
  };

  await next();
};

export const removeCommentMd = async (ctx, next) => {
  const { conn } = ctx.state;

  const { id } = ctx.params;

  await conn.query("DELETE FROM tb_comment WHERE id = ?", [id]);
  await next();
};

export const create = [
  CommonMd.createConnectionMd,
  getDataFromBodyMd,
  validateDataMd,
  createCommentMd,
  CommonMd.responseMd,
];

export const readAll = [
  CommonMd.createConnectionMd,
  CommonMd.validataListParamMd,
  readCommentAllMd,
  CommonMd.responseMd,
];

export const remove = [
  CommonMd.createConnectionMd,
  removeCommentMd,
  CommonMd.responseMd,
];
