const mongoose= require("mongoose")

const messageSchema = mongoose.Schema({
    messageContent: {
        type: String,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })

const messageModel = mongoose.model("Message", messageSchema)


module.exports = messageModel