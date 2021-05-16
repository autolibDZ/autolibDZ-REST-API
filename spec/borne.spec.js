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
                        res.body.nomBorne = "Grande Poste";
                        res.body.wilaya = "Alger";
                        res.body.commune = "Grande Poste";
                        res.body.latitude = 36.7731;
                        res.body.longitude = 3.0595;
                        res.body.nbVehicule = 20;
                        res.body.nbPlaces = 9
                    })

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

                    expect(res.body.error == 'Borne with id 4 does not exist')

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

                    expect(res.body.error)

                    done();
                });

        });
    });

    describe('getFilteredBornes 2nd scenario', () => {

        it('returns 200 OK when sending an empty filter', (done) => {
            request
                .post('/filter')
                .send({ "filter": '' })
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
                    "nomBorne": "Bab El Oued",
                    "wilaya": "Alger",
                    "commune": "Bab El Oued",
                    "latitude": 59.99,
                    "longitude": 60,
                    "nbVehicule": 30,
                    "nbPlaces": 5
                })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error)

                    done();
                });

        });


        it('returns 404 When borne exists', (done) => {
            request
                .post('/')
                .send({
                    "nomBorne": "Grande Poste",
                    "wilaya": "Alger",
                    "commune": "Grande Poste",
                    "latitude": 36.7731,
                    "longitude": 3.0595,
                    "nbVehicule": 20,
                    "nbPlaces": 9
                })
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body)
                    done();
                });
        });

        it('returns 500  server error when sending an empty parameter', (done) => {
            request
                .post('/')
                .send({ nomBorne: "Grande Poste", commune: "Grande Poste", latitude: 36.7731, longitude: 3.0595, nbVehicule: 20, nbPlaces: 9 })
                .set('Accept', 'application/json')
                .expect(500)
                .expect('Content-Type', /json/)

                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error)

                    done();
                });

        });

    });


    describe('Get list of all bornes in database 4th scenario', () => {

        it('returns 200 OK when getting all bornes', (done) => {
            request
                .post('/all')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error)

                    done();
                });

        });

    });

});

