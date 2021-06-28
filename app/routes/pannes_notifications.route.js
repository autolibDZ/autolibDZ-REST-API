var router = require("express").Router();

import pannesNotificationsController from "../controllers/pannes_notifications.controller"

router.post('/signalerPanne', pannesNotificationsController.signalerPanne)
router.post('/subscribe', pannesNotificationsController.subscribe)

export default router
