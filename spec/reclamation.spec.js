const Request = require('supertest');
request = Request('http://localhost:4000/api/reclamation');

/* describe('Testing GET on /api/reclamaion endpoint', () => {
	it('should return the list of all clamis stored in the database, at least one claim', (done) => {
		request
			.get('/')
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

describe('Testing GET on /api/reclamation/:id endpoint', () => {
	it("should return details of reclamation 's Id is 3", (done) => {
		request
			.get('/3')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.idReclamation).toEqual(3);
					done();
				}
			});
	});
});

describe('createVehicule api', () => {
	it('returns 200 OK when sending rclamation params that doesn"t exist in db', (done) => {
		request
			.post('/')
			.send({
                 description:'Ceci est un test de la fonction réclamation', 
				 emailLocataire:"hz_boutata@esi.dz"
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
			.post('/')
			.send({
                description:'Ceci est une 2éme autre réclamation ', 
                emailLocataire:"hm_boutata@esi.dz"
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
		
			.post('/')
			.send({
				// description:'Ceci est une 2éme autre réclamation ', 
                emailLocataire:"hm_chbieb@esi.dz"	
			})
			.set('Accept', 'application/json')
			.expect(400)
			.end((err, res) => {
				if (err) done(err);

				expect(res.body.error);

				done();
			});
	}); 
});*/

describe('Testing GET on /api/reclamation endpoint', () => {
	it('should return the list of all reclamations stored in the database, at least one reclamation', (done) => {
		request
			.get('/')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
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

	 it('returns 403 when using a wrong token to get all reclamations', (done) => {
            request
                .get('/')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'yJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toEqual("Access Forbidden,invalide token");
                    done();
                });
        });

});
describe('createReclamation api', () => {
	it('returns 200 OK when sending reclamation params that doesn"t exist in db', (done) => {
		request
			.post('/')
			.send({
					description:'Ceci est un test de la fonction réclamation', 
					emailLocataire:"hz_boutata@esi.dz", 
					type:"bug"
			})
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				expect(res.body.error);

				done();
			});
	});
	
	it('returns 400 When reclamation exists', (done) => {
		request
			.post('/')
			.send({
				description:'Ceci est une 2éme autre réclamation ', 
                emailLocataire:"hm_boutata@esi.dz",
				type:"bug"
			})
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
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
		
			.post('/')
			.send({
				//description:'Ceci est une 2éme autre réclamation ', 
                emailLocataire:"hm_boutata@esi.dz"

			})
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.set('Accept', 'application/json')
			.expect(400)
			.end((err, res) => {
				if (err) done(err);

				expect(res.body.error);

				done();
			});
	}); 
	it('returns 403 when using a wrong token to get add a reclamation', (done) => {
		request
			.get('/')
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
			.expect(403)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end((err, res) => {
				if (err) done(err);
				expect(res.body.message).toEqual("Access Forbidden,invalide token");
				done();
			});
	});
});

describe('Testing GET on /api/reclamation/:id endpoint', () => {
	it("should return details of Recalamtion with id=8", (done) => {
		request
			.get('/8')
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.idReclamation).toEqual(8);
					done();
				}
			});
	});

       it('returns 404 Not found when using an non exesting id 278', (done) => {
            request
                .get('/278')
			    .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
                .expect(404)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toBe('No reclamation with such id: 278');
                    done();
                });
        });

        it('returns 500  server error when using a non integer ID like A521', (done) => {
            request
                .get('A521')
			    .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjUwNDMxNH0.2Z68JvipWECaPh0Rl7k9jNjQCCt-6t_wSODn5AWU6ng')
                .expect(500)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error)

                    done();
                });

        });


	it('returns 403 when using a wrong token to get a reclamation', (done) => {
		request
			.get('/3')
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
			.expect(403)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end((err, res) => {
				if (err) done(err);
				expect(res.body.message).toEqual("Access Forbidden,invalide token");
				done();
			});
	});

});
