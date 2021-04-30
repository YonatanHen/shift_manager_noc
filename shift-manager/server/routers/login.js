express = require('express')
router = new express.Router()

router.post('/login', async (req, res) => {
    const user = req.body
    console.log(user)
    try {
        const isExist = await db.collection('users').findOne(user)
        console.log(isExist)
        if(!isExist) 
            return res.status(400).send({ msg: "User not found" })

        //command will send status 200 by default
        res.send({msg: "user logged in successfully."})

    } catch(err) {
        res.status(500).send()
    }
}) 

module.exports = router