const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
const createTutorial = async(req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    console.log("heey")
        // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    try {
        data = await Tutorial.create(tutorial)
        res.send(data);

    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the Tutorial."
        });
    }

};

const findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: {
            [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

export default {
    createTutorial,
    findAll
}