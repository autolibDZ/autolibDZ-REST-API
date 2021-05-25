const Request = require('supertest');
request = Request('http://localhost:4000/api');

describe('Testing POST on /api/plan-maintenance endpoint', () => {
	it('should create and add plans to a specific car', (done) => {
		request
			.post('/plan-maintenance')
			.send([
				{
					date: '2021/01/01',
					action: 'action 1',
				},
				{
					date: '2021/01/02',
					action: 'action 2',
				},
			])
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.addedRows).toEqual(2);
					done();
				}
			});
	});

	it('should return a 400 error if content is empty', (done) => {
		request
			.post('/plan-maintenance')
			.send([])
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.message).toBe('Content can not be empty!');
					done();
				}
			});
	});

	it('should return a 500 error if date or action are not specified', (done) => {
		request
			.post('/plan-maintenance')
			.send([
				{
					action: 'action 1',
				},
			])
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(500)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				}
				done();
			});
	});
});
