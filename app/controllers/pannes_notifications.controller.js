
const db = require('../models');
const panne = db.panne
const vehicules = db.vehicules

const FCM = require('fcm-node')

//Constante globale qui va garder la clé de serveur récuppéré depuis le projet firebase
const SERVER_KEY = "AAAAJiKemy4:APA91bG21d9IEpDG9FXDQZ5wNCimaRNKb5oKhujXt9sc5hqaJmNf7IuEZY2qxsFiPQ4GIfR0vixCpv52JjNRBUnp63UY59GvZ1eNrJNhGgzD2WUD3lsWncxkpBFwfC2EXiQYFiUxAgEg"

const fcm = new FCM(SERVER_KEY)

//Constante globale qui va garder les correspondances idAgentMaintenance token necessaire pour l'envoie des notifications
const Tokens = {}


const subscribe = async (req, res) => {
    if (!req.body.idAgentMaintenance || !req.body.token) {
        return res.status(500).send({ success: false, message: "Some request body fields are missing" })
    }
    Tokens[req.body.idAgentMaintenance] = req.body.token
    return res.status(200).send({ success: true, message: "Registred successfully" })
}
const notify = async (req, res) => {
    try {
        let message = {
            to: Tokens[req.body.idAgentMaintenance],
            notification: {
                title: "Une nouvelle panne est signalé",
                body: "Une panne a survenu au niveau de la vehicule ",
                sound: "default",

                click_action: "FLUTTER_NOTIFICATION_CLICK",
            },

        };
        fcm.send(message, (err, response) => {
            if (err) {

            }

        });
        return res.status(200).send({ success: false, message: "success" });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message })
    }
}
const unSubscribe = (req, res) => {
    if (!req.body.idAgentMaintenance) {
        return res.status(404).send({ success: false, message: "idAgentMaintenance is Missing" })
    }
    delete Tokens[idAgentMaintenance]
    return res.status(200).send({ success: true, message: "Unsubscribed successfully" })
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
            if (Tokens[vehicule.idAgentMaintenance]) {
                try {
                    let message = {
                        to: Tokens[vehicule.idAgentMaintenance],
                        notification: {
                            title: "Une nouvelle panne est signalé",
                            body: "Une panne a survenu au niveau de la vehicule " + vehicule.modele + " " + vehicule.marque,
                            sound: "default",
                            click_action: "FLUTTER_NOTIFICATION_CLICK",
                        },

                    };
                    fcm.send(message, (err, response) => {
                        if (err) {

                        }

                    });
                } catch (err) {
                    return res.status(500).send({ success: false, message: err.message })
                }
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
    notify,
    unSubscribe
}
