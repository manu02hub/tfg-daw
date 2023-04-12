const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/prueba-usuario", UserController.pruebaUser);

module.exports = router;