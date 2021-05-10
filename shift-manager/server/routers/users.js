express = require('express')
router = new express.Router()
var ObjectID = require('mongodb').ObjectID;

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
router.post("/adduser", async (req, res) => {
  try {
    let result = await db.collection("users").insertOne(req.body);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

/**
 * Handles delete user http request
 */
router.get("/deleteuser/:_id", async (req, res) => {
  const id = req.params._id;
  try {
    var result = await db.collection('users').remove({"_id": ObjectID(id)}) 
    res.send(result)
  } catch (err) {
    res.send(err);
  }
});


module.exports = router