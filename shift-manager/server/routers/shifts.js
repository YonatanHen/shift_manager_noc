const express = require('express')
const router = new express.Router()

var ObjectID = require('mongodb').ObjectID;

//Finish this
router.get('/get-shifts', async (req,res) => {
    try {
        const data = await db.collection('shifts').find({}).toArray()
        res.send(data)
    } catch (e) {
        res.send(e)
    }
})

router.post('/add-shift', async (req,res) => {
    const shift = req.body
    console.log(shift)
    try {
         await db.collection('shifts').insertOne(shift)

         res.send({message: 'shift added'})
        } catch (e) {
        res.send(e)
    }
})

router.delete('/delete-shift/:id', async (req,res) => {
    const id = req.params.id 
    try {
        await db.collection('shifts').deleteOne({"_id": ObjectID(id)})
        res.send({message: 'shift deleted successfully'})
        
        } catch (e) {
        res.send(e)
    }
})

router.get('/get-user-shifts/:uname', async (req,res) => {
    try {
        const data = await db.collection('shifts').find({title: req.params.uname}).toArray()
        res.send(data)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router;
