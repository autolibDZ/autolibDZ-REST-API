import { panne } from '../models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require('validator');
const passwordValidator = require('password-validator')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const db = require("../models");
const Panne = db.panne;
const Vehicule = db.vehicules;


const getAllPannes = async (req, res) => {
    Panne.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des pannes."
            });
        });
};

const getPanne = (req, res) => {

    const id = req.params.id;

    Panne.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la récupération de la panne avec l'id=" + id
            });
        });
};


const getVehiculeOfPanne = (req, res) => {

    const id = req.params.id;

    Panne.findByPk(id)
        .then(data => {
            const idVehicule = data.idVehicule
            Vehicule.findByPk(idVehicule)
                .then(vehicule => {
                    res.status(200).send(vehicule)
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Erreur lors du véhicule tombé en panne"
                    });
                }
                )
                .catch(err => {
                    res.status(500).send({
                        message: "Erreur lors de la récupération de la panne avec l'id=" + id
                    });
                });
        });

}
const getUnfixedPannes = (req, res) => {
    const idAgentMaintenance = req.params.idAgentMaintenance
    Panne.findAll({ where: { idAgentMaintenance, etat: true } }).then(data => { res.status(200).send(data) }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message
        })
    })
}
const getFixedPannes = (req, res) => {
    const idAgentMaintenance = req.params.idAgentMaintenance
    Panne.findAll({ where: { idAgentMaintenance, etat: false } }).then(data => { res.status(200).send(data) }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message
        })
    })
}
const fixPanne = (req, res) => {
    const idPanne = req.params.idPanne
    Panne.findOne({ where: { idPanne: idPanne } }).then(panne => {
        panne.etat = false
        panne.save().then(result => {
            Panne.findAll({ where: { idVehicule: panne.idVehicule, etat: true } }).then(result1 => {
                if (result1.length != 0) {
                    return res.status(200).send({ success: true, message: 'panne state updated succefully' })
                } else {
                    Vehicule.findOne({ where: { numChassis: panne.idVehicule } }).then(vehicule => {
                        vehicule.etat = 'en service'
                        vehicule.save().then(result2 => {
                            return res.status(200).send({ success: true, message: 'panne state and vehicule state were updated succefully ' })
                        }).catch(err => {
                            res.status(500).send({ success: false, message: err.message })
                        })
                    })
                }
            }).catch(err => {
                res.status(500).send({ success: false, message: err.message })
            })
        }).catch(err => {
            res.status(500).send({ success: false, message: err.message })
        })
    })
}



export default {
    getAllPannes,
    getPanne,
    getVehiculeOfPanne,
    fixPanne,
    getFixedPannes,
    getUnfixedPannes
};