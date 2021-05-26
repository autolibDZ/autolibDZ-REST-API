const db = require('../models');
const agent = db.agent
const vehicules = db.vehicules
const vehiculesController = require('./vehicules.controller')
const Pusher = require('pusher')


const appId = process.env.PUSHER_APP_ID
const key = process.env.PUSHER_KEY
const secret = process.env.PUSHER_SECRET
const cluster = process.env.PUSHER_CLUSTER


const pusher = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true
})

const signalerPanne = async (req, res) => {
    pusher.trigger(req.body.idAgentMaintenance, 'event', req.body)
    return res.status(200).send({ success: true, message: "Notification sent" })
}

export default {
    signalerPanne
}
