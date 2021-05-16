const db = require("../models");
const Agent = db.agent;
const bcrypt = require('bcryptjs')
// La creation d'un locataire (lors de l'inscription)
const createAgent = async (req, res) => {
    // Validate request
    if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.motdepasse || !req.body.salaire) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const mdp = await bcrypt.hash(req.body.motdepasse, salt);

    const agent = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: mdp,
        salaire: req.body.salaire

    };


    // Enregistrer le locataire dans la BDD
    try {
        const data = await Agent.create(agent)
        res.status(200).send({ success: true, message: `Agent ${agent.nom} ${agent.prenom} created successfully` });

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the agent."
        });
    }

};

//Retourner tout les locataires
const findAll = (req, res) => {
    var condition = 1 === 1

    Agent.findAll({ where: condition })
        .then(data => {
            if (data.length == 0) {
                return res.status(400).send({
                    success: false,
                    message: "No agents were found"
                });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving agents."
            });
        });
};

const findOne = async (req, res) => {

    Agent.findOne({ where: { idAgentMaintenance: req.params.id } })
        .then(data => {
            if (!data) {
                return res.status(400).send({
                    success: false,
                    message: "Agent not found"
                });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving agent."
            });
        });
};
const updateAgent = async (req, res) => {
    if (req.body.motdepasse) {
        const salt = await bcrypt.genSalt(10);
        req.body.motDePasse = await bcrypt.hash(req.body.motdepasse, salt);
    }
    Agent.update(req.body, { where: { idAgentMaintenance: req.params.id } })
        .then(result => {
            res.status(200).send({
                success: true,
                message: `Agent ${req.body.nom} ${req.body.prenom} updated successfully`
            })
        }).catch(err => {
            res.status(400).send({
                success: false,
                message: err.message
            })
        })
}
const deleteAgent = async (req, res) => {
    Agent.destroy({ where: { idAgentMaintenance: req.params.id } }).then(result => {
        res.status(200).send({
            success: true,
            message: `Agent deleted successfully`
        })
    }).catch(err => {
        res.status(400).send({
            success: false,
            message: err.message
        })
    })
}
export default {
    createAgent,
    findAll,
    findOne,
    updateAgent,
    deleteAgent
}