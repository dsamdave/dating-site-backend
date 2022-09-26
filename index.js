const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const routes = require('./routes/index')
dotenv.config()



// Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: `*`,
  credentials: true
}))

app.use(cookieParser())


// Routes
app.use('/api', routes)
app.get('/', (req, res) => {
  res.json({
    msg: 'Welcome to our dating site.'
  })
})


const URI = process.env.MONGODB_URL
const PORT = process.env.PORT || 8000;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('MongoDB Database connected.')
})


app.listen(PORT, () => {
    console.log(`Server is running successfully on Port ${PORT}`)
})