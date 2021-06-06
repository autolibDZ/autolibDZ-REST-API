const Request = require('supertest');
request = Request('http://localhost:4000/api');

describe('Testing GET on /api/vehicules endpoint', () => {
	it('should return the list of all vehicules stored in the database, at least one vehicule', (done) => {
		request
			.get('/vehicules')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
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

	 it('returns 403 when using a wrong token to get all vehicules', (done) => {
            request
                .get('/vehicules')
                .set('Accept', 'application/json')
                //.set('Authorization', 'Bearer ' + 'yJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toEqual("Access Forbidden,invalide token");
                    done();
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
				  etat: 'circulation', 
				  tempsDeRefroidissement: 20, 
				  pressionHuileMoteur: 20, 
				  chargeBatterie: 20, 
				  anomalieCircuit: 'Rien', 
				  pressionPneus: 20, 
				  niveauMinimumHuile:20, 
				  regulateurVitesse: 20, 
				  limiteurVitesse: 20,
				  idBorne: 1, 
				  idAgentMaintenance:1, 
				  idCloudinary: "qbhuwok5ssj646qbuj38", 
				  secureUrl: "https://res.cloudinary.com/melb/image/upload/v1622583305/qbhuwok5ssj646qbuj38.png"
			})
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
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
				  idBorne:1, 
				  idAgentmaintenance: 1, 
				  idCloudinary: "xhellvdlmulzmhmkdbau", 
				  secureUrl: "https://res.cloudinary.com/melb/image/upload/v1621962019/xhellvdlmulzmhmkdbau.png"
			})
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.expect(400)
			.expect('Content-Type','application/json; charset=utf-8')
			.end((err, res) => {
				console.log(res.body.err);
				if (err) done(err);
				expect(res.body);
				done();
			});
	});

	it('returns 400 server error when sending an empty parameter', (done) => {
		request
		
			.post('/vehicules/')
			.send({
				//numChassis:'',
				numImmatriculation:125479684,
				modele: 'Ibiza',
				marque: 'Seat',
				couleur: 'Rouge', 
				etat: 'circulation', 
				tempsDeRefroidissement: 20, 
				pressionHuileMoteur: 20, 
				chargeBatterie: 20, 
				anomalieCircuit: 'Rien', 
				pressionPneus: 20, 
				niveauMinimumHuile:20, 
				regulateurVitesse: 20, 
				limiteurVitesse: 20,
				idBorne: 1,
				idAgentMaintenance:18, 
				idCloudinary: "qbhuwok5ssj646qbuj38", 
				secureUrl: "https://res.cloudinary.com/melb/image/upload/v1622583305/qbhuwok5ssj646qbuj38.png"

			})
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.set('Accept', 'application/json')
			.expect(400)
			.end((err, res) => {
				if (err) done(err);

				expect(res.body.error);

				done();
			});
	}); 
	it('returns 403 when using a wrong token to get add a vehicule', (done) => {
		request
			.get('/vehicules')
			.set('Accept', 'application/json')
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
			.expect(403)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end((err, res) => {
				if (err) done(err);
				expect(res.body.message).toEqual("Access Forbidden,invalide token");
				done();
			});
	});
});

describe('Testing GET on /api/vehicules/:id endpoint', () => {
	it("should return details of vehicule's numChassis is 123456", (done) => {
		request
			.get('/vehicules/123456')
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
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

       it('returns 404 Not found when using an non exesting id 20', (done) => {
            request
                .get('/vehicules/20')
			    //.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
                .expect(404)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toBe('No vehicule with such numero chassis: 20');
                    done();
                });
        });

        it('returns 500  server error when using a non integer ID like A521', (done) => {
            request
                .get('/vehicules/A521')
			   // .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
                .expect(500)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error)

                    done();
                });

        });


	it('returns 403 when using a wrong token to get add a vehicule', (done) => {
		request
			.get('/vehicules/32')
			.set('Accept', 'application/json')
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
			.expect(403)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end((err, res) => {
				if (err) done(err);
				expect(res.body.message).toEqual("Access Forbidden,invalide token");
				done();
			});
	});

});

 describe('Testing Update vehicule', () => {
	it('return 200 OK and the actual updated vehicule with numChassis=32', (done) => {
		request
			.put('/vehicules/187')
			.send({
				etat : "hors service"
			})
			.set('Accept', 'application/json')
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					let updatedBorne = res.body;
					expect(updatedBorne.message).toEqual('Vehicule was updated successfully.');
					expect(updatedBorne.data.numChassis).toEqual(187)
					expect(updatedBorne.data.etat).toEqual("hors service");
					done();
				}
			});
	});
  it('return 403 when using a wrong token', (done) => {
		request
			.put('/vehicules/32')
			.send({
				etat : "hors service"
			})
			//.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0')
			.expect('Content-Type', /json/)
			.expect(403)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				}
				expect(res.body.message).toEqual('Access Forbidden,invalide token')
				done();
			});
	});
	it("Return Error 404 if id vehicule not found", (done) => { 
		request
			.put('/vehicules/20')
			.send({ etat: "hors service" })
			.set('Accept', 'application/json')
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.expect('Content-Type', /json/)
			.expect(404)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.error).toEqual('not_found')
					expect(res.body.message).toEqual('Vehicule not found');
					done();
				}
			});
	});

	it('returns 500  server error when using a wrong id like A547', (done) => {
		request
			.put('/vehicules/A547')
			//.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.expect(500)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end((err, res) => {
				if (err) done(err);
				expect(res.body.error)
				done();
			});
	});
});



/*

describe('Testing GET on /api/agents/vehicules/:id endpoint', () => {
	it('should return the list of all vehicules of a given agents, at least one vehicule for agent with id 1', (done) => {
		request
			.get('/vehicules/agents/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					if (res.body.status === 404) {
						expect(res.body.error).toEqual('not_found');
					} else {
						expect(res.body.length).not.toBe(0);
						// For each vehicule, the idAgentMaintenance attribute should be set to 1
						res.body.forEach((vehicule) => {
							expect(vehicule.idAgentMaintenance).toEqual(1);
						});
					}

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

describe('Testing GET on /api/vehicules/agents/:id/en-service', () => {
	it("should return all 'en service' vehicules", (done) => {
		request
			.get('/vehicules/agents/1/en-service')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					if (res.body.status === 404) {
						expect(res.body.error).toBe("No vehicules are 'en service'");
					} else {
						res.body.forEach((vehicule) => {
							expect(vehicule.etat).toBe('en service');
						});
					}

					done();
				}
			});
	});
});

describe('Testing GET on /api/vehicules/agents/:id/hors-service', () => {
	it("should return all 'hors service' vehicules", (done) => {
		request
			.get('/vehicules/agents/1/hors-service')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					if (res.body.status === 404) {
						expect(res.body.error).toBe("No vehicules are 'hors service'");
					} else {
						res.body.forEach((vehicule) => {
							expect(vehicule.etat).toBe('hors service');
						});
					}

					done();
				}
			});
	}); 
<<<<<<< HEAD
});
=======
});*/  
>>>>>>> bb4ce5ccf214c7055bb9b3a1015e540e919dc159
