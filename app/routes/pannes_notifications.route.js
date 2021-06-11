var router = require("express").Router();

import pannesNotificationsController from "../controllers/pannes_notifications.controller"

router.post('/signalerPanne', pannesNotificationsController.signalerPanne)

export default router
