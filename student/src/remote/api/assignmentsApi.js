import urls from "../urls";
import httpClient from "../httpClient";

export const create = (form) => httpClient.post(urls.assignments, form);
export const listAll = (code) =>
  httpClient.get(`${urls.assignments}/byClassCode/${code}`);
export const listAllByMember = (id) =>
  httpClient.get(`${urls.assignments}/byMember/${id}`);
export const listAllByTeam = (id) =>
  httpClient.get(`${urls.assignments}/byTeam/${id}`);
export const assignmentById = (id) =>
  httpClient.get(`${urls.assignments}/${id}`);
export const put = (id, form) =>
  httpClient.put(`${urls.assignments}/${id}`, form);
export const remove = (id) => httpClient.delete(`${urls.assignments}/${id}`);

export const assignmentByTeamId = (id, qs = "") =>
  httpClient.get(`${urls.assignments}/byTeam/${id}?${qs}`);

// 마이페이지 모든 과제들 get
export const listAllAssignments = (id, qs = "") =>
  httpClient.get(`${urls.assignments}/byStudent/${id}?${qs}`);
export const assignmentTeamByTeamId = (assignmentId, teamId) =>
  httpClient.get(
    `${urls.assignments}/assignmentTeam/${assignmentId}/${teamId}`
  );
export const submit = (id, memberId, form) =>
  httpClient.post(`${urls.assignments}/submit/${id}/${memberId}`, form, {
    headers: {
      "Content-Type": "multipart/form-data; ",
    },
  });
