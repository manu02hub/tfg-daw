const express = require("express");
const router = express.Router();

const OdontogramController = require("../controllers/OdontogramController");

router.post("/create-odontogram", OdontogramController.createOdontogram);
router.get("/all-odontograms", OdontogramController.getAllOdontograms);
router.get("/get-odontogram/:id", OdontogramController.getOdontogram);


module.exports = router;