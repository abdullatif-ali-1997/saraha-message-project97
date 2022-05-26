const messageModel = require("../../../DB/models/messages")
const moment = require("moment")

const getMessagesByDay = async (req, res) => {
    try {
        const today = moment()
        const yesterday = moment().subtract(1, "d")
        const lYesterday = moment().subtract(2, "d")
        const yesMessages = await messageModel.find({ $or: [{ createdAt: { $gt: lYesterday, $lt: yesterday } }, { createdAt: { $gt: yesterday, $lt: today } }] })
        res.json({ message: "messages ", yesMessages })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = getMessagesByDay