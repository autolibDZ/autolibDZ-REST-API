const Request = require('supertest');
request = Request('http://localhost:4000/api');

/*describe('add reservation', function() {
    describe('post/', function() {
        it('add one reservation', function(done) {
            request.post({
                    url: 'http://localhost:4000/api/reservation',
                    form: {
                      etat: "En cours",
                               idLocataire: 3,
                              idBorneDepart: 4,
                                idBorneDestination: 4,
                               codePin:"$2a$10$c0DBBbVy6fe8uyX/lbmlQ4Owq8mz8lZp0eRbtXXzlBlNVNyF0K8pWm",
                                tempsEstime: 3000,
                              distanceEstime: 60,
                            prixEstime: 1200
                    },
                },
                function(error, response, body) {
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

/*
describe('add reservation', function() {
    describe('post/', function() {
        it('add one reservation', function(done) {
            request.post({
                    url: 'http://localhost:4000/api/reservation',
                    form: {
                        etat: 'Reserved',
                        idVehicule: 2,
                        idLocataire: 3,
                        idBorneDepart: 2,
                        idBorneDestination: 3,
                    },
                },
                function(error, response, body) {
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

describe('POST : Verifier code pin', () => {
    //Code pin valide
    it('returns 200 OK when using a code pin', (done) => {
        request
            .post('/verifyPin')
            .send({
                idVehicule: 5,
                codePin: 9943
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.success === true).toBe(true);
                done();
            });
    });
    //Code pin invalide
    it('returns 400 bad request when using invalid code pin', (done) => {
        request
            .post('/verifyPin')
            .send({
                idVehicule: 5,
                codePin: 9944,
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.success === false).toBe(true);
                done();
            });
    });
*/

  /*  describe('Reservation route test', () => {
        describe('findReservationById', () => {

            it('returns 200 OK when using an exesting id 9', (done) => {
                request
                    .get('/9')
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                        if (err) done(err);

                        expect(function(res) {
                            res.body.etat= "Active",
                                res.body.idLocataire= 3,
                                res.body.idBorneDepart= 4,
                                res.body.idBorneDestination= 4,
                                res.body.codePin= "$2a$10$c0D3bVy6fe8uyX/lbmlQ4Owq8mz8lZp0eRbtXXzlBlNVNyF0K8pWm",
                                res.body.tempsEstime= 3000,
                                res.body.distanceEstime= 60,
                                res.body.prixEstime= 1200


                        })

                        done();
                    });

            });
        });
    });

/*

            it('returns 500  server error when using a wrong id like AA55', (done) => {
                request
                    .get('/AA55')
                    .expect(500)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                        if (err) done(err);

                        expect(res.body.error)

                        done();
                    });

            });
        });


    });




    describe('Get list of all reservations', () => {

        it('returns 200 OK when getting all reservations', (done) => {
            request
                .get('/')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

            .end((err, res) => {

                if (err) done(err);

                expect(res.body);
                expect(res.body.length).toEqual(22);
                done();
            });

        });

    });
*/
/* vvvvvvvvvvvv
    describe('Get list of all Reservations in a given user of id 3', () => {
        it('Should returns 200 OK when getting all reservations', (done) => {
            request
                .get('/reservation/locataires/3')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.length).not.toEqual(0);
                    done();
                });
        });

        it('Should returns 404 when using an non exesting idLocataire=0 ', (done) => {
            request
                .get('/reservation/locataires/-1')
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.error == 'No locataires with id: 0')
                    done();
                });
        });
    });

/*describe('Testing GET on /api/reservation endpoint', () => {
    it('should return the list of all Reservations stored in the database, at least one Reservation', (done) => {
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
});*/
/* vvvvvvvvvvvvvvvvvv
describe('findById', () => {


    it('returns 200 OK when using an exesting id 9', (done) => {
        request
            .get('/reservation/9')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(function (res) {
                    res.body.etat= "Active",
                        res.body.idLocataire= 3,
                        res.body.idVehicule= 1837919,
                        res.body.idBorneDepart= 4,
                        res.body.idBorneDestination= 4,
                        res.body.codePin= "$2a$10$c0D3bVy6fe8uyX/lbmlQ4Owq8mz8lZp0eRbtXXzlBlNVNyF0K8pWm",
                        res.body.tempsEstime= 3000,
                        res.body.distanceEstime= 60,
                        res.body.prixEstime= 1200

                })

                done();
            });

    });




    it('returns 500  server error when using a wrong id like AA55', (done) => {
        request
            .get('/reservation/AA55')
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error)

                done();
            });

    });
});*/
/*
vvvvvvvvvvvvv
describe('createrReservation api', () => {
    it('returns 200 OK when reservation doesn"t exist in db', (done) => {
        request
            .post('/reservation/')
            .send({

                etat: "En cours",
                idLocataire: 3,
                idVehicule: 1837919,
                idBorneDepart: 4,
                idBorneDestination: 4,
                codePin:"$2a$10$c0DBBbVy6fe8uyX/lbmlQ4Owq8mz8lZp0eRbtXXzlBlNVNyF0K8pWm",
                tempsEstime: 3000,
                distanceEstime: 60,
                prixEstime: 1200

            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error);

                done();
            });
    });



    it('returns 400 server error when sending an empty parameter', (done) => {
        request

            .post('/reservation')
            .send({

                etat: "Active",
                idLocataire: 3,
                idVehicule:  1837919,

                idBorneDestination: 4,
                codePin:"$2a$10$c0DBBbVy6fe8uyX/lbmlQ4Owq8mz8lZp0eRbtXXzlBlNVNyF0K8pWm",
                tempsEstime: 3000,
                distanceEstime: 60,
                prixEstime: 1200
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
/*
vvvvvvvvvvvvvvvv

describe('Get list of all reservation', () => {

    it('returns 200 OK when getting all trajet', (done) => {
        request
            .get('/reservation')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')

            .end((err, res) => {

                if (err) done(err);

                expect(res.body);
                expect(res.body.length).toEqual(45);
                done();
            });

    });

});
*/

/*describe('Testing Update borne', () => {
   /* it('return 200 OK and the actual updated borne with id= 54', (done) => {
        request
            .put('/reservation/54')
            .send({
                etat: "En cours",
                idVehicule: 456749,
                idLocataire: 3,
                idBorneDepart: 4,
                idBorneDestination: 9,
                codePin: "$2a$10$zywJaMb4jbEuPVCvQwQ41OpvKXtKj0lStSdvu.ZkhKez7zVYORAxu",
                tempsEstime:10,
                distanceEstime: 10,
                prixEstime: 10

            })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzMzY1MzAzfQ.YXhFgN8j07HlhX8XAg8eAkeXAJqiXmaubgfUtGRHMNA')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {
                    let updatedReserevation = res.body;
                    expect(updatedReserevation.message).toEqual('Reservation was updated successfully.');

                    done();
                }
            });
    });
   it("Return Error if id reservation not found", (done) => {
        request
            .put('/reservation/667')
            .send({ etat: 0 })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzMzY1MzAzfQ.YXhFgN8j07HlhX8XAg8eAkeXAJqiXmaubgfUtGRHMNA')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {
                    expect(res.body.error).toEqual('not_found')
                    expect(res.body.message).toEqual('Cannot update Reservation with id=667. Maybe Reservation was not found or req.body is empty!');
                    done();
                }
            });
    });

    it('returns 500  server error when using a wrong id like a', (done) => {
        request
            .put('/reservation/a')
            .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzMzY1MzAzfQ.YXhFgN8j07HlhX8XAg8eAkeXAJqiXmaubgfUtGRHMNA')
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.error)
                done();
            });
    });
});*/