const userModel = require("../../../DB/models/users")

const getDeletedUser = async (req, res) => {
    try {
        const usersDeletedList = await userModel.find({ isDeleted: true})
        if (usersDeletedList.length) {
            res.json({ message: "done", usersDeletedList })
        } else {
            res.json({ message: "error " })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = getDeletedUser