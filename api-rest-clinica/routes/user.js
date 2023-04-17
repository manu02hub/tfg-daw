const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const UserController = require("../controllers/UserController");

router.get("/prueba-user", middleware.auth, UserController.pruebaUser);
router.get("/getAll-user/", middleware.auth, UserController.getAllUsers);
router.get("/getUsers/:clinic", middleware.auth, UserController.getUsersClinic);
router.get("/edit-user/:id", middleware.auth, UserController.editUser);
router.get("/get-user/:id", middleware.auth, UserController.getUser);
router.put("/update-user/:id", middleware.auth, UserController.updateUser);
router.delete("/delete-user/:id", middleware.auth, UserController.deleteUser);
router.post("/create-user", middleware.auth, UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;