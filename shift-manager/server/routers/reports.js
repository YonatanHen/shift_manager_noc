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

        var nodeoutlook = require('nodejs-nodemailer-outlook')
        nodeoutlook.sendEmail({
        auth: {
            user: "set email",
            pass: "set password"
        },
        from: 'from address',
        to: 'to address',
        subject: `NOC Shift Report of ${report.reporter}`, 
        html: `<h1 style="color:#32998d"> Report by ${report.reporter} at ${report.time} </h1>
        <h3 style="color:#32998d"> Production: </h3>
        <h4>
          alerts:
        </h4>
        ${report.production.alerts.map(alert => {
            return (
                `<hr>
                <h5>${alert.title} - ${alert.time}</h5>
                 ${alert.content}`
            )
        })}
        <h4>
          follows:
          ${report.production.follows.map(follow => {
            return (
                `<hr>
                <h5>${follow.title} - ${follow.time}</h5>
                 ${follow.content}`
            )
        })}
        </h4>
        <h3 style="color:#32998d"> Staging: </h3>
        <h4>
          alerts:
        </h4>
        ${report.staging.alerts.map(alert => {
            return (
                `<hr>
                <h5>${alert.title} - ${alert.time}</h5>
                 ${alert.content}`
            )
        })}
        <h4>
          follows:
          ${report.staging.follows.map(follow => {
            return (
                `<hr>
                 <h5>${follow.title} - ${follow.time}</h5>
                 ${follow.content}`
            )
        })}
        </h4>`, //TODO: Edit the report
        text: 'This is text version!',
        // replyTo: 'receiverXXX@gmail.com',
        // attachments: [
        //                 {
        //                     filename: 'text1.txt',
        //                     content: 'hello world!'
        //                 },
        //                 {   // binary buffer as an attachment
        //                     filename: 'text2.txt',
        //                     content: new Buffer('hello world!','utf-8')
        //                 },
        //                 {   // file on disk as an attachment
        //                     filename: 'text3.txt',
        //                     path: '/path/to/file.txt' // stream this file
        //                 },
        //                 {   // filename and content type is derived from path
        //                     path: '/path/to/file.txt'
        //                 },
        //                 {   // stream as an attachment
        //                     filename: 'text4.txt',
        //                     content: fs.createReadStream('file.txt')
        //                 },
        //                 {   // define custom content type for the attachment
        //                     filename: 'text.bin',
        //                     content: 'hello world!',
        //                     contentType: 'text/plain'
        //                 },
        //                 {   // use URL as an attachment
        //                     filename: 'license.txt',
        //                     path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        //                 },
        //                 {   // encoded string as an attachment
        //                     filename: 'text1.txt',
        //                     content: 'aGVsbG8gd29ybGQh',
        //                     encoding: 'base64'
        //                 },
        //                 {   // data uri as an attachment
        //                     path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
        //                 },
        //                 {
        //                     // use pregenerated MIME node
        //                     raw: 'Content-Type: text/plain\r\n' +
        //                          'Content-Disposition: attachment;\r\n' +
        //                          '\r\n' +
        //                          'Hello world!'
        //                 }
        //             ],
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
}


);

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