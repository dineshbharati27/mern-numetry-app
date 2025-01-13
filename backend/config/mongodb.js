import mongoose from 'mongoose'

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("db connected")
    })

    await mongoose.connect(`${process.env.CONNECTION_STRING}`)
}

export default connectDB;