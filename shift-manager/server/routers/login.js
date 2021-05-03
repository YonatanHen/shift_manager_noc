express = require('express')
router = new express.Router()
var ObjectID = require('mongodb').ObjectID;
router.post('/login', async (req, res) => {
    const user = req.body
    console.log(user)
    try {
        const isExist = await db.collection('users').findOne(user)
        console.log('printing user isExist');
        console.log(isExist)
        if(!isExist) {
            return res.status(400).send({ msg: "User not found" })
        }
        else {
            res.status(200).send(isExist)
        }
        

    } catch(err) {
        res.status(500).send()
    }
}) 

router.get('/getusers', async (req, res) => {
    console.log('entered');
    try {
        
        let users = await db.collection('users').find().toArray(function (err, docs) {
            
            res.send(docs)
        })
       
           
    } catch(err) {
        res.send(err)
    }
}) 
router.post('/adduser', async (req,res) => {
    try{
        
        let result = await db.collection('users').insertOne(req.body)
        res.send(result)
    }
    catch(err) {
        res.send(err)
    }
})
router.post('/deleteuser', async (req,res) => {
    try{
        var ob = Object.assign({},req.body)
        ob._id = new ObjectID(req.body._id)
        console.log(ob);
        let result = await db.collection('users').deleteOne(ob)
       
        res.send(result)
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router