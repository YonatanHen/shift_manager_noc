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

app.get('/getusers', async (req, res) => {
    console.log('entered');
    try {
        
        let users = await db.collection('users').find({})
        console.log(users);
            res.send(users)
    } catch(err) {
        res.send(err)
    }
}) 

port = process.env.PORT || 3001

app.get('/', (req,res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`)
})

module.exports = app