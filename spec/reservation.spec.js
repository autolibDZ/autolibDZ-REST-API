const Request = require('supertest');
request = Request('http://localhost:4000/api');


    describe('Get list of all Reservations in a given user of id 1', () => {
        it('Should returns 200 OK when getting all reservations', (done) => {
            request
                .get('/reservation/locataires/1')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .set("authorization", " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzNjI2NzAxfQ.NkxwWh01dFTCl3LbzXZTJgJq0VRvPetp_jJqOlmHhs4")

                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.length).not.toEqual(0);
                    done();
                });
        });
        it('returns 403 invalid_access_token when token is invalid', (done) => {
            request
                .get('/reservation/locataires/1')
                .set('Accept', 'application/json')
                .expect(403)
                .expect('Content-Type', /json/)
                .set("authorization", " aaaa")
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.message).toBe("Access Forbidden,invalide token")
                    done();
                });
        });


        it('Should returns 404 when using an non exesting idLocataire ', (done) => {
            request
                .get('/reservation/locataires/-1')
                .set('Accept', 'application/json')
                .expect(404)
                .expect('Content-Type', /json/)
                .set("authorization", " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzNjI2NzAxfQ.NkxwWh01dFTCl3LbzXZTJgJq0VRvPetp_jJqOlmHhs4")

                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body.error == 'No locataires with id: 0')
                    done();
                });
        });
    });



describe('findById', () => {


    it('returns 200 OK when using an exesting id 1', (done) => {
        request
            .get('/reservation/1')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .set("authorization", " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzNjI2NzAxfQ.NkxwWh01dFTCl3LbzXZTJgJq0VRvPetp_jJqOlmHhs4")

            .end((err, res) => {
                if (err) done(err);

                expect(function (res) {

                   res.body.etat= "En cours",
                        res.body.idLocataire= 1,
                        res.body.idVehicule= 1,
                        res.body.idBorneDepart= 1,
                        res.body.idBorneDestination= 2,
                        res.body.codePin= "$2a$10$8pMdf9d9QCCyks8ySp4BWuAkUYz4.HNDPZvcfj3ViCK94nNP/199W",
                        res.body.tempsEstime= null,
                        res.body.distanceEstime= null,
                        res.body.prixEstime= null

                })

                done();
            });

    });




    it('returns 500  server error when using a wrong id like AA55', (done) => {
        request
            .get('/reservation/AA55')
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .set("authorization", " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzNjI2NzAxfQ.NkxwWh01dFTCl3LbzXZTJgJq0VRvPetp_jJqOlmHhs4")

            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error)

                done();
            });

    });
});



describe('createrReservation api', () => {

    it('returns 200 OK when reservation doesn"t exist in db', (done) => {
        request
            .post('/reservation/')
            .send({

                etat: "En cours",
                idVehicule: 1,
                idLocataire: 1,
                idBorneDepart: 1,
                idBorneDestination: 2,
                tempsEstime: 2500,
                distanceEstime: 80,
                prixEstime: 3000

            })
            .set('Accept', 'application/json')
            .set("authorization", " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzNjI2NzAxfQ.NkxwWh01dFTCl3LbzXZTJgJq0VRvPetp_jJqOlmHhs4")

            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error);

                done();
            });
    });
    it('returns 403 invalid_access_token when token is invalid', (done) => {
        request
            .post('/reservation/')
            .send({

                etat: "En cours",
                idVehicule: 1,
                idLocataire: 1,
                idBorneDepart: 1,
                idBorneDestination: 2,
                tempsEstime: 2500,
                distanceEstime: 80,
                prixEstime: 3000

            })
            .set('Accept', 'application/json')
            .set("authorization", "aaaa")

            .expect(403)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message).toBe("Access Forbidden,invalide token")

                done();
            });
    });

    it('returns 403 authorization_required when user is Unauthorized', (done) => {
        request
            .post('/reservation/')
            .send({

                etat: "En cours",
                idVehicule: 1,
                idLocataire: 1,
                idBorneDepart: 1,
                idBorneDestination: 2,

                tempsEstime: 2500,
                distanceEstime: 80,
                prixEstime: 3000

            })
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjYyOTY3OX0.3oO8qBjv6jwQsQTIp6TaK8pvfKG9be8bn1btdHtKb00")

            .expect(403)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message).toBe("Access Forbidden,you can't do this operation")

                done();
            });
    });



    it('returns 400 server error when sending an empty parameter', (done) => {
        request

            .post('/reservation')
            .send({

                idVehicule: 1,
                idLocataire: 1,
                idBorneDepart: 1,
                tempsEstime: 2500,
                distanceEstime: 80,
                prixEstime: 3000
            })
            .set('Accept', 'application/json')
            .set("authorization", " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyLCJyb2xlIjoibG9jYXRhaXJlIiwiaWF0IjoxNjIzNjI2NzAxfQ.NkxwWh01dFTCl3LbzXZTJgJq0VRvPetp_jJqOlmHhs4")

            .expect(400)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.error);

                done();
            });
    });


});


describe('Get list of all reservation', () => {

    it('returns 200 OK when getting all reservation', (done) => {
        request
            .get('/reservation')
            .set('Accept', 'application/json')
            .set("authorization", " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMzE5NDgzM30.8Nf7HsdYqwRcYZdA6Hr1M0saTxgF2uLXiOLhUa8VjX8")

            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')

            .end((err, res) => {

                if (err) done(err);

                expect(res.body);
                expect(res.body.length).toEqual(40);
                done();
            });

    });

});


describe('Testing Update Reservation', () => {
   it('return 200 OK and the actual updated borne with id= 12', (done) => {
        request
            .put('/reservation/12')
            .send({
                etat: "Terminée",
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

})