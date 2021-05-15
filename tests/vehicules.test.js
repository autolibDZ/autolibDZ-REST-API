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
