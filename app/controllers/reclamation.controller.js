const db = require("../models");
const Reclamation = db.reclamation;

/**
 * Create and save a new claim in database
 * @param {*} req The request
 * @param {*} res The response
 */
// Create and Save a new Claim

const createReclamation = async (req, res) => {
  // Create a Claim

  if (!req.body.description || !req.body.emailLocataire) {
    res.status(400).send({
      message: "parameters can't be empty!"
    })
    return;
  }

  const reclamation = {
    description: req.body.description,
    emailLocataire: req.body.emailLocataire,
  };

  // Save Claim in the database

  try {
    let result = await Reclamation.findAll({
      where: {
        description: req.body.description,
      }
    })
    if (result.length > 0) {
      res.status(400).send({
        message: "Reclamation already exists!"
      })
    } else {
      let data = await Reclamation.create(reclamation)
      res.send(data);
    }
  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some error occurred while creating the Claim."

    });

  }

};

/**
 * Return a claim with the specified ID in request body
 * @param {*} req The request
 * @param {*} res The response
 */
//Return claim with idReclamation = id

const getReclamationDetails = async (req, res) => {

  if (!req.params.id) {

    res.status(400).send({

      message: "params 'id' can not be empty!"

    });

    return;
  }

  try {
    const id = req.params.id;

    const data = await Reclamation.findByPk(id)

    if (data != null && data.length != 0) {

      res.send(data);

    } else {

      res.status(404).send({

        message: "Reclamation with id " + id + " does not exist"

      })
    }
  }
  catch (err) {

    res.status(500).send({

      error: err.message || "Some internal error occurred while getting Reclamation."
    });
  }

};
/**
 * Return all reclamations in database
 * @param {*} req request 
 * @param {*} res response
 */
const getAllReclamations = async (req, res) => {
  try {

    const data = await Reclamation.findAll()
    if (data != null && data.length != 0) {

      res.send(data);
      return;

    } else {

      res.status(404).send({

        message: "Reclamation table is empty!"

      })
      return;
    }

  } catch (err) {
    res.status(500).send({

      error: err.message || "Some error occurred while getting Reclamations."

    });
    return;
  }
};


/**
 * Delete a claim with the specified ID in request body
 * @param {*} req The request
 * @param {*} res The response
 */
//Delete claim with idReclamaton = id

const deleteReclamation = async (req, res) => {
	const id = req.params.id;

	Reclamation.destroy({
		where: { idReclamation: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Claim was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete Claim with id=${id}. Maybe Claim was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Claim with id=' + id,
			});
		});
};
export default {
    createReclamation,
    getReclamationDetails,
    getAllReclamations, 
    deleteReclamation
}