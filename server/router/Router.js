const express = require("express");
const router = express.Router();
const { Register, Login,Verify,ResetPassword } = require("../controllers/AuthController");
const { OpenAi } = require("../controllers/GenerateController");
const {PurchseCredits} = require("../controllers/PurchaseController");
const {Credits} = require("../controllers/CreditsController");
const {DetuctCredits} = require("../controllers/DetuctCredits");
const {Contact} = require("../controllers/ContactController");
const {PlanController,PlanViewController} = require("../controllers/PplanContorller")
const {CreateOrder,CapureOrder} = require("../controllers/PaymentController")
const {ImageGenerate} = require("../controllers/tools/ImageController")
const {Summery} = require("../controllers/tools/SummeryController")
const {TextGenerator} = require("../controllers/tools/TextController")
const {Plagrsim} = require("../controllers/tools/PlagrismController")
const {Article} = require("../controllers/tools/ArticleController")






router.get("/verify", Verify);
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

//*Tools Routes *//
router.post("/imagegenerator", ImageGenerate)
router.post("/summerygenerator", Summery)
router.post("/textgenerator", TextGenerator)
router.post("/plagrismchecker", Plagrsim)
router.post("/articlegenerator", Article)




//*User Routes *//
router.post("/register", Register);
router.post("/login", Login);
router.post("/reset-password", ResetPassword);















module.exports = router;
