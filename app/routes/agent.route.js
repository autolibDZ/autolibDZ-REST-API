import agentController from "../controllers/agent.controller";

var agentRouter = require("express").Router();


agentRouter.post("/", agentController.createAgent);
agentRouter.get("/", agentController.findAll);
agentRouter.get("/:id", agentController.findOne);
agentRouter.put("/:id", agentController.updateAgent)
agentRouter.delete("/:id", agentController.deleteAgent)

export default agentRouter;