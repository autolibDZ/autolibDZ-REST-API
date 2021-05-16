const db = require("../models");
const bcrypt = require('bcryptjs')
const Admin = db.administrateur;

// La creation d'un locataire (lors de l'inscription)
const createAdmin = async (req, res) => {
    // Validate request
    if (!req.body.nom || !req.body.prenom || !req.body.email || !req.body.motdepasse || !req.body.salaire) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const mdp = await bcrypt.hash(req.body.motdepasse, salt);

    const admin = {

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: mdp,
        salaire: req.body.salaire

    };


    // Enregistrer l'administrateur dans la BDD
    try {
        const data = await Admin.create(admin)
        res.status(200).send({ success: true, message: `Admin ${admin.nom} ${admin.prenom} created successfully` });

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating l'Administrateur."
        });
    }

};

//Retourner tout les locataires
const findAll = (req, res) => {
    var condition = 1 === 1

    Admin.findAll({ where: condition })
        .then(data => {
            if (data.length == 0) {
                return res.status(400).send({
                    success: false,
                    message: "No Admins were found"
                });
            }
            res.status(200).send({ success: true, data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving administrateur."
            });
        });
};

const findOne = async (req, res) => {

    Admin.findOne({ where: { idAdministrateur: req.params.id } })
        .then(data => {
            if (!data) {
                return res.status(400).send({
                    success: false,
                    message: "Admin not found"
                });
            }
            res.status(200).send({ success: true, data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the admin."
            });
        });
};
const updateAdmin = async (req, res) => {
    if (req.body.motdepasse) {
        const salt = await bcrypt.genSalt(10);
        req.body.motDePasse = await bcrypt.hash(req.body.motdepasse, salt);
    }
    Admin.update(req.body, { where: { idAdministrateur: req.params.id } })
        .then(result => {
            res.status(200).send({
                success: true,
                message: `Admin updated successfully`
            })
        }).catch(err => {
            res.status(400).send({
                success: false,
                message: err.message
            })
        })
}
const deleteAdmin = async (req, res) => {
    Admin.destroy({ where: { idAdministrateur: req.params.id } }).then(result => {
        res.status(200).send({
            success: true,
            message: `Admin deleted successfully`
        })
    }).catch(err => {
        res.status(400).send({
            success: false,
            message: err.message
        })
    })
}
export default {
    createAdmin,
    findAll,
    findOne,
    updateAdmin,
    deleteAdmin
}