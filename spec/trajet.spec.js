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
describe('findTrajetById', () => {

    it('returns 200 OK when using an exesting id 35', (done) => {
        request
            .get('/trajet/35')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(function (res) {
                    res.body.dateDebut= "2021-01-16T14:34:34.000Z";
                    res.body.tempsEstime = null;
                    res.body.kmParcourue = null;
                    res.body.prixAPayer = null;
                    res.body.idReservation=15

                })

                done();
            });

    });




    it('returns 500  server error when using a wrong id like AA55', (done) => {
        request
            .get('/trajet/AA55')
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error)

                done();
            });

    });
});
describe('creatertrajet api', () => {
    it('returns 200 OK when trajet doesn"t exist in db', (done) => {
        request
            .post('/trajet/')
            .send({

                idTrajet: 33,
                dateDebut: "2021-01-16T14:34:34.000Z",
                dateFin: "2021-02-16T14:34:34.000Z",
                tempsEstime: 20,
                kmParcourue: 2,
                prixAPayer: 120,
                idReservation: 15

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
            .post('/trajet')
            .send({
                idTrajet: 103,

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
                idTrajet: null,
                dateDebut: "2021-01-16T14:34:34.000Z",
                dateFin: "2021-02-16T14:34:34.000Z",
                tempsEstime: 130,
                kmParcourue: 12,
                prixAPayer: 120,
                idReservation: 15
            })
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error);

                done();
            });
    });
});
describe('Get list of all traejt', () => {

    it('returns 200 OK when getting all trajet', (done) => {
        request
            .get('/trajet')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')

            .end((err, res) => {

                if (err) done(err);

                expect(res.body);
                expect(res.body.length).toEqual(11);
                done();
            });

    });

});

