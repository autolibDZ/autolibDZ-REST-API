
const Request = require('supertest');


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
});


*/
const Request = require('supertest');
request = Request('http://localhost:4000/api');

describe('Testing GET on /api/reservation endpoint', () => {
    it('should return the list of all reservations stored in the database, at least one reservation', (done) => {
        request
            .get('/reservation')
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

