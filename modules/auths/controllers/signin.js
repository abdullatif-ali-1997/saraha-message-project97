const userModel = require("../../../DB/models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signIn = async (req,res) => {
const {email, password} = req.body
const findUser = await userModel.find({email})
if (!findUser.length) {
res.json({message:"in-valid email please register first"})
} else {
    const match = await bcrypt.compare(password, findUser[0].password)
    if (!match) {
        res.json({message:"email or password incorrect",})
    } else {
     const token = jwt.sign({id:findUser[0]._id,isLogin: true}, process.env.tokenSignature,{expiresIn: "3h"})
        res.json({message:"done",token})
        
    }
    
}

}

module.exports = signIn