const Request = require('supertest');
request = Request('http://localhost:4000/api');

describe('Testing GET on /api/trajet endpoint', () => {
    it('should return the list of all trajets stored in the database, at least one trajet', (done) => {
        request
            .get('/trajet')
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

describe('Testing GET on /api/trajet/:id endpoint', () => {
    it("should return details of the trajet with id 9", (done) => {
        request
            .get('/trajet/9')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {
                    expect(res.body.idTrajet).toEqual(9);
                    done();
                }
            });
    });
});

describe('creatertrajet api', () => {
    it('returns 200 OK when trajet doesn"t exist in db', (done) => {
        request
            .post('/trajet/')
            .send({

                idTrajet: 100,
                dateDebut: "2021-01-16T14:34:34.000Z",
                dateFin: "2021-02-16T14:34:34.000Z",
                tempsEstime: 130,
                kmParcourue: 12,
                prixAPayer: 200,
                idReservation: 12

            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error);

                done();
            });
    });

    it('returns 400 When trajet exists', (done) => {
        request
            .post('/trajet/')
            .send({
                idTrajet: 102,
                dateDebut: "2021-01-16T15:34:34.000Z",
                dateFin: "2021-02-16T16:34:34.000Z",
                tempsEstime: 3600,
                kmParcourue: 120,
                prixAPayer: 500,
                idReservation: 17
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

            .post('/trajet')
            .send({
                idTrajet: 103,
                dateDebut: "2021-01-16T14:34:34.000Z",
                dateFin: "2021-02-16T14:34:34.000Z",
                tempsEstime: 130,
                kmParcourue: 12,
                prixAPayer: 200,
                idReservation: 15
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


describe('Testing GET on trajet by id locataire', () => {
    it('should return the list of all trajets of agent with id 3', (done) => {
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

