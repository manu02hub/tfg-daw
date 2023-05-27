const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const OtherController = require("../controllers/OtherController");

router.post("/create-other", middleware.auth, OtherController.createOther);
router.get("/get-other/:id", middleware.auth, OtherController.getOther);
router.delete("/delete-other/:id", middleware.auth, OtherController.deleteOther);
router.put("/update-other/:id", middleware.auth, OtherController.updatOther);


module.exports = router;