const userModel = require("../../../DB/models/users")

const profile = async (req, res) => {
    try {
        console.log({ req: req.user })
        const user = await userModel.findById(req.user._id).select("name email role")
        res.json({ message: "done", user })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = profile