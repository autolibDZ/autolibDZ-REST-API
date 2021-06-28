const express = require('express');
const router = express.Router();

import agentControleur from "../controllers/agent.controller";

router.get('/sumAvgSalaries', agentControleur.getSumAvgSalaries);

router.get('/', agentControleur.getAllAgents);
router.get('/:id', agentControleur.getAgent);
router.post('/',agentControleur.createAgent);
router.put("/:id", agentControleur.updateAgent);
router.delete("/:id", agentControleur.deleteAgent);
router.delete("/", agentControleur.deleteAllAgents);

module.exports = router;