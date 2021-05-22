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

describe('Testing GET on /api/reservation/:id endpoint', () => {
    it("should return details of the reservation with id 9", (done) => {
        request
            .get('/reservation/9')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {
                    expect(res.body.idReservation).toEqual(9);
                    done();
                }
            });
    });
});

describe('createrReservation api', () => {
    it('returns 200 OK when reservation doesn"t exist in db', (done) => {
        request
            .post('/reservation/')
            .send({

                etat: "Active",
                idVehicule: 2,
                idLocataire: 3,
                idBorneDepart: 2,
                idBorneDestination: 100,

            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error);

                done();
            });
    });

    it('returns 400 When reservation exists', (done) => {
        request
            .post('/reservation/')
            .send({
                etat: "Active",
                idVehicule: 3,
                idLocataire: 4,
                idBorneDepart: 2,
                idBorneDestination: 100,
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

            .post('/reservation')
            .send({
                etat: "Active",
                idVehicule: 14,
                idLocataire:6,
                idBorneDepart: 2,
                idBorneDestination: 5,
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


describe('Testing GET on reservation by id locataire', () => {
    it('should return the list of all reservations of agent with id 3', (done) => {
        request
            .get('/reseravtion/locataire/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {

                    res.body.forEach((reseravtion) => {
                        expect(reseravtion.idLocataire).toEqual(1);
                    });

                    done();
                }
            });
    });

});

