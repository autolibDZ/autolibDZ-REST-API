const Request = require('supertest');
request = Request('http://localhost:4000/api/bornes');

describe('Borne route test', () => {
	describe('getBorne 1st scenario', () => {
		it('returns 200 OK when using an exesting id 1', (done) => {
			request
				.get('/1')
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(function (res) {
						res.body.nomBorne = 'Grande Poste';
						res.body.wilaya = 'Alger';
						res.body.commune = 'Grande Poste';
						res.body.latitude = 36.7731;
						res.body.longitude = 3.0595;
						res.body.nbVehicule = 20;
						res.body.nbPlaces = 9;
					});

					done();
				});
		});

		it('returns 404 Not found when using an non exesting id 4', (done) => {
			request
				.get('/4')
				.expect(404)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error == 'Borne with id 4 does not exist');

					done();
				});
		});

		it('returns 500  server error when using a wrong id like AA55', (done) => {
			request
				.get('/AA55')
				.expect(500)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error);

					done();
				});
		});
	});

	describe('getFilteredBornes 2nd scenario', () => {
		it('returns 200 OK when sending an empty filter', (done) => {
			request
				.post('/filter')
				.send({ filter: '' })
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.end((err, res) => {
					if (err) done(err);
					return done();
				});
		});
	});

	describe('createBorne 3rd scenario', () => {
		it('returns 200 OK when sending borne params that doesn"t exist in db', (done) => {
			request
				.post('/')
				.send({
					nomBorne: 'Bab El Oued',
					wilaya: 'Alger',
					commune: 'Bab El Oued',
					latitude: 59.99,
					longitude: 60,
					nbVehicule: 30,
					nbPlaces: 5,
				})
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error);

					done();
				});
		});

		it('returns 400 When borne exists', (done) => {
			request
				.post('/')
				.send({
					nomBorne: 'Grande Poste',
					wilaya: 'Alger',
					commune: 'Grande Poste',
					latitude: 36.7731,
					longitude: 3.0595,
					nbVehicule: 20,
					nbPlaces: 9,
				})
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) done(err);
					expect(res.body);
					done();
				});
		});

		it('returns 500  server error when sending an empty parameter', (done) => {
			request
				.post('/')
				.send({
					nomBorne: 'Grande Poste',
					commune: 'Grande Poste',
					latitude: 36.7731,
					longitude: 3.0595,
					nbVehicule: 20,
					nbPlaces: 9,
				})
				.set('Accept', 'application/json')
				.expect(500)
				.expect('Content-Type', /json/)

				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error);

					done();
				});
		});
	});

	describe('Get list of all bornes in database 4th scenario', () => {
		it('returns 200 OK when getting all bornes', (done) => {
			request
				.get('/all')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) done(err);

					expect(res.body.error);

					done();
				});
		});
	});


	describe('POST filter bornes', () => {
        it('returns 200 OK when sending correct filter like wilaya = Alger', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
    
                    expect(res.body != null).toBe(true)
                    expect(res.body.length > 0).toBe(true)
                    const ele = res.body[0]
    
                    expect(ele.wilaya).toBe("Alger")
    
                    done();
                });
        });

        it('returns 200 OK when sending correct filter like nbVehicules = 20 and nbVehiculesOp is >', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehicules : 20,
                    nbVehiculesOp : ">"
                })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
    
                    expect(res.body != null).toBe(true)
                    expect(res.body.length > 0).toBe(true)
                    const ele = res.body[0]
    
                    expect(ele.nbVehicules > 20).toBe(true)
    
                    done();
                });
        });

        it('returns 400 bad request when using a wrong nbVehiculesOp like  >=', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehicules : 20,
                    nbVehiculesOp : ">="
                })
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
    
                    expect(res.body.message).toBe("nbVehiculesOp must be > , < or = ")
                    
                    done();
                });
        });

        it('returns 404 not found when the filter does not match any record in the db', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehicules : 500,
                    nbVehiculesOp : ">"
                })
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
    
                    expect(res.body.error).toBe("there is no Born that matches your filter")
                    
                    done();
                });
        });

        it('returns 500 internal server error when sending a string instead of a number for nbVehicules', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehicules : "m",
                    nbVehiculesOp : ">"
                })
                .set('Accept', 'application/json')
                .expect(500)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
    
                    expect(res.body.error).toBe("invalid input syntax for type integer: \"m\"")
                    
                    done();
                });
        });
    });

});
