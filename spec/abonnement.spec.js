/*const Request = require('supertest');
request = Request('http://localhost:4000/api/abonnement');

describe('Abonnement route test', () => {
	describe('GET getBalance : returns the user balance', () => {
		it('returns 200 OK when using an exesting id 1', (done) => {
			request
				.get('/1')
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.balance != null).toBe(true);

					done();
				});
		});

		it('returns 404 Not found when using an non exesting id 13', (done) => {
			request
				.get('/13')
				.expect(404)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error == 'the id 13 does not exist').toBe(true);

					done();
				});
		});

		it('returns 500  server error when using a wrong id like 1m', (done) => {
			request
				.get('/1m')
				.expect(500)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error != null).toBe(true);

					done();
				});
		});
	});

	describe('POST doPayment : update the user balance', () => {
		it('returns 200 OK when using an exesting id 1', (done) => {
			request
				.post('/1')
				.send({
					prix: 0.5, // 0.5 so that the balance won't reach 0 and the test fails
				})
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.message == 'payment done').toBe(true);

					done();
				});
		});

		it('returns 400 bad request when sending a negative number', (done) => {
			request
				.post('/1')
				.send({
					prix: -0.5,
				})
				.expect(400)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(
						res.body.message == "body 'prix' element must be a positive number"
					).toBe(true);

					done();
				});
		});

		it('returns 400 bad request when sending a string value for prix', (done) => {
			request
				.post('/1')
				.send({
					prix: '-0.5llk',
				})
				.expect(400)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(
						res.body.message == "body 'prix' element must be a number"
					).toBe(true);

					done();
				});
		});

		it('returns 500 server error when the prix is greater than the user balance', (done) => {
			request
				.post('/1')
				.send({
					prix: 100000,
				})
				.expect(500)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(
						res.body.error == 'user does not have enough funds to pay'
					).toBe(true);

					done();
				});
		});

		it('returns 404 Not found when using an non exesting id 13', (done) => {
			request
				.post('/13')
				.send({
					prix: 0.5, // 0.5 so that the balance won't reach 0 and the test fails
				})
				.expect(404)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error == 'the id 13 does not exist').toBe(true);

					done();
				});
		});

		it('returns 500  server error when using a wrong id like 1m', (done) => {
			request
				.post('/1m')
				.send({
					prix: 0.5, // 0.5 so that the balance won't reach 0 and the test fails
				})
				.expect(500)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error != null).toBe(true);

					done();
				});
		});
	});
});
*/