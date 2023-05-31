const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const UserController = require("../controllers/UserController");

router.get("/getAll-user/:id", middleware.auth, UserController.getAllUsers);
router.get("/getUsers-clinic/:id/:clinic?", middleware.auth, UserController.getUsersClinic);
router.get("/edit-user/:id", middleware.auth, UserController.editUser);
router.get("/get-user/:id", middleware.auth, UserController.getUser);
router.get("/search-user/:email/:id", middleware.auth, UserController.searchUser);
router.put("/update-user/:id", middleware.auth, UserController.updateUser);
router.post("/delete-user/:id", middleware.auth, UserController.deleteUser);
router.post("/create-user", middleware.auth, UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;