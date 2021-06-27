const Request = require('supertest');
request = Request('localhost:4000/api/locataire');

//Test unitaire pour la creation d'un locataire
describe('POST : Creation de locataire', () => {
    //Creation reussite
    it('returns 200 OK when using a valid input', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                prenom: 'Doumi',
                email: 'testtest@test.dz',
                motdepasse: '00001234',
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message === 'Création réussite').toBe(true);

                done();
            });
    });
    //Creation non reussite --invalide email--
    it('returns 400 bad request when sending invalide email', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                prenom: 'Doumi',
                email: 'athDoumi',
                motdepasse: '00001234',
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message == "L'email est non valide").toBe(true);

                done();
            });
    });
    //Creation non reussite --missing data--
    it('returns 400 bad request when sending a missing data', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                email: 'ha_test@esi.dz',
                motdepasse: '00001234',
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message == 'Missing data').toBe(true);

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
                email: 'tedt@test.fr',
                motdepasse: '00001234',
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message == 'Email déja existé').toBe(true);

                done();
            });
    });
});
/* it('returns 500 server error', (done) => {
        request
            .post('/createLocataire')
            .send({
                nom: 'Athmane',
                prenom: 'Doumi',
                email: 'tedt@test.fr',
                motdepasse: '00001234',
            })
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.message == 'Une erreur  lors de la création de locataire').toBe(true);

                done();
            });
    });
});

            //Test unitaire pour creation de compte via gmail
            /*describe('POST : Creation de locataire via gmail', () => {
                //Creation reussite
                it('returns 200 OK when using a valid token from the front', (done) => {
                    request
                        .post('/createLocataireGmail')
                        .send({
                            token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQzZmZiYjhhZGUwMWJiNGZhMmYyNWNmYjEwOGNjZWI4ODM0MDZkYWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NDg1MTM4NDk2Mjgta2oyNDAzZGVva3JkZGVmdG83ajg0c25ocDc4a2JvaXYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NDg1MTM4NDk2MjgtczMwcWhxdGltaXE0bWNscm1iNmE4NXN2dnQ1aGs4dTYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDcwMjE5OTk0NjU3MzM2OTQ2MjMiLCJoZCI6ImVzaS5keiIsImVtYWlsIjoiaGJfY2hlcmd1aUBlc2kuZHoiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkJFTl9BSVNTQV9ZQUNJTkUgQ0hFUkdVSSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaW1QU1pIdmx0YlgxdzByeEt2LXJKY3d0ZHhCeDE3QWpMSFVybzJRdz1zOTYtYyIsImdpdmVuX25hbWUiOiJCRU5fQUlTU0FfWUFDSU5FIiwiZmFtaWx5X25hbWUiOiJDSEVSR1VJIiwibG9jYWxlIjoiZnIiLCJpYXQiOjE2MjExMDIwMjksImV4cCI6MTYyMTEwNTYyOX0.n0NlpzkC32Uqfr8vz8y9rPzwgLbSssJTIyiFcFRpB2xZcJgo319QxdYTCaJaa1VHL6dWELTv0ET9WnOdq3JVKCUTLYuJj63PhsxkskRiJopXGOr6srrZkS7fXkx1dmmZi6MKdeBe8LF3NTDTNcN_qtcpVrmsuPK_Qi09sdpqDq-MeDnOlaakM2XkMlwrxpiMJU-pMZnkfH30BZ-2jS7LOW5wxetAy8Tsy4Xz8D5WAyYxnDcUrRbCoFcKVg8TX7YDKeanHH4l7CWVl6NxFPJlEO8Ydvzv5aNtjxbQ_afu2fP2tyyC4Ii3H0EOrT8MMYDjKwiIACM2CJxehKYwu835EA',
                        })
                        .expect(200)
                        .expect('Content-Type', 'text/html; charset=utf-8')
                        .end((err, res) => {
                            if (err) done(err);
                            expect(res.body.message === 'Création réussite').toBe(true);

                            done();
                        });
                });
            });*/

//Test unitiare pour la récupération des locataires
/*describe('GET : Recuperation des locataires', () => {
    //Recuperation reussite
    it('returns 200 OK when using a valid input', (done) => {
        request
            .get('/')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});

//Test unitiare pour la récupération d'un locataire
describe("GET : Recuperation d'un locataire", () => {
    //Recuperarion reussite
    it('returns 200 OK when using a valid input', (done) => {
        let id = 1;
        request
            .get(`/${id}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                console.log(res.body);
                if (err) done(err);
                expect(res.body.nom == 'ZATOUT').toBe(true);

                done();
            });
    });
    //Recuperarion echouée
    it('returns 404 not found when using an invalid input', (done) => {
        let id = 2;
        request
            .get('/' + id)
            .expect(404)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message == 'Locataire non existant').toBe(true);

                done();
            });
    });
});

//Test unitiare pour la mise à jour des locataires
describe('PUT : Mise à jour de locataire', () => {
    //Mise à jour reussite
    it('returns 200 OK when using a valid input', (done) => {
        let id = 1;
        request
            .put(`/${id}`)
            .send({
                nom: 'ZATOUT',
                prenom: 'BADREDDINE',
                email: 'hb_zat@esi.dz',
                motDePasse: '00001234',
                Active: true
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message == 'Locataire was updated successfully.').toBe(true);

                done();
            });
    });
    //Mise à jour echouée
    it('returns 400 Bad request when using an invalid input', (done) => {
        let id = 2;
        request
            .put(`/${id}`)
            .send({
                nom: 'ZATOUT',
                prenom: 'BADREDDINE',
                email: 'hb_zat@esi.dz',
                motDePasse: '00001234',
                Active: true
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message == `Cannot update Locataire with id=${id}. Maybe Locataire was not found or req.body is empty!`).toBe(true);

                done();
            });
    });
});

//Test unitiare pour la suppression des locataires
describe('DELETE : Suppression un locataire', () => {
    //Suppression reussite
    it('returns 200 OK when using a valid input', (done) => {
        let id = 1;
        request
            .delete(`/${id}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message == 'Locataire was deleted successfully!').toBe(true);

                done();
            });
    });
    //Suppression echouée
    it('returns 400 Bad request when using an invalid input', (done) => {
        let id = 2;
        request
            .delete(`/${id}`)
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message == `Cannot delete Locataire with id=${id}. Maybe Locataire was not found!`).toBe(true);

                done();
            });
    });
});

//Test unitiare pour le blocage er déblocage des locataires
describe('PUT : Blocage/Déblocage de locataire', () => {
    //Mise à jour reussite
    it('returns 200 OK when using a valid input', (done) => {
        let id = 4;
        request
            .put(`/block/${id}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message == 'Locataire was updated successfully.').toBe(true);

                done();
            });
    });
    //Mise à jour echouée
    it('returns 400 Bad request when using an invalid input', (done) => {
        let id = 2;
        request
            .put(`/block/${id}`)
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.message == `Cannot update Locataire with id=${id}. Maybe Locataire was not found!`).toBe(true);

                done();
            });
    });
});*/