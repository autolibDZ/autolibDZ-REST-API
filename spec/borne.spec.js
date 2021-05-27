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
                        res.body.nbVehicules = 20;
                        res.body.nbPlaces = 9
                    })

                    done();
                });

        });


        it('returns 404 Not found when using an non exesting id 200', (done) => {
            request
                .get('/200')
                .expect(404)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.body.message).toBe('Borne with id 200 does not exist');

                    done();
                });
        })
    })

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

                });
        })
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
    })

    describe('createBorne 3rd scenario', () => {

        /* it('returns 200 OK when sending borne params that doesn"t exist in db', (done) => {
             request
                 .post('/')
                 .send({
                     nomBorne: 'Bab El Oued - 2',
                     wilaya: 'Alger',
                     commune: 'Bab El Oued',
                     latitude: 36.7927,
                     longitude: 3.0513,
                     nbVehicules: 30,
                     nbPlaces: 5
                 })
                 .expect(200)
                 .expect('Content-Type', 'application/json; charset=utf-8')
                 .end((err, res) => {
                     if (err) done(err);
     
                     expect(res.body.error)
     
                     done();
                 });
     
         });*/


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
                    nbPlaces: 9
                })
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
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);

                    expect(res.body);
                    expect(res.body.length).toEqual(17);
                    done();
                });

        });

    });
    describe('Get list of all wilaya in database 5th scenario', () => {

        it('returns 200 OK when getting all wilaya', (done) => {
            request
                .get('/wilaya')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.length).toEqual(5);
                    done();
                });

        });

    });
    describe('Get list of all communes in database 6th scenario', () => {

        it('returns 200 OK when getting all communes', (done) => {
            request
                .get('/wilaya/all/commune')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);
                    expect(res.body.length).toEqual(16);
                    done();
                });

        });
        it('returns 200 OK when getting all communes of wilaya : Alger', (done) => {
            request
                .get('/wilaya/Boumerdes/commune')
                .set('Accept', 'application/json')
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
                .expect(404)
                .expect('Content-Type', 'application/json; charset=utf-8')

                .end((err, res) => {

                    if (err) done(err);

                    expect(res.body.message).toBe("No Commune found for wilaya :Setif");

                    done();
                });

        });

    });

    describe('Get list of all vehicles in a given borne of id 1', () => {
        it('Should returns 200 OK when getting all vehicles in the borne', (done) => {
            request
                .get('/1/vehicules')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.length).not.toEqual(0);
                    done();
                });
        });

        it('Should returns 404 when using an non exesting id borne=3 ', (done) => {
            request
                .get('/3/vehicules')
                .set('Accept', 'application/json')
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


        it('returns 200 OK when sending correct filter like nbVehicules entre 10 et 50', (done) => {
            request
                .post('/filter')
                .send({
                    wilaya: 'Alger',
                    nbVehiculesMax: 50,
                    nbVehiculesMin: 10
                })
                .set('Accept', 'application/json')
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
                    nbVehiculesMax: "m",
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

        it("Return Error if id borne not found", (done) => {
            request
                .put('/7')
                .send({ etat: 'en hors service' })
                .set('Accept', 'application/json')
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
