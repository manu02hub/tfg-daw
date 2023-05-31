const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const ClinicController = require("../controllers/ClinicController");

router.post("/create-clinic", middleware.auth, ClinicController.createClinic);
router.get("/all-clinics", middleware.auth, ClinicController.getAllClinics);
router.get("/get-clinic/:id", middleware.auth, ClinicController.getClinic);
router.get("/search-clinic/:direction", middleware.auth, ClinicController.searchClinic);
router.post("/delete-clinic/:id", middleware.auth, ClinicController.deleteClinic);
router.put("/update-clinic/:id", middleware.auth, ClinicController.updateClinic);


module.exports = router;