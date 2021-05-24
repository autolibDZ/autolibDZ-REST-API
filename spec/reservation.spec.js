/*const Request = require('supertest');
request = Request('http://localhost:4000/api/reservation');

describe('add reservation', function () {
	describe('post/', function () {
		it('add one reservation', function (done) {
			request.post(
				{
					url: 'http://localhost:4000/api/reservation',
					form: {
						etat: 'Reserved',
						idVehicule: 2,
						idLocataire: 3,
						idBorneDepart: 2,
						idBorneDestination: 3,
					},
				},
				function (error, response, body) {
					console.log('error:', error); // Print the error if one occurred
					console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
					console.log('body:', body);
					expect(response.statusCode).toBe(201);
					done();
				}
			);
		});
	});
});*/
/*
describe('POST : Verifier code pin', () => {
    //Code pin valide
    it('returns 200 OK when using a code pin', (done) => {
        request
            .post('/verifyPin')
            .send({
                idVehicule: 5,
                codePin: 4130,
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.success === 'true').toBe(true);
                done();
            });
    });
    //Code pin invalide
    it('returns 400 bad request when using invalid code pin', (done) => {
        request
            .post('/verifyPin')
            .send({
                idVehicule: 5,
                codePin: 4131,
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.success === 'false').toBe(true);
                done();
            });
    });*/