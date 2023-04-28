const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const TherapyController = require("../controllers/TherapyController");

router.post("/create-therapy", middleware.auth, TherapyController.createTherapy);
router.get("/all-therapies", middleware.auth, TherapyController.getAllTherapies);
router.get("/get-therapy/:id", middleware.auth, TherapyController.getTherapy);
router.delete("/delete-therapy/:id", middleware.auth, TherapyController.deleteTherapy);
router.put("/update-therapy/:id", middleware.auth, TherapyController.updateTherapy);


module.exports = router;