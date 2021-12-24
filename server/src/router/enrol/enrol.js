/* eslint-disable max-len */
import Boom from "@hapi/boom";
import * as CommonMd from "../middlewares";

export const getDataFromBodyMd = async (ctx, next) => {
  const { memberId, classCode, isAccept } = ctx.request.body;

  console.log(ctx.request.body);

  ctx.state.reqBody = {
    memberId,
    classCode,
    isAccept,
  };

  await next();
};

export const validateDataMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.state.reqBody;

  if (!memberId || !classCode) {
    throw Boom.badRequest("field is not fulfiled");
  }

  await next();
};

// 학생이 수업 추가를 이미 요청한 경우
export const isDuplicatedEnrolMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.state.reqBody;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT * FROM tb_enrol WHERE member_id = ? and class_code = ? and isAccept=0 ",
    [memberId, classCode]
  );

  if (rows.length > 0) {
    throw Boom.badRequest("duplicated enrol");
  }

  await next();
};

// 학생의 수업 추가 요청을 insert
export const saveEnrolMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.state.reqBody;
  const { conn } = ctx.state;

  await conn.query(
    "INSERT INTO tb_enrol(member_id,class_code,isAccept) VALUES (?,?,0) ",
    [memberId, classCode]
  );

  await next();
};

// Select 정보 body에 담기
export const queryEnrolMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.state.reqBody;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT * FROM tb_enrol WHERE member_id = ? and class_code = ? and isAccept=0 ",
    [memberId, classCode]
  );

  ctx.state.body = { ...rows[0] };

  await next();
};

// 수강 신청 목록 read
export const readEnrolListMd = async (ctx, next) => {
  const { classCode } = ctx.params;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT m.id,m.name,m.studentID,m.grade FROM tb_enrol e JOIN tb_member m ON e.member_id = m.id WHERE class_code=? and isAccept = 0",
    [classCode]
  );

  ctx.state.body = {
    results: rows,
  };

  await next();
};

// 수강 신청 total
export const readEnrolCountMd = async (ctx, next) => {
  const { classCode } = ctx.params;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT COUNT(*) AS count FROM tb_enrol WHERE class_code=? and isAccept=0",
    [classCode]
  );

  ctx.state.body = {
    ...ctx.state.body,
    count: rows[0].count,
  };

  await next();
};

// 수강생 목록 read
export const readStudentListMd = async (ctx, next) => {
  const { classCode } = ctx.params;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT m.id,m.name,m.studentID,m.grade FROM tb_enrol e JOIN tb_member m ON e.member_id = m.id WHERE class_code=? and isAccept = 1",
    [classCode]
  );

  ctx.state.body = {
    results: rows,
  };

  await next();
};

// 수강생 total
export const readStudentCountMd = async (ctx, next) => {
  const { classCode } = ctx.params;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT COUNT(*) AS count FROM tb_enrol WHERE class_code=? and isAccept=1",
    [classCode]
  );

  ctx.state.body = {
    ...ctx.state.body,
    count: rows[0].count,
  };

  await next();
};

// 교수님이 수락을 눌러 isAccept가 1로 update
export const UpdateAcceptMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.state.reqBody;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "UPDATE tb_enrol SET isAccept=1 WHERE member_id=? and class_code=?",
    [memberId, classCode]
  );

  ctx.state.body = {
    ...rows[0],
  };

  await next();
};

// 교수님이 신청 거절 전에 validate
export const validateRejectMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.query;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT * FROM tb_enrol WHERE member_id=? and class_code=? and isAccept=0",
    [memberId, classCode]
  );

  if (rows.length === 0) {
    throw Boom.badRequest("not exist enrol");
  }

  await next();
};

// 교수님이 신청을 거절 눌러 delete
export const rejectEnrolMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.query;
  const { conn } = ctx.state;
  await conn.query(
    "DELETE FROM tb_enrol WHERE member_id=? AND class_code=? AND isAccept=0",
    [memberId, classCode]
  );

  await next();
};

// 교수님이 삭제 전에 validate
export const validateRemoveMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.query;
  const { conn } = ctx.state;

  const rows = await conn.query(
    "SELECT * FROM tb_enrol WHERE member_id=? and class_code=? and isAccept=1",
    [memberId, classCode]
  );

  if (rows.length === 0) {
    throw Boom.badRequest("not exist student");
  }

  await next();
};

// 교수님이 수강생을 delete
export const removeStudentMd = async (ctx, next) => {
  const { memberId, classCode } = ctx.query;
  const { conn } = ctx.state;

  await conn.query(
    "DELETE FROM tb_enrol WHERE member_id=? and class_code=? and isAccept=1",
    [memberId, classCode]
  );

  await next();
};

// 학생이 수업 코드를 입력한 경우 -> enrol이 된다.
export const create = [
  CommonMd.createConnectionMd,
  getDataFromBodyMd,
  validateDataMd,
  isDuplicatedEnrolMd,
  saveEnrolMd,
  queryEnrolMd,
  CommonMd.responseMd,
];

// 교수님이 생성한 수업에 들어가서 수강 신청 목록을 보는 경우
export const readEnrol = [
  CommonMd.createConnectionMd,
  readEnrolListMd,
  readEnrolCountMd,
  CommonMd.responseMd,
];

// 교수님이 생성한 수업에 들어가서 수강생 목록을 보는 경우
export const readStudent = [
  CommonMd.createConnectionMd,
  readStudentListMd,
  readStudentCountMd,
  CommonMd.responseMd,
];

// 교수님이 수강생 목록에서 수락을 누른 경우
export const accept = [
  CommonMd.createConnectionMd,
  getDataFromBodyMd,
  UpdateAcceptMd,
  CommonMd.responseMd,
];

// 교수님이 수강 신청 목록에서 거절을 누른 경우
export const reject = [
  CommonMd.createConnectionMd,
  validateRejectMd,
  rejectEnrolMd,
  CommonMd.responseMd,
];

// 교수님이 수강생을 삭제한 경우
export const remove = [
  CommonMd.createConnectionMd,
  validateRemoveMd,
  removeStudentMd,
  CommonMd.responseMd,
];
