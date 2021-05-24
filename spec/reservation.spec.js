const Request = require('supertest');
request = Request('http://localhost:4000/api/reservation');

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
/*
describe('POST : Verifier code pin', () => {
    //Code pin valide
    it('returns 200 OK when using a code pin', (done) => {
        request
            .post('/verifyPin')
            .send({
                idVehicule: 5,
                codePin: 4130,
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.success === 'true').toBe(true);
                done();
            });
    });
    //Code pin invalide
    it('returns 400 bad request when using invalid code pin', (done) => {
        request
            .post('/verifyPin')
            .send({
                idVehicule: 5,
                codePin: 4131,
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.success === 'false').toBe(true);
                done();
            });
    });*/


describe('Reservation route test', () => {
    describe('findReservationById', () => {

        it('returns 200 OK when using an exesting id 12', (done) => {
            request
                .get('/12')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end((err, res) => {
                    if (err) done(err);

                    expect(function(res) {
                        res.body.etat = "Active";
                        res.body.idVehicule = 2;
                        res.body.idLocataire = 3;
                        res.body.idBorneDepart = 2;
                        res.body.idBorneDestination = 100;

                    })

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

describe('Get list of all Reservations in a given user of id 3', () => {
    it('Should returns 200 OK when getting all reservations', (done) => {
        request
            .get('/locataires/3')
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
            .get('/locataires/0')
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