import urls from "../urls";
import httpClient from "../httpClient";

export const create = (form) =>
  httpClient.post(urls.assignments, form, {
    headers: { "Content-type": "multipart/form-data" },
  });
export const listAll = (classCode) =>
  httpClient.get(`${urls.assignments}/byClassCode/${classCode}`);
export const listAllByMember = (id) =>
  httpClient.get(`${urls.assignments}/byMember/${id}`);
export const listAllByTeam = (id) =>
  httpClient.get(`${urls.assignments}/byTeam/${id}`);
export const assignmentById = (id) =>
  httpClient.get(`${urls.assignments}/${id}`);
export const put = (id, form) =>
  httpClient.put(`${urls.assignments}/${id}`, form);
export const remove = (id) => httpClient.delete(`${urls.assignments}/${id}`);

// 마이페이지 모든 과제들 get
export const listAllAssignments = (id, qs = "") =>
  httpClient.get(`${urls.assignments}/byProfessor/${id}?${qs}`);
