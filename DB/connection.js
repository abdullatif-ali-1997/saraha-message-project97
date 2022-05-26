const mongoose = require("mongoose")


const connectDB = () => {
    return mongoose.connect(process.env.DBLink).then( () =>console.log( `DB connected on ${process.env.DBLink}`)).catch( (error) => console.log("error ", error))
}

module.exports = connectDB