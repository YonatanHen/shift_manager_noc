express = require('express')
router = new express.Router()

/**
 * HTTP GET req - returns all of the reports in the db
 */
router.get('/reports', async (req,res) => {
    try {
    const reports = await db.collection('reports').find({}) //Empty brackets will return all of the data.
    res.send(reports)
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
        if(report.alerts == null)
            reports.alerts.push() //TODO: should create alert object then add 'no unusual events' alert

        //Adding time to object
        report['timestamp'] = new Date()
        
        //Delete description field in case it is empty
        if(report.description == '')
            delete report.description

        //Save report in db
        await db.collection('reports').insert(report)

        res.send({message: `Report about ${report.alert} added successfully`})
    } catch(e) {
        res.status(500).send(e) 
    }
})

router.get('/delete-report/:name', async(req,res) => {
    try {
        await db.collection('reports').findOneAndDelete({alert: req.body.params.name})

        res.send({message: ``})
    } catch (e) {
        res.status.send(e)
    }
})

module.exports = router