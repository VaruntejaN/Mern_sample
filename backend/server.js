const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config()

connectDB();

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/users',require('./routes/userRoutes'))


app.listen(5000, () => {
    console.log("Server started on port 5000")
})  