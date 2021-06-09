const db = require("../models");
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const Locataire = db.locataire;
const Agent = db.agent;
const Administrateur = db.administrateur;
const Operateur= db.operateur;
const Dirigeant = db.dirigenat;


const loginLocataire = async(req, res, next) => {
    const { email, motdepasse } = req.body;

    if (!email || !motdepasse) {
        res.status(400).send({ success: false, error: "Please provide and email and password" })
    }
    // check for locataire
    else {
        const locataire = await Locataire.findOne({ where: { email: email } })
        if (!locataire) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {

            const motdepasseCorrect = await bcrypt.compare(motdepasse, locataire.motDePasse);

            if (!motdepasseCorrect) {
                res.status(401).send({ success: false, error: "Invalid credentials" })

            } else {
                if(!locataire.Active){
                    res.status(401).send({ success: false, error: "Account disabled!" })
                } else {
                const token = jwt.sign({ id: locataire.idLocataire, role: "locataire" }, process.env.JWT_SECRET);
                res.send({ success: true, token: token });
                //console.log("locataires connection established!")
                }
            }
        }
    }
}


// Authentfication pour l'application des agents
const loginAgent = async(req, res, next) => {
    const { email, motdepasse } = req.body;

    if (!email || !motdepasse) {
        res.status(400).send({ success: false, error: "Please provide  email and password" })
    }
    // check for agent
    else {

        const agent = await Agent.findOne({ where: { email: email } })
        if (!agent) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {
            const motdepasseCorrect = await bcrypt.compare(motdepasse, agent.motDePasse);

            if (!motdepasseCorrect) {
                res.status(401).send({ success: false, error: "Invalid credentials" })
            } else {
                const token = jwt.sign({ id: agent.idAgentMaintenance, role: "AgentMaintenance" }, process.env.JWT_SECRET);
                res.send({ success: true, token: token });
            }
        }
    }
}


// Authentfication pour l'application des administrateurs
const loginAdmin = async(req, res, next) => {
    const { email, motdepasse } = req.body;

    if (!email || !motdepasse) {
        res.status(400).send({ success: false, error: "Please provide  email and password" })
    }
    // check for admin
    else {
        const admin = await Administrateur.findOne({ where: { email: email } })
        if (!admin) {
            
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {
            const motdepasseCorrect = await bcrypt.compare(motdepasse, admin.motDePasse);

            if (!motdepasseCorrect) {
                res.status(401).send({ success: false, error: "Invalid credentials" })
            } else {
                const token = jwt.sign({ id: admin.idAdministrateur, role: "administrateur" }, process.env.JWT_SECRET);
                res.send({ success: true, token: token });

            }
        }
    }
}

//Authentfication pour l'application des operateur
const loginOperateur = async(req, res, next) => {
    const { email, motdepasse } = req.body;

    if (!email || !motdepasse) {
        res.status(400).send({ success: false, error: "Please provide  email and password" })
    }
    // check for operateur
    else {
        const operateur = await Operateur.findOne({ where: { email: email } })
        if (!operateur) {
            
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {
            const motdepasseCorrect = await bcrypt.compare(motdepasse, operateur.motDePasse);

            if (!motdepasseCorrect) {
                res.status(401).send({ success: false, error: "Invalid credentials" })
            } else {
                const token = jwt.sign({ id: operateur.idOperateur, role: "operateur" }, process.env.JWT_SECRET);
                res.send({ success: true, token: token });

            }
        }
    }
}

//Authentfication pour l'application des operateur
const loginDirigeant= async(req, res, next) => {
    const { email, motdepasse } = req.body;

    if (!email || !motdepasse) {
        res.status(400).send({ success: false, error: "Please provide  email and password" })
    }
    // check for operateur
    else {
        const dirigeant = await Dirigeant.findOne({ where: { email: email } })
        if (!dirigeant) {
            
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {
            const motdepasseCorrect = await bcrypt.compare(motdepasse, dirigeant.motDePasse);

            if (!motdepasseCorrect) {
                res.status(401).send({ success: false, error: "Invalid credentials" })
            } else {
                const token = jwt.sign({ id: dirigeant.idDirigeant, role: "dirigeant" }, process.env.JWT_SECRET);
                res.send({ success: true, token: token });

            }
        }
    }
}



export default {
    loginLocataire,
    loginAdmin,
    loginAgent,
    loginOperateur,
    loginDirigeant
}