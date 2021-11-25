const express = require('express')
const router = new express.Router()

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const { comment } = require('postcss')
var ObjectID = require('mongodb').ObjectID;

require('dotenv').config()

router.get('/getreports', async (req,res) => {
    try {
    const reports = await db.collection('reports').find({}).toArray() //Empty brackets will return all of the data.
    // console.log(reports) 
    res.send(reports)
    } catch(e) {
        res.status(500).send(e) 
    } 
})

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

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`
              },
        });
          
          var mailOptions = {
            from: `${process.env.EMAIL_ADDRESS}`,
            to: `${process.env.TO}`,
            subject: `NOC Shift Report of ${report.reporter}`,
            text: 'That was easy!',
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
                    }
                )}`
          }
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });  

        res.send({message: `Report at ${report.time} added successfully`})
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