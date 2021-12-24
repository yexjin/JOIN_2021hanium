import urls from "../urls";
import httpClient from "../httpClient";

export const create = (form) => httpClient.post(urls.chats, form);

export const listChat = (assignmentTeamId) =>
  httpClient.get(`${urls.chats}/${assignmentTeamId}`);
