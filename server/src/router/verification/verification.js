import Boom from "@hapi/boom";
import Cache from "memory-cache";
import config from "../../config";
import CryptoJS from "crypto-js";
import SHA256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import axios from "axios";
import nodemailer from "nodemailer";
import * as CommonMd from "../middlewares";
import { generateToken } from "../../middlewares/jwtMd";

export const getMobileFromBodyMd = async (ctx, next) => {
  const { mobile } = ctx.request.body;

  ctx.state.reqBody = { mobile };

  await next();
};

export const validateMobileMd = async (ctx, next) => {
  const { mobile } = ctx.state.reqBody;

  const regExp = /^\d{3}-\d{3,4}-\d{4}$/;

  if (!regExp.test(mobile)) {
    throw Boom.badRequest("unvalid phone number");
  }

  await next();
};

export const generateVerifyMd = async (ctx, next) => {
  const { mobile, email } = ctx.state.reqBody;
  let verifyCode = "";
  for (let i = 0; i < 6; i+=1){
    verifyCode += String(parseInt(Math.random() * 10));
  }

  try {
    if (mobile) {
      Cache.del(mobile);
      Cache.put(mobile, verifyCode);
    }
    if (email) {
      Cache.del(email);
      Cache.put(email, verifyCode);
    }
  } catch (e) {
    throw Boom.badRequest(e);
  }

  ctx.state.verifyCode = verifyCode;

  await next();
};

export const sendSmsMd = async (ctx, next) => {
  let { mobile } = ctx.state.reqBody;
  const verifyCode = ctx.state.verifyCode;
  const sens = config.SENSAPI;

  const timeStamp = Date.now().toString();
  const uri = sens.serviceId;
  const secretKey = sens.serviceSecret;
  const accessKey = sens.accessKey;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens.serviceId}/messages`;
  const url2 = `/sms/v2/services/${sens.serviceId}/messages`;

  const  hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(timeStamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  mobile = mobile.replace(/\-/g, "");
  const body = {
    "type": "SMS",
    "from": sens.number.toString(),
    "content": `[인증번호] ${verifyCode}`.toString(),
    "messages": [{
      "to": mobile.toString(),
      "content": `[인증번호] ${verifyCode}`.toString()
    }]
  };

  const headers = {
    "Content-type": "application/json;",
    "x-ncp-iam-access-key": accessKey,
    "x-ncp-apigw-timestamp": timeStamp,
    "x-ncp-apigw-signature-v2": signature,
  };
  const res = await axios.post(url, body, { headers });

  if(res.data.error) {
    throw Boom.badRequest(res.data.error);
  }

  ctx.state.body = { success: true };
  await next();
};

export const getDataFromBodyMd = async (ctx, next) => {
  const { mobile, verifyCode, name } = ctx.request.body;

  ctx.state.reqBody = { mobile, verifyCode, name };

  await next();
};

export const confirmVerifyCodeMd = async (ctx, next) => {
  const { dbPool } = ctx;
  const conn = await dbPool.getConnection();

  const { mobile, verifyCode, name } = ctx.state.reqBody;
  if (Cache.get(mobile)!=verifyCode) {
    throw Boom.badRequest();
  }
  
  const rows = await conn.query("SELECT email, name, mobile FROM tb_member WHERE name = ? AND mobile = ?", [name, mobile]);
  console.log(rows);
  if (rows.length===0) {
    throw Boom.badRequest();
  }

  ctx.state.body = {
    success: true,
    email: rows[0].email,
  };

  await next();
};

export const getEmailDataFromBodyMd = async (ctx, next) => {
  const { email, verifyCode } = ctx.request.body;
  ctx.state.reqBody = { email, verifyCode };

  await next();
};

export const validateEmailMd = async (ctx, next) => {
  const { email } = ctx.state.reqBody;

  const { dbPool } = ctx;

  const conn = await dbPool.getConnection();

  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!regExp.test(email)) {
    throw Boom.badRequest();
  }

  const rows = conn.query("SELECT email FROM tb_member WHERE email = ?", [email]);

  if (!rows) {
    throw Boom.badRequest();
  }

  await next();
};

export const sendEmailMd = async (ctx, next) => {
  const { email } = ctx.state.reqBody;
  const verifyCode = ctx.state.verifyCode;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "eumys1801@gmail.com",
      pass: "asdfasdf021801!",
    },
  });
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Join",
      to: email,
      subject: "Verify Code",
      text: verifyCode,
      html: `<b>${verifyCode}</b>`,
    });
  } catch (e) {
    throw Boom.badRequest(e);
  }

  ctx.state.body = {
    success: true,
  };

  await next();
};

export const confirmEmailVerifyCodeMd = async (ctx, next) => {
  const { dbPool } = ctx;
  const conn = await dbPool.getConnection();

  const { email, verifyCode } = ctx.state.reqBody;
  if (Cache.get(email)!=verifyCode) {
    throw Boom.badRequest();
  }

  const payload = { email };

  let token = null;

  try {
    token = await generateToken(payload);
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.state.body = {
    access_token: token,
  };

  await next();
};

export const getPasswordFromBodyMd = async (ctx, next) => {
  const { password, id } = ctx.request.body;
  ctx.state.reqBody = { password };
  await next();
}

export const readPasswordMd = async (ctx, next) => {
  const { password, id } = ctx.state.reqBody;
  const { dbPool } = ctx;
  const conn = await dbPool.getConnection();
  const rows = conn.query("SELECT id, email FROM tb_member WHERE password = password(?) AND id = ?", [password, id]);
  if (!rows) {
    throw Boom.badRequest();
  }
  ctx.state.body = { success: true };
}

export const postVerifySms = [
  getDataFromBodyMd,
  validateMobileMd,
  generateVerifyMd,
  sendSmsMd,
  CommonMd.responseMd,
];

export const confirmVerifySms = [
  getDataFromBodyMd,
  validateMobileMd,
  confirmVerifyCodeMd,
  CommonMd.responseMd,
];

export const postVerifyEmail = [
  getEmailDataFromBodyMd,
  validateEmailMd,
  generateVerifyMd,
  sendEmailMd,
  CommonMd.responseMd,
];

export const confirmVerifyEmail = [
  getEmailDataFromBodyMd,
  validateEmailMd,
  confirmEmailVerifyCodeMd,
  CommonMd.responseMd,
];

export const verifyPassword = [
  getPasswordFromBodyMd,
  readPasswordMd,
  CommonMd.responseMd,
];
