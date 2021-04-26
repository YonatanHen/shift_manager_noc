express = require('express')

const app = express()

port = process.env.PORT || 3001

app.get('/', (req,res) => {
    res.send("Hello world")
})

app.listen(port)
