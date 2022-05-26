const userModel = require("../../../DB/models/users")

const updateUser = async (req, res) => {
   try {
    const { name } = req.body
    const findUser = await userModel.findByIdAndUpdate(req.user._id, { name }, { new: true }).select("-password")
    console.log(findUser);
    if (!findUser) {
    res.json({message:"update fail invalid id"})
    } else {
        res.json({message:"update success", findUser})
    }
   } catch (error) {
    res.json({message:"catch error", error})
   }
}
module.exports = updateUser