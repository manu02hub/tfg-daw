const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const PatientController = require("../controllers/PatientController");

router.post("/create-patient", middleware.auth, PatientController.createPatient);
// router.get("/all-clinics", middleware.auth, ClinicController.getAllClinics);
// router.get("/get-clinic/:id", middleware.auth, ClinicController.getClinic);
// router.post("/delete-clinic/:id", middleware.auth, ClinicController.deleteClinic);
// router.put("/update-clinic/:id", middleware.auth, ClinicController.updateClinic);


module.exports = router;