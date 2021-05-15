const db = require("../models");
const Transaction = db.transaction;

// Create and Save a new transaction
const createTransaction = async (req, res) => {
     // Validate request
     if (!req.body.idReservation) {
          res.status(400).send({
               message: "Id reservation can not be empty!"
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
          let data = await Transaction.create(transaction)
          res.status(201).send(data);
     }
     catch (err) {
          res.status(500).send({
               error: err.message || "Some error occurred while creating the Transaction."
          });
     }
};


// historique de toutes les transactions d'un locataire
const getUserTransactions = async (req, res) => {
     // Validate request
     if (!req.params.id) {
          res.status(400).send({
               message: "Id locataire can not be empty!"
          });
          return;
     }

     // get Transactions in the database
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
               res.status(200).send({
                    "message": "le locataire avec id " + id + " n'a pas encore de transactions"
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
     getUserTransactions
}