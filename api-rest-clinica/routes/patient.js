const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const PatientController = require("../controllers/PatientController");

router.post("/create-patient", middleware.auth, PatientController.createPatient);
router.get("/all-patients", middleware.auth, PatientController.getAllPatients);
router.get("/get-patient/:id", middleware.auth, PatientController.getPatient);
router.post("/delete-patient/:id", middleware.auth, PatientController.deletePatient);
router.put("/update-patient/:id", middleware.auth, PatientController.updatePatient);


module.exports = router;