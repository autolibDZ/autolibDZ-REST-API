import stripeCtrl from "../controllers/stripe.controller";

var router = require("express").Router();
    

// POST : create payment intent for the rental app
router.post("/create-payment-intent", stripeCtrl.createPyementIntent);

export default router;