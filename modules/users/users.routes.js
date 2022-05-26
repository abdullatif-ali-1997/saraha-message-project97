const { auth, roles } = require("../../middleware/auth")
const validation = require("../../middleware/validation")
const { updateValidator, idValidator } = require("../auths/user.validation")
const deleteUser = require("./controllers/deleteUser")
const getUsers = require("./controllers/getAllUsers")
const getDeletedUser = require("./controllers/getDeletedUsers")
const getUserById = require("./controllers/getUserById")
const softDelete = require("./controllers/softDelete")
const updateUser = require("./controllers/updateUser")
const profile = require("./controllers/userProfile")

const router = require("express").Router()

router.get("/profile", auth([roles.Admin,roles.User]),profile)
router.patch("/user",validation(updateValidator) ,auth([roles.Admin,roles.User]),updateUser)
router.delete("/user",auth([roles.Admin]),deleteUser)
router.get("/users",auth([roles.Admin]),getUsers)
router.get("/user/:id",validation(idValidator),auth([roles.Admin,roles.User]),getUserById)
router.patch("/user/softDelete",auth([roles.Admin,roles.User]),softDelete)
router.get("/users/deletedUsers",auth([roles.Admin]),getDeletedUser)


module.exports = router