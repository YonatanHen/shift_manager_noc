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



module.exports = router;