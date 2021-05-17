import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import db from './models/index'
import abonnementRouter from './routes/abonnement.route'
import locataireRouter from './routes/locataire.route'
import vehiculeRouter from './routes/vehicule.route';
import borneRoute from './routes/borne.route'
import authRouter from './routes/auth.route';
import administrateurRouter from './routes/administrateur.route'
import operateurRouter from './routes/operateur.route'
import agentRouter from './routes/agent.route'
import dirigeantRouter from './routes/dirigeant.route'
import reservationRouter from './routes/reservation.route'
import trajetRouter from './routes/trajet.route'
dotenv.config();
const app = express();

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors());

// Parse data in JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync();


app.use('/api/vehicules',vehiculeRouter); 
app.use('/api/abonnement', abonnementRouter);
app.use('/api/locataire', locataireRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/trajet', trajetRouter);
app.use('/api/administrateur',administrateurRouter)
app.use('/api/agent',agentRouter)
app.use('/api/operateur',operateurRouter)
app.use('/api/dirigeant',dirigeantRouter)


//auth Router
app.use('/api/auth', authRouter);

// Borne Route
app.use('/api/bornes', borneRoute);

//Home
app.use((req, res) => {
    res.send('<h1>Welcome to AutolibDZ REST API</h1>');
});

module.exports = app;