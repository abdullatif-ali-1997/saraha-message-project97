const userModel = require("../../../DB/models/users")

const softDelete = async (req, res) => {
    try {
        const softDeleteUser = await userModel.findByIdAndUpdate(req.user._id, { isDeleted: true }, { new: true })
        res.json({ message: "soft succeeded", softDeleteUser })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = softDelete