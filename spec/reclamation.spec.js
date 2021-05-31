const Request = require('supertest');
request = Request('http://localhost:4000/api/reclamation');

describe('Testing GET on /api/reclamaion endpoint', () => {
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
});

