import transactionCtrl from "../controllers/transaction.controller";

var router = require("express").Router();


//get stats
router.get("/stats/:year", transactionCtrl.TransactionStats);

//get years
router.get("/getYears", transactionCtrl.getYears);

router.post("/", transactionCtrl.createTransaction);

//get User transactions
router.get("/:id", transactionCtrl.getUserTransactions)

//get detail of transaction
router.get("/:id/:idTransaction", transactionCtrl.getTransaction);

//get filtered routes
router.post("/:id/filter", transactionCtrl.filterTransaction);

export default router;