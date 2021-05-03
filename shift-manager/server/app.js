express = require('express')
const path = require('path')
const login = require('./routers/login')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./database/mongodb')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(bodyParser.json())
app.use(cors())
app.use(login)

app.use(express.static(publicDirectoryPath))



port = process.env.PORT || 3001

app.get('/', (req,res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})

module.exports = app