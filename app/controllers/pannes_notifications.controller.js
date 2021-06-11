
const db = require('../models');
const panne = db.panne
const Pusher = require('pusher')
const vehicules = db.vehicules

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

    if (!req.body.idVehicule || !req.body.description || !req.body.longtitude || !req.body.latitude) return res.status(500).send({ success: false, message: "Some request body fields are missing" })
    try {
        const vehicule = vehicules.findOne({ where: { numChassis: req.body.idVehicule } })
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message })
    }

    const panneData = {
        idVehicule: req.body.idVehicule,
        description: req.body.description,
        longtitude: req.body.longtitude,
        latitude: req.body.latitude
    }
    try {
        pusher.trigger('agent-maintenance-' + req.body.idAgentMaintenance, 'panne', panneData)
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message })

    }


    await panne.create(req.body)
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
