const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users.js')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, '/images')))
//  app.use('/', (req, res) => {
//     res.send("API running")
//  })


const storage = multer.diskStorage({
    destination: (req, filename, cb) => {
        cb(null, 'images')
    }, 
    filename:(req, file, cb) => {
        cb(null, req.body.name)
    } 
})

const upload = multer({storage:storage})
app.post('/api/upload', upload.single('file'), (req, res)=>{
    res.status(200).json("File uploaded")
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

const startServer = async () => {
    await mongoose.connect(process.env.MONGO)
    console.log("Mongo")
    app.listen(process.env.PORT, () => {
        console.log('API listening')
    })
}

startServer()