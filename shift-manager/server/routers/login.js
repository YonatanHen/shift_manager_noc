express = require("express");
router = new express.Router();
var ObjectID = require("mongodb").ObjectID;
router.post("/login", async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    const isExist = await db.collection("users").findOne(user);
    console.log("printing user isExist");
    console.log(isExist);
    if (!isExist) {
      return res.status(400).send({ msg: "User not found" });
    } else {
      res.status(200).send(isExist);
    }
  } catch (err) {
    res.status(500).send();
  }
});

// router.get('/getusers', async (req, res) => {
//     console.log('entered');
//     try {

//         let users = await db.collection('users').find().toArray(function (err, docs) {

//             res.send(docs)
//         })

//     } catch(err) {
//         res.send(err)
//     }
// })
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

    //Find one user by his id
    const user = await db.collection('users').findOne({"_id": ObjectID(id)})

    console.log(user)

    if(!user) {
        return res.status(404).send({message: "user not found!"})
    }

    await db.collection('users').remove(user) 
    
    res.send({message: `${user.username} deleted successfully.`})
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
