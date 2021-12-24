import Boom from "@hapi/boom";
import { v4 as UUID } from "uuid";
import * as CommonMd from "../middlewares";
import fs from "fs";
import path from "path";

export const getDataFromBodyMd = async (ctx, next) => {
  const {
    name,
    content,
    progress,
    point,
    startDate,
    endDate,
    image,
    classCode,
  } = ctx.request.body;

  ctx.state.reqBody = {
    name,
    content,
    progress,
    point,
    startDate,
    endDate,
    image,
    classCode,
  };

  await next();
};

export const validateDataMd = async (ctx, next) => {
  const { name, point, startDate, endDate, classCode } = ctx.state.reqBody;

  if (!name || !point || !startDate || !endDate || !classCode) {
    throw Boom.badRequest("field is not fulfiled");
  }

  await next();
};

export const saveAssignmentMd = async (ctx, next) => {
  const {
    name,
    content,
    progress,
    point,
    startDate,
    endDate,
    classCode,
    teams,
  } = ctx.request.body;

  let array = [];
  if (teams !== "") {
    array = teams.split(/,\s?/);
  }
  const image =
    ctx.request.files === undefined ? null : ctx.request.files.image;

  const answerFile =
    ctx.request.files === undefined ? null : ctx.request.files.answerFile;

  if (image != null) {
    var appDir = path.dirname(image.path);
    await fs.renameSync(image.path, `${appDir}/${image.name}`);
  }

  if (answerFile != null) {
    var appDir = path.dirname(answerFile.path);
    await fs.renameSync(answerFile.path, `${appDir}/${answerFile.name}`);
  }

  const { conn } = ctx.state;

  const assignmentId = UUID();
  const imageName = image ? image.name : null;
  const answerFileName = answerFile ? answerFile.name : null;
  const payload = [];
  await conn.query(
    // eslint-disable-next-line max-len
    "INSERT INTO tb_assignment(id, name, content, progress, point, startDate, endDate, image, class_code, answerFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      assignmentId,
      name,
      content,
      progress,
      point,
      startDate,
      endDate,
      imageName,
      classCode,
      answerFileName,
    ]
  );

  for (let i = 0; i < array.length; i += 1) {
    payload.push([UUID(), 0, assignmentId, array[i], null, null]);
  }
  if (array.length) {
    await conn.batch(
      // eslint-disable-next-line max-len
      "INSERT INTO tb_assignment_team(id, isCheck, assignment_id, team_id, contents, file) VALUES (?, ?, ?, ?, ?, ?)",
      payload
    );
  }
  ctx.state.id = assignmentId;

  await next();
};

export const queryAssignmentMd = async (ctx, next) => {
  const { id } = ctx.state;
  const { conn } = ctx.state;

  const rows = await conn.query(
    // eslint-disable-next-line max-len
    "SELECT id, name, content, progress, point, startDate, endDate, image, answerFile, class_code FROM tb_assignment WHERE id = ?",
    [id]
  );

  ctx.state.body = {
    ...rows[0],
    success: true,
  };

  await next();
};

export const readAssignmentAllMd = async (ctx, next) => {
  const { skip, limit } = ctx.state.query;
  const { classCode, assignmentId, teamId } = ctx.query;
  const { conn } = ctx.state;

  let rows;
  if (teamId && assignmentId) {
    rows = await conn.query(
      // eslint-disable-next-line max-len
      "SELECT a.id, a.name, a.progress, a.endDate " +
        "FROM tb_assignment a " +
        "JOIN tb_assignment_team at ON at.assignment_id = a.id " +
        "JOIN tb_team t ON t.id = at.team_id " +
        "WHERE a.id = ? AND t.id = ? LIMIT ?, ?",
      [assignmentId, teamId, skip, limit]
    );
  } else if (classCode) {
    rows = await conn.query(
      // eslint-disable-next-line max-len
      "SELECT id, name, content, progress, point, startDate, endDate, image, class_code FROM tb_assignment WHERE class_code = ? LIMIT ?, ?",
      [classCode, skip, limit]
    );
  } else {
    rows = await conn.query(
      "SELECT id, name, content, progress, point, startDate, endDate, image, class_code FROM tb_assignment LIMIT ?, ?",
      [skip, limit]
    );
  }

  ctx.state.body = {
    count: rows.length,
    results: rows,
  };

  ctx.state.query = {
    ...ctx.state.query,
    classCode,
  };

  await next();
};

export const readAssignmentAllCountMd = async (ctx, next) => {
  const { conn } = ctx.state;
  const { classCode } = ctx.state.query;
  let rows;
  if (classCode) {
    rows = await conn.query(
      "SELECT COUNT(*) AS count  FROM tb_assignment WHERE class_code = ?",
      [classCode]
    );
  } else {
    rows = await conn.query("SELECT COUNT(*) AS count  FROM tb_assignment");
  }
  ctx.state.body = {
    ...ctx.state.body,
    total: rows[0].count,
  };

  await next();
};

export const readAssignmentByIdMd = async (ctx, next) => {
  const { id } = ctx.params;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT id, name, content, progress, point, startDate, endDate, image, class_code, answerFile FROM tb_assignment WHERE id = ?",
    [id]
  );

  const teams = await conn.query(
    // eslint-disable-next-line max-len
    "SELECT at.id, t.name, at.isCheck, at.team_id FROM tb_assignment_team at JOIN tb_team t ON at.team_id = t.id WHERE at.assignment_id = ?",
    [id]
  );

  ctx.state.body = {
    ...rows[0],
    team: teams,
  };

  await next();
};

export const readAssginmentByClassCodeMd = async (ctx, next) => {
  const { classCode } = ctx.params;
  const { conn } = ctx.state;
  const rows = await conn.query(
    "SELECT id, name, content, progress, point, startDate, endDate, image, class_code FROM tb_assignment WHERE class_code = ? ORDER BY createdAt ASC",
    [classCode]
  );

  ctx.state.body = {
    results: rows,
    count: rows.length,
  };

  await next();
};

export const removeAssignmentMd = async (ctx, next) => {
  const { conn } = ctx.state;

  const { id } = ctx.params;

  await conn.query("DELETE FROM tb_assignment WHERE id = ?", [id]);

  ctx.state.body = {
    ...ctx.state.body,
    success: true,
  };

  await next();
};

export const updateAssignmentMd = async (ctx, next) => {
  const { id } = ctx.params;
  const { conn } = ctx.state;
  const payload = [];

  const {
    name,
    content,
    progress,
    point,
    startDate,
    endDate,
    classCode,
    teams,
  } = ctx.request.body;
  let array = [];
  if (teams !== "") {
    array = teams.split(/,\s?/);
  }
  const image =
    ctx.request.files === undefined ? null : ctx.request.files.image;
  const answerFile =
    ctx.request.files === undefined ? null : ctx.request.files.answerFile;

  if (image != null) {
    var appDir = path.dirname(image.path);
    await fs.renameSync(image.path, `${appDir}/${image.name}`);
  }

  if (answerFile != null) {
    var appDir = path.dirname(answerFile.path);
    await fs.renameSync(answerFile.path, `${appDir}/${answerFile.name}`);
  }

  const imageName = image ? image.name : null;
  const answerFileName = answerFile ? answerFile.name : null;

  if (imageName === null && answerFileName === null) {
    const sql =
      // eslint-disable-next-line max-len
      "UPDATE tb_assignment SET name = ?, content = ?, progress = ?, point = ?, startDate = ?, endDate = ?, class_code = ? WHERE id = ?";
    await conn.query(sql, [
      name,
      content,
      progress,
      point,
      startDate,
      endDate,
      classCode,
      id,
    ]);
  } else if (imageName === null) {
    const sql =
      "UPDATE tb_assignment \
      SET name = ?, content = ?, progress = ?, point = ?, startDate = ?, endDate = ?, class_code = ?, answerFile=?  WHERE id = ?";
    await conn.query(sql, [
      name,
      content,
      progress,
      point,
      startDate,
      endDate,
      classCode,
      answerFileName,
      id,
    ]);
  } else if (answerFileName === null) {
    const sql =
      "UPDATE tb_assignment \
      SET name = ?, content = ?, progress = ?, point = ?, startDate = ?, endDate = ?, image = ?, class_code = ?  WHERE id = ?";
    await conn.query(sql, [
      name,
      content,
      progress,
      point,
      startDate,
      endDate,
      imageName,
      classCode,
      id,
    ]);
  } else {
    const sql =
      // eslint-disable-next-line max-len
      "UPDATE tb_assignment SET name = ?, content = ?, progress = ?, point = ?, startDate = ?, endDate = ?, image = ?, class_code = ?, answerFile=?  WHERE id = ?";
    await conn.query(sql, [
      name,
      content,
      progress,
      point,
      startDate,
      endDate,
      imageName,
      classCode,
      answerFileName,
      id,
    ]);
  }
  await conn.query("DELETE FROM tb_assignment_team WHERE assignment_id = ?", [
    id,
  ]);

  if (!array) return next();

  for (let i = 0; i < array.length; i += 1) {
    payload.push([UUID(), 0, id, array[i], null, null]);
  }
  if (array.length) {
    await conn.batch(
      // eslint-disable-next-line max-len
      "INSERT INTO tb_assignment_team(id, isCheck, assignment_id, team_id, contents, file) VALUES (?, ?, ?, ?, ?, ?)",
      payload
    );
  }

  await next();
};

export const queryAssignmentMdById = async (ctx, next) => {
  const { id } = ctx.params;
  const { conn } = ctx.state;

  const sql =
    // eslint-disable-next-line max-len
    "SELECT id, name, content, progress, point, startDate, endDate, image, class_code FROM tb_assignment WHERE id = ?";
  const rows = await conn.query(sql, [id]);

  ctx.state.body = {
    ...rows[0],
  };

  await next();
};

export const readAssignmentByStudentMd = async (ctx, next) => {
  const { memberId } = ctx.params;
  const { skip, limit } = ctx.state.query;
  const { conn } = ctx.state;

  const row = await conn.query(
    "select c.name as className, a.class_code, a.name, at.isCheck, a.startDate, a.endDate \
    from tb_team_member tm \
    JOIN tb_team t ON t.id = tm.team_id \
    JOIN tb_assignment_team at ON at.team_id = t.id \
    JOIN tb_assignment a ON a.id = at.assignment_id \
    JOIN tb_class c ON c.code = a.class_code \
    WHERE tm.member_id = ?",
    [memberId]
  );

  const rows = await conn.query(
    "select c.name as className, a.class_code, a.name, at.isCheck, a.startDate, a.endDate \
    from tb_team_member tm \
    JOIN tb_team t ON t.id = tm.team_id \
    JOIN tb_assignment_team at ON at.team_id = t.id \
    JOIN tb_assignment a ON a.id = at.assignment_id \
    JOIN tb_class c ON c.code = a.class_code \
    WHERE tm.member_id = ? LIMIT ?, ?",
    [memberId, skip, limit]
  );

  ctx.state.body = {
    total: row.length,
    count: rows.length,
    results: rows,
  };

  await next();
};

export const readAssignmentByProfessorMd = async (ctx, next) => {
  const { memberId } = ctx.params;
  const { skip, limit } = ctx.state.query;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT c.name as className, c.code as classCode, a.id, a.name as assignmentName, a.startDate, a.endDate \
      FROM tb_class c \
      JOIN tb_assignment a ON a.class_code = c.code\
      JOIN tb_member m ON c.member_id = m.id\
      WHERE m.id = ?",
    [memberId, skip, limit]
  );

  ctx.state.body = {
    count: rows.length,
    results: rows,
  };

  await next();
};

export const readAssignmentByTeamMd = async (ctx, next) => {
  const { id } = ctx.params;
  const { conn } = ctx.state;
  const { skip, limit } = ctx.state.query;
  const row = await conn.query(
    "select a.id, a.name, a.content, at.isCheck, a.startDate, a.endDate " +
      "from tb_team t " +
      "JOIN tb_assignment_team at ON at.team_id = t.id " +
      "JOIN tb_assignment a ON at.assignment_id = a.id " +
      "WHERE t.id = ?",
    [id]
  );
  const rows = await conn.query(
    "select a.id, a.name, a.content, at.isCheck, a.startDate, a.endDate " +
      "from tb_team t " +
      "JOIN tb_assignment_team at ON at.team_id = t.id " +
      "JOIN tb_assignment a ON at.assignment_id = a.id " +
      "WHERE t.id = ? ORDER BY a.endDate DESC LIMIT ?, ?",
    [id, skip, limit]
  );

  ctx.state.body = {
    total: row.length,
    count: rows.length,
    results: rows,
  };

  await next();
};

export const create = [
  CommonMd.createConnectionMd,
  getDataFromBodyMd,
  validateDataMd,
  saveAssignmentMd,
  queryAssignmentMd,
  CommonMd.responseMd,
];

export const readAll = [
  CommonMd.createConnectionMd,
  CommonMd.validataListParamMd,
  readAssignmentAllMd,
  readAssignmentAllCountMd,
  CommonMd.responseMd,
];

export const readByClassCode = [
  CommonMd.createConnectionMd,
  readAssginmentByClassCodeMd,
  CommonMd.responseMd,
];

export const readByStudent = [
  CommonMd.validataListParamMd,
  CommonMd.createConnectionMd,
  readAssignmentByStudentMd,
  CommonMd.responseMd,
];

export const readByProfessor = [
  CommonMd.validataListParamMd,
  CommonMd.createConnectionMd,
  readAssignmentByProfessorMd,
  CommonMd.responseMd,
];

export const readByTeam = [
  CommonMd.createConnectionMd,
  CommonMd.validataListParamMd,
  readAssignmentByTeamMd,
  CommonMd.responseMd,
];

export const readId = [
  CommonMd.createConnectionMd,
  CommonMd.validateIdParamMd,
  readAssignmentByIdMd,
  CommonMd.responseMd,
];

export const update = [
  CommonMd.validateIdParamMd,
  CommonMd.createConnectionMd,
  // validateUpdateDataMd,
  updateAssignmentMd,
  queryAssignmentMdById,
  CommonMd.responseMd,
];

export const remove = [
  CommonMd.validateIdParamMd,
  CommonMd.createConnectionMd,
  removeAssignmentMd,
  CommonMd.responseMd,
];
