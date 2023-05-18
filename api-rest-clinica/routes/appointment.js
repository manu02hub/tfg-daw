const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const AppointmentController = require("../controllers/AppointmentContoller");

router.post("/create-appointment", middleware.auth, AppointmentController.createAppointment);
router.get("/getAppointment-cabinet/:id", middleware.auth, AppointmentController.getAppointmentsCabinet);
router.get("/get-appointment/:id", middleware.auth, AppointmentController.getAppointment);
router.put("/update-appointment/:id", middleware.auth, AppointmentController.updateAppointment);
router.delete("/delete-appointment/:id", middleware.auth, AppointmentController.deleteAppointment);


module.exports = router;