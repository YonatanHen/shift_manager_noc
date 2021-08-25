const express = require('express')
const router = new express.Router()

const nodemailer = require('nodemailer')
const { comment } = require('postcss')

var ObjectID = require('mongodb').ObjectID;

/**
 * HTTP GET req - returns all of the reports in the db
 */
router.get('/getreports', async (req,res) => {
    try {
    const reports = await db.collection('reports').find({}).toArray() //Empty brackets will return all of the data.
    // console.log(reports) 
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
        if (report.alerts == [] || report.alerts == null)
            reports.alerts.push('Nothing unusual.') 

        //Adding time to object
        report['time'] = new Date().toLocaleString("en-US", {timeZone: "Asia/Jerusalem"})
        if (report['reporter'] === undefined) {
            report['reporter'] = 'NOC'
        } else {
            report['staging'] = new Object()
            report['production'] = new Object()
            try {
            report['staging'].alerts = report['alerts'].filter(alert => alert.environment.toLowerCase() === 'staging' && alert.type==='Alert')
            report['production'].alerts = report['alerts'].filter(alert => alert.environment.toLowerCase() === 'production' && alert.type==='Alert')
            report['staging'].follows = report['alerts'].filter(alert => alert.environment.toLowerCase() === 'staging' && alert.type==='Follow')
            report['production'].follows = report['alerts'].filter(alert => alert.environment.toLowerCase() === 'production' && alert.type==='Follow')
            } catch (e) { console.log(e) }
        }

        delete report['alerts']
        delete report['follows']

        report['comments'] = []
        
        //Save report in db
        await db.collection('reports').insertOne(report)

        res.send({message: `Report at ${report.timestamp} added successfully`})
    } catch(e) {
        res.status(500).send(e) 
    }
})

router.get('/delete-report/:name', async(req,res) => {
    try {
        await db.collection('reports').findOneAndDelete({alert: req.body.params.name})

        res.send({message: `report deleted successfully!`})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.put('/add-comment', async(req,res) => {
    try {
        await db.collection('reports').findOneAndUpdate({_id: new ObjectID(req.body.reportId)}, {$push: { comments: req.body.comment }})

        res.send({message: 'comment added'})
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router