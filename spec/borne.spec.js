const Request = require('supertest');
request = Request('http://localhost:4000/api/bornes');


describe('Borne route test', () => {
    describe('getBorne 1st scenario', () => {

        it('returns 200 OK when using an exesting id 1', (done) => {
            request
                .get('/1')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
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
                        res.body.nbVehicules = 20;
                        res.body.nbPlaces = 6
                    })

                    done();
                });

        });


        it('returns 404 Not found when using an non exesting id 200', (done) => {
            request
                .get('/200')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(404)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.message).toBe('Borne with id 200 does not exist');

                    done();
                });
        });
        it('returns 500  server error when using a wrong id like AA55', (done) => {
            request
                .get('/AA55')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(500)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error)

                    done();
                });

        });
    })

    describe('createBorne 3rd scenario', () => {

        it("returns 200 OK when sending borne params that doesn't exist in db", (done) => {
            request
                .post('/')
                .send({
                    nomBorne: "Bab El Oued-2",
                    wilaya: "Alger",
                    commune: "Bab El Oued",
                    latitude: 36.7927,
                    longitude: 3.0513,
                    nbVehicules: 30,
                    nbPlaces: 5
                })
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(function (res) {
                        res.body.nomBorne = "Bab El Oued-2";
                        res.body.wilaya = "Alger";
                        res.body.commune = "Bab El Oued";
                        res.body.latitude = 36.7927;
                        res.body.longitude = 3.0513;
                        res.body.nbVehicules = 30;
                        res.body.nbPlaces = 5
                    })

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
                    nbVehicules: 20,
                    nbPlaces: 6
                })
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(400)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toBe("Borne already exists!");
                    done();
                });
        });

        it('returns 400  server error when sending an empty parameter', (done) => {
            request
                .post('/')
                .send({ nomBorne: "Grande Poste", commune: "Grande Poste", latitude: 36.7731, longitude: 3.0595, nbVehicules: 20, nbPlaces: 9 })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(400)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.message).toBe("parameters can't be empty!");

                    done();
                });

        });


    });


    describe('Get list of all bornes in database 4th scenario', () => {

        it('returns 200 OK when getting all bornes', (done) => {
            request
                .get('/all')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);

                    expect(res.body);
                    expect(res.body.length).toEqual(15);
                    done();
                });

        });
        it('returns 403 when using a wrong token to get all bornes', (done) => {
            request
                .get('/all')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'yJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);

                    expect(res.body.message).toEqual("Access Forbidden,invalide token");

                    done();
                });

        });

    });
    describe('Get list of all wilaya in database 5th scenario', () => {

        it('returns 200 OK when getting all wilaya', (done) => {
            request
                .get('/wilaya')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.length).toEqual(5);
                    done();
                });

        });
        it('returns 403 when using a wrong token to get all wilaya', (done) => {
            request
                .get('/wilaya')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'JpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.message).toEqual('Access Forbidden,invalide token');
                    done();
                });

        });

    });

    describe('Get list of all communes in database 6th scenario', () => {

        it('returns 200 OK when getting all communes', (done) => {
            request
                .get('/wilaya/all/commune')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.length).toEqual(14);
                    done();
                });

        });
        it('returns 403  when  using a wrong token to get all communes', (done) => {
            request
                .get('/wilaya/all/commune')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'JpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.message).toEqual('Access Forbidden,invalide token');
                    done();
                });

        });
        it('returns 200 OK when getting all communes of wilaya : Boumerdes', (done) => {
            request
                .get('/wilaya/Boumerdes/commune')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.length).toEqual(2);
                    done();
                });

        });
        it('returns 404 not found when getting all communes of wilaya that does not exist', (done) => {
            request
                .get('/wilaya/Setif/commune')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(404)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);

                    expect(res.body.message).toBe("No Commune found for wilaya :Setif");

                    done();
                });

        });

    });

    describe('Get list of all vehicules in a given borne of id 1', () => {
        it('Should returns 200 OK when getting all vehicles in the borne', (done) => {
            request
                .get('/1/vehicules')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.length).not.toEqual(0);
                    done();
                });
        });
        it('Should returns 403  when using a wrong token to  get all vehicles in the borne', (done) => {
            request
                .get('/1/vehicules')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'JpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toEqual('Access Forbidden,invalide token');
                    done();
                });
        });

        it('Should returns 404 when using an non exesting id borne=3 ', (done) => {
            request
                .get('/3/vehicules')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.error == 'No vehicles in the borne with id: 3')
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
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
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
        it('returns 403 when a wrong token to send correct filter like wilaya = Alger', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'JpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.message).toEqual('Access Forbidden,invalide token')


                    done();
                });
        });

        it('returns 200 OK when sending correct filter like nbVehicules entre 10 et 50', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehiculesMax: 50,
                    nbVehiculesMin: 10
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body != null).toBe(true)
                    expect(res.body.length > 0).toBe(true)
                    const ele = res.body[0]

                    expect(ele.nbVehicules >= 10 && ele.nbVehicules <= 50).toBe(true)

                    done();
                });
        });

        it('returns 400 bad request when using a wrong nbPlacesOp like  >=', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbPlacesOp: ">="
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(400)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.message).toBe("nbPlacesOp must be min or max")

                    done();
                });
        });

        it('returns 404 not found when the filter does not match any record in the db', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehiculesMin: 500,
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error).toBe("there is no Borne that matches your filter")

                    done();
                });
        });

        it('returns 500 internal server error when sending a string instead of a number for nbVehicules', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehiculesMax: "m",
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(500)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.error).toBe("invalid input syntax for type integer: \"m\"")

                    done();
                });
        });
    });



    /**
     * Test "update Borne" method 
 */
    describe('Testing Update borne', () => {
        it('return 200 OK and the actual updated borne with id=1', (done) => {
            request
                .put('/1')
                .send({
                    nbVehicules: 19
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done.fail(err);
                    } else {
                        let updatedBorne = res.body;
                        expect(updatedBorne.message).toEqual('Borne was updated successfully.');
                        expect(updatedBorne.data.idBorne).toEqual(1)
                        expect(updatedBorne.data.nbVehicules).toEqual(19);
                        done();
                    }
                });
        });
        it('return 403 when using a wrong token', (done) => {
            request
                .put('/1')
                .send({
                    nbVehicules: 19
                })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'JpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err, res) => {
                    if (err) {
                        done.fail(err);
                    }
                    expect(res.body.message).toEqual('Access Forbidden,invalide token')
                    done();

                });
        });
        it("Return Error if id borne not found", (done) => { 
            request
                .put('/400')
                .send({ etat: 0 })
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        done.fail(err);
                    } else {
                        expect(res.body.error).toEqual('not_found')
                        expect(res.body.message).toEqual('Borne not found');
                        done();
                    }
                });
        });

        it('returns 500  server error when using a wrong id like a', (done) => {
            request
                .put('/a')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(500)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.error)
                    done();
                });
        });
    });



    describe('DELETE bornes', () => {
        it('returns 201 when borne with id is deleted succefully ', (done) => {
            request
                .delete('/2')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(201)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.message).toBe("Borne with id : 2 was deleted succefully!");
                    done();
                });
        });
        it('returns 403 when using a wrong id ', (done) => {
            request
                .delete('/2')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'JpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(403)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.message).toBe("Access Forbidden,invalide token");
                    done();
                });
        });
        it('returns 404 when borne with id does not exist ', (done) => {
            request
                .delete('/400')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjU2MzYxMX0.2AsvKHNKDhgQT7QHO0mc-axauYJ73QVD-qN3F9fS5PE')
                .expect(404)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toBe("Borne with id : 400 does not exist!");
                    done();
                });
        });

    });
});
