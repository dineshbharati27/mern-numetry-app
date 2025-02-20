import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';


const app = express();
const port = process.env.PORT || 3001;

connectDB()

//middlewares
app.use(express.json())
app.use(cors());

// api endpoints
app.use("/api/user", userRouter)

app.get('/', (req, res) => {
    res.send("api working");
})

app.listen(port , () =>{
    console.log("server started on port -> "+port)
})