var router = require("express").Router();

import pannesNotificationsController from "../controllers/pannes_notifications.controller"

router.post('/signalerPanne', pannesNotificationsController.signalerPanne)
router.post('/subscribe', pannesNotificationsController.subscribe)
router.post('/unsubscribe', pannesNotificationsController.unSubscribe)
router.post('/notify', pannesNotificationsController.notify)

export default router
