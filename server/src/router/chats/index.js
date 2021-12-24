import Router from "@koa/router";
import * as chats from "./chats";

const router = new Router();

router.post("/", ...chats.create);

router.get("/:assignmentTeamId", ...chats.readChatLog);

export default router;
