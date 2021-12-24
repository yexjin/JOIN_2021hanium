import { readFile } from "fs";
import { promisify } from "util";
import * as CommonMd from "../middlewares";
import { join } from "path";
const readFileAsync = promisify(readFile);

export const getTermsMd = async (ctx, next) => {
  const data = await readFileAsync(join(__dirname, "terms.txt"), "utf-8");
  ctx.state.body = {
    result: data,
  };
  await next();
};

export const terms = [getTermsMd, CommonMd.responseMd];
