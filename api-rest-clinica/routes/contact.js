const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const ContactController = require("../controllers/ContactController");

router.post("/create-contact", middleware.auth, ContactController.createContact);
router.get("/get-contact/:id", middleware.auth, ContactController.getContact);
router.get("/searchContact/:id", middleware.auth, ContactController.searchContact);
router.delete("/delete-contact/:id", middleware.auth, ContactController.deleteContact);
router.put("/update-contact/:id", middleware.auth, ContactController.updateContact);


module.exports = router;