const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const RolController = require("../controllers/RolController");

router.get("/getAll-roles", middleware.auth, RolController.getAllRoles);


module.exports = router;