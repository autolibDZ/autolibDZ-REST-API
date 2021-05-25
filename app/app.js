import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models/index';
import abonnementRouter from './routes/abonnement.route';
import locataireRouter from './routes/locataire.route';
import vehiculeRouter from './routes/vehicule.route';
import borneRoute from './routes/borne.route';
import authRouter from './routes/auth.route';
import administrateurRouter from './routes/administrateur.route';
import operateurRouter from './routes/operateur.route';
import agentRouter from './routes/agent.route';
import dirigeantRouter from './routes/dirigeant.route';
import reservationRouter from './routes/reservation.route';
import trajetRouter from './routes/trajet.route';
import stripePaymentRouter from './routes/payment.route';
import planMaintenaceRouter from './routes/planMaintenance.route';

dotenv.config();

const app = express();

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors());

// Parse data in JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync();

//vehicule router
app.use('/api/vehicules', vehiculeRouter);

//abonnement route
app.use('/api/abonnement', abonnementRouter);

//locataire route
app.use('/api/locataire', locataireRouter);

//reservation route
app.use('/api/reservation', reservationRouter);

app.use('/api/administrateur', administrateurRouter);
app.use('/api/agent', agentRouter);
app.use('/api/operateur', operateurRouter);
app.use('/api/dirigeant', dirigeantRouter);

// Ajouter un plan de maintenace
app.use('/api/plan-maintenance', planMaintenaceRouter);

//auth Router
app.use('/api/auth', authRouter);

// Borne Router
app.use('/api/bornes', borneRoute);

// Payment Router
app.use('/api/payment', stripePaymentRouter);

// Trajet Route
app.use('/api/trajet', trajetRouter);

//Home
app.use((req, res) => {
	res.send('<h1>Welcome to AutolibDZ REST API</h1>');
});

module.exports = app;
