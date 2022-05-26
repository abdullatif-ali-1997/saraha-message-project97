const userModel = require("../../../DB/models/users")

const signUp = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        const newUser = new userModel({ name, email, password, phone })
        const savedUser = await newUser.save()
        res.json({ message: "done", savedUser })
    } catch (error) {
        if (error.keyValue) {
            if(error.keyValue.email) {
                res.json({ message: "email already exists" })
            }
        } else {
            res.json({ message: "catch error", error })
        }
    }
}

module.exports = signUp