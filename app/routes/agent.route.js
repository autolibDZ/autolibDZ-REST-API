const express = require('express');
const router = express.Router();
const agentControleur= require('../controllers/agent.controller')

router.get('/', agentControleur.findAll);
router.get('/:id', agentControleur.findOne);
router.post('/',agentControleur.create);
router.put("/:id", agentControleur.update);
router.delete("/:id", agentControleur.delete);
router.delete("/", agentControleur.deleteAll);

module.exports = router;