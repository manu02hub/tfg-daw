const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const TutorController = require("../controllers/TutorController");

router.post("/create-tutor", middleware.auth, TutorController.createTutor);
router.get("/get-tutor/:id", middleware.auth, TutorController.getTutor);
router.get("/get-tutorContact/:id", middleware.auth, TutorController.getTutorContact);
router.delete("/delete-tutor/:id", middleware.auth, TutorController.deleteTutor);
router.put("/update-tutor/:id", middleware.auth, TutorController.updateTutor);


module.exports = router;