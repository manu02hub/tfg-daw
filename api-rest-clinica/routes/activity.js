const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const ActivityController = require("../controllers/ActivityController");

router.post("/create-activity", middleware.auth, ActivityController.createActivity);
router.get("/get-activities/:id", middleware.auth, ActivityController.getActivity);

module.exports = router;