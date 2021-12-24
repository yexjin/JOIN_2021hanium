import urls from "../urls";
import httpClient from "../httpClient";

export const listByTeam = (code) =>
  httpClient.get(`${urls.report}/byTeam/${code}`);

export const listByAssign = (code) =>
  httpClient.get(`${urls.report}/byAssignment/${code}`);
