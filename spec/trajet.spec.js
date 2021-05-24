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

    it('returns 200 OK when using an exesting id 9', (done) => {
        request
            .get('/trajet/9')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(function (res) {
                    res.body.dateDebut= "2021-09-16T14:36:13.000Z";
                    res.body.dateFin = "2021-10-16T14:36:19.000Z";
                    res.body.tempsEstime = null;
                    res.body.kmParcourue = null;
                    res.body.prixAPayer = null;

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

                idTrajet: 39,
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
                expect(res.body.length).toEqual(41);
                done();
            });

    });

});

