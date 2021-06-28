
const db = require('../models');
const panne = db.panne
const vehicules = db.vehicules
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

const registrationTokens = {}
const subscribe = async (req, res) => {
    if (!req.body.idAgentMaintenance || !req.body.registrationToken) {
        return res.status(500).send({ success: false, message: "Some request body fields are missing" })
    }
    if (registrationTokens[req.body.idAgentMaintenance]) {
        return res.status(500).send({ success: false, message: "Already registered" })
    }
    registrationTokens[req.body.idAgentMaintenance] = req.body.registrationToken
    console.log(registrationTokens)
    return res.status(200).send({ success: true, message: "Registred successfully" })
}
const signalerPanne = async (req, res) => {

    if (!req.body.idVehicule || !req.body.description || !req.body.longitude || !req.body.latitude) return res.status(500).send({ success: false, message: "Some request body fields are missing" })
    vehicules.findOne({ where: { numChassis: req.body.idVehicule } }).then(vehicule => {
        const panneData = {
            idVehicule: req.body.idVehicule,
            description: req.body.description,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            idAgentMaintenance: vehicule.idAgentMaintenance
        }
        if (vehicule) {
            if (vehicule.etat != 'hors service') {
                vehicule.etat = 'hors service'
                vehicule.save().then(res => {

                }).catch(err => {
                    return res.status(500).send({ success: false, message: err.message })
                })
            }

            panne.create(panneData)
                .then(data => {
                    return res.status(200).send({ success: true, message: "Notifications sent , panne registred and vehicule state changed  successfully" })
                })
                .catch(err => {
                    return res.status(500).send({ success: false, message: err.message })
                }
                )

        } else {
            return res.status(404).send({ success: false, message: "Vehicule not found" })

        }

    }).catch(error => {
        return res.status(500).send({ success: false, message: error.message })
    })






}

export default {
    signalerPanne,
    subscribe,

}
