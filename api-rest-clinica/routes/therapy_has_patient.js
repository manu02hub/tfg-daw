const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const Therapy_has_PatientController = require("../controllers/Therapy_has_PatientContoller");

router.post("/create-therapy_has_patient", middleware.auth, Therapy_has_PatientController.createTherapy_has_Patient);
router.get("/get-therapy_has_patient/:id", middleware.auth, Therapy_has_PatientController.getTherapy_has_Patient);
router.get("/get-therapy_has_patientById/:id", middleware.auth, Therapy_has_PatientController.getTherapy_has_PatientById);
router.delete("/delete-therapy_has_patient/:id", middleware.auth, Therapy_has_PatientController.deleteTherapy_has_Patient);

module.exports = router;