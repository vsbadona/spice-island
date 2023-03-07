import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"


const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/',userRoutes)
app.use('/',categoryRoutes)

const PORT = process.env.PORT || 5000
const URL = process.env.MONGODB_URL

app.listen(PORT,()=>{
    console.log(`App is Listning on Port http://localhost:${PORT}`);
})
mongoose.connect(URL)
const db = mongoose.connection
db.on('error',(err)=>console.log(err.message))
db.once('open',()=>{
    console.log("Connected To Db");
})

