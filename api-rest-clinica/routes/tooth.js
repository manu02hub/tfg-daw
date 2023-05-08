const express = require("express");
const router = express.Router();

const ToothController = require("../controllers/ToothController");

router.post("/create-tooth", ToothController.createTooth);
router.get("/get-teethOdontogram/:id", ToothController.getTheetOdontogram);


module.exports = router;