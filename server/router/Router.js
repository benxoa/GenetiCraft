const express = require("express");
const router = express.Router();
const { Register, Login } = require("../controllers/AuthController");
const { OpenAi } = require("../controllers/GenerateController");
const {PurchseCredits} = require("../controllers/PurchaseController");
const {Credits} = require("../controllers/CreditsController");
const {DetuctCredits} = require("../controllers/DetuctCredits");
const {Contact} = require("../controllers/ContactController");
const {PlanController,PlanViewController} = require("../controllers/PplanContorller")
const {CreateOrder,CapureOrder} = require("../controllers/PaymentController")




router.post("/register", Register);
router.post("/login", Login);
router.post("/generate", OpenAi);
router.post("/purchase-credits", PurchseCredits);
router.post("/get-credits", Credits);
router.post("/deduct-credits", DetuctCredits);
router.post("/contact", Contact);
router.post("/plan", PlanController);
router.get("/plan", PlanViewController);

//* Payment Routes *//

router.post("/orders", CreateOrder);
router.post("/orders/:orderID/capture", CapureOrder);












module.exports = router;
