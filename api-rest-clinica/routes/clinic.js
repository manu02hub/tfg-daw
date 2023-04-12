const express = require("express");
const router = express.Router();

const ClinicController = require("../controllers/ClinicController");

router.post("/create-clinic", ClinicController.createClinic);
router.get("/all-clinics", ClinicController.getAllClinics);
router.get("/get-clinic/:id", ClinicController.getClinic);
router.delete("/delete-clinic/:id", ClinicController.deleteClinic);
router.put("/update-clinic/:id", ClinicController.updateClinic);


module.exports = router;