const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const DayBlockedController = require("../controllers/DayBlockedController");

router.post("/create-dayBlocked", middleware.auth, DayBlockedController.createBlocked);
router.get("/all-dayBlocked/:id", middleware.auth, DayBlockedController.getDaysBlockedClinic);
router.get("/get-dayBlocked/:id", middleware.auth, DayBlockedController.getDayBlocked);
router.delete("/delete-dayBlocked/:id", middleware.auth, DayBlockedController.deleteDayBlocked);


module.exports = router;