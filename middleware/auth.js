const jwt = require("jsonwebtoken");
const userModel = require("../DB/models/users");
const roles = {
    Admin: "admin",
    User: "user",
    Hr: "hr"
}

const auth = (accessRoles) => {
    return async(req, res, next) => {
        const headerToken = req.headers['authorization']
        if (!headerToken ||
            headerToken == null ||
            headerToken == undefined ||
            !headerToken.startsWith(`${process.env.bearerKey} `)) {
            res.json({ message: "header token error" })
        } else {
            const token = headerToken.split(" ")[1]
            if (!token || 
                token == null ||
                token == undefined ||
                token.length < 1) {
                    res.json({ message: "invalid token" })
            } else {
                const decoded = jwt.verify(token,process.env.tokenSignature)
                const findUser = await userModel.findById(decoded.id).select("name email role messageSent")
                if (!findUser) {
                    res.json({ message: "invalid login user" })
                } else {
                    if (accessRoles.includes(findUser.role)) {
                        req.user = findUser
                        next()                        
                    } else {
                        res.json({message:"not authorized user"})
                    }
                }
            }
        }
    }
}

module.exports = { auth, roles }