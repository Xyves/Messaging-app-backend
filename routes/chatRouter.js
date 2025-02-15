const { Router } = require("express");
const chatRouter = Router();
const chatsController = require("../controllers/chatController");

chatRouter.get("/friends", chatsController.getFriends);
chatRouter.get("/:chat_id", chatsController.getChatWithMessages);
chatRouter.post("/:chat_id/messages", chatsController.createMessage);

module.exports = chatRouter;
