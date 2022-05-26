const mongoose = require("mongoose")
const bCrypt = require("bcrypt")
var CryptoJS = require("crypto-js");
require("dotenv").config()
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    messageSent: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    this.password = await bCrypt.hash(this.password, parseInt(process.env.saltRound))
    this.phone = await CryptoJS.AES.encrypt(`${this.phone}`, process.env.phoneEncryptionKey).toString()
    next()
})


const userModel = mongoose.model("User", userSchema)
module.exports = userModel