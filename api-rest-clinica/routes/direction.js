const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const DirectionController = require("../controllers/DirectionController");

router.post("/create-direction", middleware.auth, DirectionController.createDirection);
router.get("/get-direction/:id", middleware.auth, DirectionController.getDirection);
router.delete("/delete-direction/:id", middleware.auth, DirectionController.deleteDirection);
router.put("/update-direction/:id", middleware.auth, DirectionController.updateDirection);


module.exports = router;