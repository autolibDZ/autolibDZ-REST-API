import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models/index';
import abonnementRouter from './routes/abonnement.route';
import locataireRouter from './routes/locataire.route';
import vehiculesRouter from './routes/vehicule.route';

// // For documentation
// import SwaggerUI from 'swagger-ui-express';

// const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();

// Optiens for Swagger
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Projet 2CSSIL - AutoLib',
			version: '1.0.0',
			description: 'Une application de location de véhicules à libre service',
		},
		servers: [
			{
				url: 'http://localhost:4000',
			},
		],
	},
	apis: ['./routes/*.js'],
};

// const specs = swaggerJsDoc(options);

const app = express();

// app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(specs));

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors());

// Parse data in JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync();

app.use('/api/abonnement', abonnementRouter);
app.use('/api/locataire', locataireRouter);

// Vehicule Route
app.use('/api/vehicules', vehiculesRouter);

//Home
app.use((req, res) => {
	res.send('<h1>Welcome to AutolibDZ REST API</h1>');
});

module.exports = app;
