import panneModel from '../models/panne.model';

const db = require('../models');
const panne = db.panne
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
    let panneData = {
        description: req.body.data.description,
        position: req.body.data.position
    }
    pusher.trigger('agent-maintenance-' + req.body.idAgentMaintenance, 'panne', panneData)
    pusher.trigger('admin', 'panne', panneData)

    await panne.create(panneData)
        .then(data => {
            return res.status(200).send({ success: true, message: "Notifications sent and panne registred successfully" })
        })
        .catch(err => {
            return res.status(500).send({ success: false, message: err.message })
        }
        )

}

export default {
    signalerPanne
}
