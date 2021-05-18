const Request = require('supertest');
request = Request('http://localhost:4000/api');

describe('Testing GET on /api/vehicules endpoint', () => {
	it('should return the list of all vehicules stored in the database, at least one vehicule', (done) => {
		request
			.get('/vehicules')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.length).not.toEqual(0);
					done();
				}
			});
	});
});

describe('Testing GET on /api/vehicules/:id endpoint', () => {
	it("should return details of vehicule's numChassis is 123456", (done) => {
		request
			.get('/vehicules/123456')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.numChassis).toEqual(123456);
					done();
				}
			});
	});
});

describe('createVehicule api', () => {
	it('returns 200 OK when sending vehicule params that doesn"t exist in db', (done) => {
		request
			.post('/vehicules/')
			.send({
				  numChassis:32,
				  numImmatriculation:125479684,
				  modele: 'Ibiza',
				  marque: 'Seat',
				  couleur: 'Rouge', 
				  etat: 'en cirulation', 
				  tempsDeRefroidissement: 20, 
				  pressionHuileMoteur: 20, 
				  chargeBatterie: 20, 
				  anomalieCircuit: 'Rien', 
				  pressionPneus: 20, 
				  niveauMinimumHuile:20, 
				  regulateurVitesse: 20, 
				  limiteurVitesse: 20,
				  idBorne: 1
			})
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				expect(res.body.error);

				done();
			});
	});
	it('returns 400 When vehicule exists', (done) => {
		request
			.post('/vehicules/')
			.send({
				  numChassis:213456,
				  numImmatriculation:123,
				  modele: '404',
				  marque: 'Peugeot',
				  couleur: 'noir', 
				  etat: 'hors service', 
				  tempsDeRefroidissement: 20, 
				  pressionHuileMoteur: 20, 
				  chargeBatterie: 20, 
				  anomalieCircuit: 'Rien', 
				  pressionPneus: 20, 
				  niveauMinimumHuile:20, 
				  regulateurVitesse: 20, 
				  limiteurVitesse: 20,
				  idAgentmaintenance: 1, 
			})
			.expect(400)
			.expect('Content-Type','application/json; charset=utf-8')
			.end((err, res) => {
				console.log(res.body.err);
				if (err) done(err);
				expect(res.body);
				done();
			});
	});

	it('returns 500 server error when sending an empty parameter', (done) => {
		request
		
			.post('/vehicules')
			.send({
				//numChassis:'',
				numImmatriculation:125479684,
				modele: 'Ibiza',
				marque: 'Seat',
				couleur: 'Rouge', 
				etat: 'en cirulation', 
				tempsDeRefroidissement: 20, 
				pressionHuileMoteur: 20, 
				chargeBatterie: 20, 
				anomalieCircuit: 'Rien', 
				pressionPneus: 20, 
				niveauMinimumHuile:20, 
				regulateurVitesse: 20, 
				limiteurVitesse: 20,
				idBorne: 1
			})
			.set('Accept', 'application/json')
			.expect(400)
			.end((err, res) => {
				if (err) done(err);

				expect(res.body.error);

				done();
			});
	}); 
});


describe('Testing GET on /api/agents/vehicules/:id endpoint', () => {
	it('should return the list of all vehicules of a given agents, at least one vehicule for agent with id 1', (done) => {
		request
			.get('/vehicules/agents/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					// For each vehicule, the idAgentMaintenance attribute should be set to 1
					res.body.forEach((vehicule) => {
						expect(vehicule.idAgentMaintenance).toEqual(1);
					});

					done();
				}
			});
	});

	it("should return error where the agents' id doesn't exist", (done) => {
		request
			.get('/vehicules/agents/-1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.error).toBe('not_found');
					done();
				}
			});
	});
});

describe('Testing PUT on /api/vehicules/etat/:numChassis endpoint', () => {
	it('should return updated rows number and the actual updated vehicule which has numChassis set to 123456', (done) => {
		request
			.put('/vehicules/etat/123456')
			.send({ etat: 'en service' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					let { UpdatedRows, UpdatedVehicule } = res.body;
					UpdatedVehicule = UpdatedVehicule[0];
					expect(UpdatedRows).toEqual(1);
					expect(UpdatedVehicule.numChassis).toEqual(123456);
					done();
				}
			});
	});

	it("should return error status 400, if etat attribut is set to a value different from 'en service' or 'hors service", (done) => {
		request
			.put('/vehicules/etat/123456')
			.send({ etat: 'en hors service' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.message).toBe(
						"Attribute 'etat' must be either 'en service' or 'hors service'"
					);
					done();
				}
			});
	});
});

describe('Testing GET on /api/vehicules/en-service', () => {
	it("should return all 'en service' vehicules", (done) => {
		request
			.get('/vehicules/en-service')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					res.body.forEach((vehicule) => {
						expect(vehicule.etat).toBe('en service');
					});
					done();
				}
			});
	});
});

describe('Testing GET on /api/vehicules/hors-service', () => {
	it("should return all 'hors service' vehicules", (done) => {
		request
			.get('/vehicules/hors-service')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					res.body.forEach((vehicule) => {
						expect(vehicule.etat).toBe('hors service');
					});
					done();
				}
			});
	}); 
});
