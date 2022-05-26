const userModel = require("../../../DB/models/users")

const getUsers = async (req, res) => {
    try {
        const usersList = await userModel.find({}).select("-password")
        if (usersList) {
            res.json({ message: "all users", usersList })
        } else {
            res.json({ message: "no users found" })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = getUsers