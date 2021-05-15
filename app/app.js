import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models/index';
import administrateurRouter from './routes/administrateur.route'
import operateurRouter from './routes/operateur.route'
import agentRouter from './routes/agent.route'
import dirigeantRouter from './routes/dirigeant.route'

dotenv.config();
const app = express();

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors());

// Parse data in JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync();

app.use('/api/administrateur',administrateurRouter)
app.use('/api/agent',agentRouter)
app.use('/api/operateur',operateurRouter)
app.use('/api/dirigeant',dirigeantRouter)


//Home
app.use((req, res) => {
    res.send('<h1>Welcome to AutolibDZ REST API</h1>');

});

module.exports = app;
