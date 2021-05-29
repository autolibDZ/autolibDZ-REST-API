const db = require("../models");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const Transaction = db.transaction;


/**
 * Create and save a new transaction in database
 * @param {*} req The request
 * @param {*} res The response
* @returns {object} The transaction that created 
 */

const createTransaction = async (req, res) => {

     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]

     if (token == null) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }

     try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
          if (user != undefined) {
               const role = user.role
               if (role == "locataire") {
                    res.status(403).send({
                         error: "authorization_required",
                         message: "Access Forbidden,you can't do this operation",
                    });
                    return;
               }
          }

     } catch (err) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }


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
          idLocataire: req.body.idLocataire,
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

     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]

     if (token == null) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }
     try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
          if (user != undefined) {
               const role = user.role
               if (role == "locataire") {
                    res.status(403).send({
                         error: "authorization_required",
                         message: "Access Forbidden,you can't do this operation",
                    });
                    return;
               }
          }
     } catch (err) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }

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
               error: err.message || "Some error occurred while getting Transactions."
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
     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]

     if (token == null) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }

     try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
          if (user != undefined) {
               const role = user.role
               if (role == "locataire") {
                    res.status(403).send({
                         error: "authorization_required",
                         message: "Access Forbidden,you can't do this operation",
                    });
                    return;
               }
          }
     } catch (err) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }

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
               error: err.message || "Some error occurred while getting the Transaction."
          });
     }
};

/**
 * Filter user transactions
 * @param {*} req The request
 * @param {*} res The response
* @returns {object} A list of filtered transactions
 */

const filterTransaction = async (req, res) => {
     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]

     if (token == null) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }

     try {
          const user = jwt.verify(token, process.env.JWT_SECRET);
          if (user != undefined) {
               const role = user.role
               if (role == "locataire") {
                    res.status(403).send({
                         error: "authorization_required",
                         message: "Access Forbidden,you can't do this operation",
                    });
                    return;
               }
          }
     } catch (err) {
          res.status(403).send({
               error: "invalid_access_token",
               message: "Access Forbidden,invalid token",
          });
          return;
     }

     // Validate request
     if (!req.params.id) {
          res.status(400).send({
               message: "Id locataire can not be empty!"
          });
          return;
     }

     var options = {};

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
                         ['dateTransaction', 'DESC']
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
               res.status(404).send({
                    error: "not_found",
                    message: "Locataire with ID " + id + " has no transaction yet"
               })
          }
     }
     catch (err) {
          res.status(500).send({
               error: err.message || "Some error occurred while filtering Transaction."
          });
     }
};

export default {
     createTransaction,
     getUserTransactions,
     getTransaction,
     filterTransaction
}