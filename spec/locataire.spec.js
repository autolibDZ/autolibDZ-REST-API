const Request = require('supertest');
request = Request('http://localhost:4000/api/locataire');

//Test unitaire pour la creation d'un locataire
describe('POST : Creation de locataire', () => {

    //Creation reussite
    it('returns 200 OK when using a valid input', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                prenom: 'Doumi',
                email: 'ha_doo@esi.dz',
                motdepasse: '00001234'
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.nom === "Athmane").toBe(true)

                done();
            });

    });
    //Creation non reussite --invalide email--
    it('returns 400 bad request when sending a invalide email', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                prenom: 'Doumi',
                email: 'heeelooo',
                motdepasse: '00001234'
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message == "L'email est non valide").toBe(true)

                done();
            });

    });
    //Creation non reussite --missing data--
    it('returns 400 bad request when sending a missing data', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                email: 'ha_fdfd@esi.dz',
                motdepasse: '00001234'
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message == "Missing data").toBe(true)

                done();
            });

    });
    //Création d'un compte via un email déja existé
    it('returns 400 bad request when sending an existant email', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                prenom: 'Doumi',
                email: 'ha_doo@esi.dz',
                motdepasse: '00001234'
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message == "Email déja existé").toBe(true)

                done();
            });

    });
})

//Test unitaire pour creation de compte via gmail
describe('POST : Creation de locataire via gmail', () => {

    //Creation reussite
    it('returns 200 OK when using a valid token from the front', (done) => {
        request
            .post('/createLocataireGmail')
            .send({
                token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQzZmZiYjhhZGUwMWJiNGZhMmYyNWNmYjEwOGNjZWI4ODM0MDZkYWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NDg1MTM4NDk2Mjgta2oyNDAzZGVva3JkZGVmdG83ajg0c25ocDc4a2JvaXYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NDg1MTM4NDk2MjgtczMwcWhxdGltaXE0bWNscm1iNmE4NXN2dnQ1aGs4dTYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDcwMjE5OTk0NjU3MzM2OTQ2MjMiLCJoZCI6ImVzaS5keiIsImVtYWlsIjoiaGJfY2hlcmd1aUBlc2kuZHoiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkJFTl9BSVNTQV9ZQUNJTkUgQ0hFUkdVSSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaW1QU1pIdmx0YlgxdzByeEt2LXJKY3d0ZHhCeDE3QWpMSFVybzJRdz1zOTYtYyIsImdpdmVuX25hbWUiOiJCRU5fQUlTU0FfWUFDSU5FIiwiZmFtaWx5X25hbWUiOiJDSEVSR1VJIiwibG9jYWxlIjoiZnIiLCJpYXQiOjE2MjExMDIwMjksImV4cCI6MTYyMTEwNTYyOX0.n0NlpzkC32Uqfr8vz8y9rPzwgLbSssJTIyiFcFRpB2xZcJgo319QxdYTCaJaa1VHL6dWELTv0ET9WnOdq3JVKCUTLYuJj63PhsxkskRiJopXGOr6srrZkS7fXkx1dmmZi6MKdeBe8LF3NTDTNcN_qtcpVrmsuPK_Qi09sdpqDq-MeDnOlaakM2XkMlwrxpiMJU-pMZnkfH30BZ-2jS7LOW5wxetAy8Tsy4Xz8D5WAyYxnDcUrRbCoFcKVg8TX7YDKeanHH4l7CWVl6NxFPJlEO8Ydvzv5aNtjxbQ_afu2fP2tyyC4Ii3H0EOrT8MMYDjKwiIACM2CJxehKYwu835EA',
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.prenom === "CHERGUI").toBe(true)

                done();
            });

    });

})