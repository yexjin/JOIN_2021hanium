import urls from "../urls";
import httpClient from "../httpClient";

export const teamMemberList = (qs) => httpClient.get(`${urls.teams}?${qs}`);
