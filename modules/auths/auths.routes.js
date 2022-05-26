const validation = require("../../middleware/validation")
const signIn = require("./controllers/signin")
const signUp = require("./controllers/signUp")
const { signUpValidator, signInValidator } = require("./user.validation")

const router = require("express").Router()

router.post("/signup",validation(signUpValidator), signUp)
router.post("/signin",validation(signInValidator), signIn)

module.exports = router