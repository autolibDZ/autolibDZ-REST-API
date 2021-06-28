const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validator = require('validator');
const passwordValidator = require('password-validator')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const db = require("../models");
const Panne = db.panne;
const Vehicule = db.vehicules;


const getAllPannes = async(req, res) => {
    Panne.belongsTo(Vehicule, { foreignKey: 'idVehicule' })
    const panne = await Panne.findAll({
            include: [{
                model: Vehicule,
                attributes: ['numImmatriculation', 'modele', 'marque']
            }],
            attributes: ['description', 'latitude', 'longitude', 'etat']
        }).then(panne => {
            res.send(panne);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération des pannes."
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
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Erreur lors de la récupération de la panne avec l'id=" + id
                    });
                });
        });

}




export default {
    getAllPannes,
    getPanne,
    getVehiculeOfPanne
};