import transactionCtrl from "../controllers/transaction.controller";

var router = require("express").Router();

router.post("/", transactionCtrl.createTransaction);
router.get("/:id", transactionCtrl.getUserTransactions)

export default router;