const router = require("express").Router()
const message = require("./controllers/message")
const { auth, roles } = require("../../middleware/auth")
const validation = require("../../middleware/validation")
const { messageValidator } = require("./messages.validation")
const getMessagesByDay = require("./controllers/getMessagesByDay")


router.post("/message/:id",validation(messageValidator),auth([roles.Admin,roles.User]) ,message.sendMessage)
router.delete("/message/:id",auth([roles.Admin,roles.User]),message.deleteMessage)
router.get("/message/sentTo/:receiverId",auth([roles.Admin]), message.getMessagesSentTo)
router.get("/message/sentBy/:senderId",auth([roles.Admin]), message.getMessagesSentBy)
router.get("/message/byTodAndYest",auth([roles.Admin]), getMessagesByDay)

module.exports = router