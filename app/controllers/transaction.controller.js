const db = require("../models");
const Transaction = db.transaction;
const { Op } = require("sequelize");


/**
 * Filter user transactions
 * @param {*} req The request
 * @param {*} res The response
* @returns {object} A list of filtered transactions
 */

const filterTransaction = async (req, res) => {

     // Validate request
     if (!req.params.id) {
          res.status(400).send({
               message: "Id locataire can not be empty!"
          });
          return;
     }

     var options = {};

     //let reservation = req.body.reseravation;
     let dateTransaction = req.body.dateTransaction;
     let dateFrom = req.body.dateFrom;
     let dateTo = req.body.dateTo;

     let montant = req.body.montant;
     let montantFrom = req.body.montantFrom;
     let montantTo = req.body.montantTo;

     let moyenPayement = req.body.moyenPayement


     if (montant) {
          options.montant = {
               [Op.eq]: montant
          }
     }
     if (montantFrom) {
          options.montant = {
               [Op.gte]: montantFrom
          }
     }
     if (montantTo) {
          options.montant = {
               [Op.lt]: montantTo
          }
     }

     if (dateTransaction) {
          options.dateTransaction = {
               [Op.eq]: dateTransaction
          }
     }
     if (dateFrom) {
          options.dateTransaction = {
               [Op.gte]: dateFrom
          }
     }
     if (dateTo) {
          options.dateTransaction = {
               [Op.lt]: prixTo
          }
     }

     if (moyenPayement) {
          options.moyenPayement = moyenPayement
     }

     console.log(options)

     // Save Transaction in the database
     try {
          const id = req.params.id
          let locataire = await Transaction.findAll({
               where: {
                    idLocataire: id
               }
          })
          if (locataire.length > 0) {
               let transactions = await Transaction.findAll({
                    where: {
                         [Op.and]: [
                              { idLocataire: id },
                              options
                         ]
                    },
                    order: [
                         ['dateTransaction','DESC']
                    ]
               })
               if (transactions.length <= 0) {
                    res.status(404).send({
                         error: "There is no transaction with these parameters."
                    });
               } else {
                    res.status(200).send(transactions);
               }
          } else {
               res.status(404).send({ "error": "le locataire avec id " + id + " n'a pas encore de transactions." })
          }
     }
     catch (err) {
          res.status(500).send({
               error: err.message || "Some error occurred while filtering Transaction."
          });
     }
}

export default {
     filterTransaction
}
