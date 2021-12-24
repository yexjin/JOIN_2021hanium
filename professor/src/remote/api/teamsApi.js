import urls from "../urls";
import httpClient from "../httpClient";

export const create = (code) => httpClient.post(`${urls.teams}/${code}`);
export const createRandomTeams = (code, form) =>
  httpClient.post(`${urls.teams}/random/${code}`, form);
export const listAllTeams = (code) => httpClient.get(`${urls.teams}/${code}`);
export const remove = (id) => httpClient.delete(`${urls.teams}/${id}`);
export const insertStudentTeam = (code, form) =>
  httpClient.post(`${urls.teams}/students/${code}`, form);
export const deleteStudentTeam = (qs) =>
  httpClient.delete(`${urls.teams}/students?${qs}`);
export const studentsNoTeam = (code) =>
  httpClient.get(`${urls.teams}/noTeam/${code}`);
