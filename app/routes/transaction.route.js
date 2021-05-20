import transactionCtrl from "../controllers/transaction.controller";

var router = require("express").Router();

router.post("/:id/filter", transactionCtrl.filterTransaction);


export default router;