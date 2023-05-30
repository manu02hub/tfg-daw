const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth");

const BillController = require("../controllers/BillContoller")

router.post("/create-bill", middleware.auth, BillController.createBill);
router.get("/get-bill/:id", middleware.auth, BillController.getBill);
router.get("/get-bills/:id", middleware.auth, BillController.getBills);
router.delete("/delete-bill/:id", middleware.auth, BillController.deleteBill);
router.put("/update-bill/:id", middleware.auth, BillController.updateBill);


module.exports = router;