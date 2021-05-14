const db = require("../models");
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const Locataire = db.locataire;
const Agent= db.agent;
const Administrateur =db.administrateur;


const loginLocataire = async(req, res, next ) => {
        const {email, motdepasse} = req.body;

        if (!email || !motdepasse) {
            res.status(400).send({success: false, error: "Please provide and email and password"})
        }
        // check for user
        const locataire = await Locataire.findOne({where: {email : email}})
        if (!locataire ) {
            res.status(401).send({success: false, error: "Invalid credentials"})
        }

        const motdepasseCorrect= await bcrypt.compare(motdepasse,locataire.motDePasse);

        if(!motdepasseCorrect){
            res.status(401).send({success: false, error: "Invalid credentials"})

        }

        const token = jwt.sign({ id: locataire.idLocataire, role: "locataire"},process.env.JWT_SECRET) ;
        res.send({success: true, token: token });

}


 // Authentfication pour l'application des agents
const loginAgent = async(req, res, next ) => {
    const {email, motdepasse} = req.body;

    if (!email || !motdepasse) {
        res.status(400).send({success: false, error: "Please provide and email and password"})
    }
    // check for user
    const agent = await Agent.findOne({email : email})
    if (!agent ) {
        res.status(401).send({success: false, error: "Invalid credentials"})
    }

    const motdepasseCorrect= await bcrypt.compare(motdepasse,agent.motDePasse);

    if(!motdepasseCorrect){
        res.status(401).send({success: false, error: "Invalid credentials"})

    }

    const token = jwt.sign({ id: this.idAgentMaintenance, role: "AgentMaintenance"},process.env.JWT_SECRET) ;
    res.send({success: true, token: token });

}


 // Authentfication pour l'application des administrateurs
 const loginAdmin = async(req, res, next ) => {
    const {email, motdepasse} = req.body;

    if (!email || !motdepasse) {
        res.status(400).send({success: false, error: "Please provide and email and password"})
    }
    // check for user
    const admin = await Administrateur.findOne({email : email})
    if (!admin ) {
        res.status(401).send({success: false, error: "Invalid credentials"})
    }

    const motdepasseCorrect= await bcrypt.compare(motdepasse,admin.mdp);

    if(!motdepasseCorrect){
        res.status(401).send({success: false, error: "Invalid credentials"})

    }

    const token = jwt.sign({ id: admin.idAdministrateur, role: "administrateur"},process.env.JWT_SECRET) ;
    res.send({success: true, token: token });

}

export default {
    loginLocataire , loginAdmin, loginAgent
}