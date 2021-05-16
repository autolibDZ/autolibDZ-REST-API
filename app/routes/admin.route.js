import adminController from "../controllers/admin.controller";

var adminRouter = require("express").Router();


adminRouter.post("/", adminController.createAdmin);
adminRouter.get("/", adminController.findAll);
adminRouter.get("/:id", adminController.findOne);
adminRouter.put("/:id", adminController.updateAdmin)
adminRouter.delete("/:id", adminController.deleteAdmin)

export default adminRouter;