import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models/index';
import abonnementRouter from './routes/abonnement.route';
import locataireRouter from './routes/locataire.route';
import vehiculesRouter from './routes/vehicule.route';
import transactionRouter from './routes/transaction.route';

dotenv.config();
const app = express();

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors());

// Parse data in JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync();

app.use('/api/abonnement', abonnementRouter);
app.use('/api/locataire', locataireRouter);
app.use('/api/transaction', transactionRouter);
// Vehicule Route
app.use('/api/vehicules', vehiculesRouter);

// Vehicule Route Of A Given Agent
app.use('/api/vehicules/agents/:id', vehiculesRouter);

//Home
app.use((req, res) => {
    res.send('<h1>Welcome to AutolibDZ REST API</h1>');

});

module.exports = app;
