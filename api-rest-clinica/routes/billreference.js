const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const BillReferenceController = require("../controllers/BillReferenceController");

router.post("/create-billreference", middleware.auth, BillReferenceController.createBillReference);
router.get("/get-billreference/:id", middleware.auth, BillReferenceController.getBillReference);
router.get("/get-billreferences/:id", middleware.auth, BillReferenceController.getBillReferences);
router.delete("/delete-billreference/:id", middleware.auth, BillReferenceController.deleteBillReference);
router.put("/update-billreference/:id", middleware.auth, BillReferenceController.updateBillReference);


module.exports = router;