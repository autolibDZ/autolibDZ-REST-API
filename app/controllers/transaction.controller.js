const db = require("../models");
const Transaction = db.transaction;
const { Op } = require("sequelize");

/**
 * Create and save a new transaction in database
 * @param {*} req The request
 * @param {*} res The response
* @returns {object} The transaction that created 
 */

const createTransaction = async (req, res) => {
     // Validate request

     if (!req.body.idReservation) {
          res.status(400).send({
               error: "validation_error",
               message: "Id reservation can not be empty!"
          });
          return;
     }

     if (!req.body.idLocataire) {
          res.status(400).send({
               error: "validation_error",
               message: "Id locataire can not be empty!"
          });
          return;
     }

     if (typeof (req.body.montant) !== "number") {
          res.status(400).send({
               error: "validation_error",
               message: "montant must be a number",
          });
          return;
     }

     if (req.body.montant < 0) {
          res.status(400).send({
               message: "montant must be a positive number",
          });
          return;
     }


     // Create a transaction
     const transaction = {
          idLocataire: req.body.idLocataire,   //sinon through session
          idReservation: req.body.idReservation,
          montant: req.body.montant,
          moyenPayement: req.body.moyenPayement,
          dateTransaction: req.body.dateTransaction ? req.body.dateTransaction : Date.now(),
     };


     // Save Transaction in the database
     try {
          let reseravation = await Transaction.findAll({
               where: {
                    idReservation: req.body.idReservation
               }
          })
          if (reseravation.length > 0) {
               res.status(400).send({
                    message: "Reservation already paid."
               });
          } else {
               let data = await Transaction.create(transaction)
               res.status(201).send(data);
          }
     }
     catch (err) {
          res.status(500).send({
               error: err.message || "Some error occurred while creating the Transaction."
          });
     }
};


/**
*Returns the transaction history of a specific user
 * @param {*} req The request
 * @param {*} res The response
* @returns {*} A list of transactions
 */

const getUserTransactions = async (req, res) => {
     // Validate request
     if (!req.params.id) {
          res.status(400).send({
               message: "Id locataire can not be empty!"
          });
          return;
     }

     try {
          const id = req.params.id
          let transactions = await Transaction.findAll({
               where: {
                    idLocataire: id
               }
          })
          if (transactions.length > 0) {
               res.status(200).send(transactions)
          } else {
               res.status(404).send({
                    error: "not_found",
                    message: "Locataire with ID " + id + " has no transaction yet"
               })
          }
     }
     catch (err) {
          res.status(500).send({
               error: err.message || "Some error occurred while creating the Transaction."
          });
     }
};


/**
 * Visualize transaction details 
 * @param {*} req The request
 * @param {*} res The response
* @returns {object}  Transaction 
 */


const getTransaction = async (req, res) => {
     // Validate request
     if (!req.params.id) {
          res.status(400).send({
               message: "Id locataire can not be empty!"
          });
          return;
     }

     // get Transaction in the database
     try {
          const id = req.params.id
          const idTransaction = req.params.idTransaction

          let transaction = await Transaction.findOne({
               where: {
                    [Op.and]: [
                         { idLocataire: id },
                         { idTransaction: idTransaction }
                    ]
               }
          })

          if (transaction != null) {
               res.status(200).send(transaction)
          } else {
               res.status(404).send({
                    error: "not_found",
                    message: "Locataire transaction with ID: " + idTransaction + " does not exist"
               })
          }
     }
     catch (err) {
          res.status(500).send({
               error: err.message || "Some error occurred while creating the Transaction."
          });
     }
};

export default {
     createTransaction,
     getUserTransactions,
     getTransaction
}