const userModel = require("../../../DB/models/users")

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const user = await userModel.findById(id)
        if (!user) {
            res.json({ message: "in-valid id" })
        } else {
            res.json({ message: "done", user })
        }
    } catch (error) {
        res.json({ message: "catch error", error })

    }
}

module.exports = getUserById