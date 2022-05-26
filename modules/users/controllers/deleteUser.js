const userModel = require("../../../DB/models/users")

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.user._id)
        if (deleteUser) {
            res.json({ message: "delete success", deleteUser })
        } else {
            res.json({ message: "delete fails invalid user id " })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = deleteUser