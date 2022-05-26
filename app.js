const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./DB/connection")
const { authRouter, usersRouter, messagesRouter } = require("./allRoutes")
dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(authRouter,usersRouter,messagesRouter)

connectDB()
app.listen(port, () => {
    console.log("app is listening on " + port);
})