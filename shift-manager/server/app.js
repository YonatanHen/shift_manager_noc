const express = require('express')
const path = require('path')
const login = require('./routers/login')
const reports = require('./routers/reports')
const shifts = require('./routers/shifts')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./database/mongodb')

const app = express()
app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.json())
app.use(cors())
app.use(login)
app.use(reports)
app.use(shifts)
// app.use(express.static(publicDirectoryPath))



const port = process.env.PORT || 3001

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})

module.exports = app