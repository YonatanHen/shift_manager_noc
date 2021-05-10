express = require('express')
router = new express.Router()

/**
 * HTTP GET req - returns all of the reports in the db
 */
router.get('/reports', async (req,res) => {
    try {
         //Empty brackets will return all of the data.
    await db.collection('reports').find({}).toArray(function (err, docs) {

        res.send(docs)
    })
    } catch(e) {
        res.status(500).send(e) 
    } 
})

/**
 * HTTP POST req includes report fields, the data which sent from frontend server will be saved in req.body. 
 * Assumed that report contains the following fields: alerts, timestamp (still need to figure how to add picture)
 */
router.post('/add-report', async (req,res) => {
    const report = req.body
    try {
        //Save report in db
        var result = await db.collection('reports').insert(report)
        res.send(result)
    } catch(e) {
        res.status(500).send(e) 
    }
})

router.post('/delete-report', async(req,res) => {
    try {
        await db.collection('reports').findOneAndDelete({alert: req.body.params.name})
    } catch (e) {
        res.status.send(e)
    }
})

module.exports = router