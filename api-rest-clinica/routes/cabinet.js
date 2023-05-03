const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const CabinetController = require("../controllers/CabinetController");

router.post("/create-cabinet", middleware.auth, CabinetController.createCabinet);
router.get("/all-cabinets", middleware.auth, CabinetController.getAllCabinets);
router.get("/get-cabinet/:id", middleware.auth, CabinetController.getCabinet);
router.get("/all-cabinetClinic/:id", middleware.auth, CabinetController.getAllGabinetClinic);
router.delete("/delete-cabinet/:id", middleware.auth, CabinetController.deleteCabinet);
router.put("/update-cabinet/:id", middleware.auth, CabinetController.updateCabinet);


module.exports = router;