const messageModel = require("../../../DB/models/messages");
const userModel = require("../../../DB/models/users");

const sendMessage = async (req, res) => {
    try {
        const { _id } = req.user._id
        const { id } = req.params; // reciver id
        const { messageContent } = req.body;
        const userReceiver = await userModel.findById(id).select("name email")
        if (userReceiver) {
            if (req.user.messageSent < 5) {
                const sentMessage = await messageModel.insertMany({ messageContent, receiverId: userReceiver._id, senderId: _id })
                res.json({ message: "Done", sentMessage })
                await userModel.findByIdAndUpdate(_id, { messageSent: req.user.messageSent + 1 })
            } else {
                res.json({ message: "you have reached maximum sent message(5)" })
            }
        } else {
            res.json({ message: "in-valid user account" })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params // message id
        const message = await messageModel.deleteOne({ _id: id, senderId: req.user._id })
        res.json({ message: "Done", message })
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}

const getMessagesSentTo = async (req, res) => {
    try {
        const { receiverId } = req.params
        const allMessagesReceived = await messageModel.find({ receiverId }).select("messageContent").populate([{
            path: "receiverId",
            model: "User"
        }, {
            path: "senderId",
            model: "User"
        }])
        res.json({ message: "all messages received by user", allMessagesReceived })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

const getMessagesSentBy = async (req, res) => {
    try {
        const { senderId } = req.params
        const allMessagesSent = await messageModel.find({ senderId }).select("messageContent").populate([{
            path: "receiverId",
            model: "User"
        }, {
            path: "senderId",
            model: "User"
        }])
        res.json({ message: "all messages received by user", allMessagesSent })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}
module.exports = { sendMessage, deleteMessage, getMessagesSentTo, getMessagesSentBy }