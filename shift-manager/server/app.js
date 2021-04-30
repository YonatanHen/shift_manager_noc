express = require('express')
const path = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

port = process.env.PORT || 3001

app.get('/*', (req,res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log(`App is listen to port ${port}`)
})

module.exports = app