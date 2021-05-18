
const Request = require('supertest');
request = Request('http://localhost:4000/api/reservation');

describe('Reservation route test', () => {
    describe('getReservation 1st scenario', () => {
        it('returns 200 OK when using an exesting id 9', (done) => {
            request
                .get('/9')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(function (res) {
                        res.body.etat = 'Active';
                        res.body.idVehicule = 2;
                        res.body.idLocataire = 3;
                        res.body.idBorneDepart = 2;
                        res.body.idBorneDestination = 3;
                    });

                    done();
                });
        });

        it('returns 404 Not found when using an non exesting id ', (done) => {
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
});