const { trace } = require('joi');
const Request = require('supertest');
request = Request('http://localhost:4000/api/transaction');


describe('Transaction route test', () => {
     var header = { "authorization": " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsInJvbGUiOiJhZG1pbmlzdHJhdGV1ciIsImlhdCI6MTYyMjYyOTY3OX0.3oO8qBjv6jwQsQTIp6TaK8pvfKG9be8bn1btdHtKb00" };


     /**
     * Test "createTransaction" method 
     */

     describe('Add one transaction', () => {

          it('returns 403 invalid_access_token when token is invalid ', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 3,
                         "montant": 222.2,
                         "modePaiement": "Stripe",
                         "idReservation": 10
                    })
                    .set('Accept', 'application/json')
                    .set("authorization", "aaaa")
                    .expect(403)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("invalid_access_token")
                         expect(res.body.message).toBe("Access Forbidden,invalid token")
                         done();
                    });
          });

          it('returns 403 authorization_required when user is Unauthorized ', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 3,
                         "montant": 222.2,
                         "modePayement": "Stripe",
                         "idReservation": 10
                    })
                    .set('Accept', 'application/json')
                    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInJvbGUiOiJBZ2VudE1haW50ZW5hbmNlIiwiaWF0IjoxNjIzMjc5NzE3fQ.3mxpzv-U9WhM8vizNlAucLHdz8tkgbiLI36z1MHRSu0")
                    .expect(403)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("authorization_required")
                         expect(res.body.message).toBe("Access Forbidden,you can't do this operation")
                         done();
                    });
          });

          it('returns 201 when the id reservation does not existe', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 3,
                         "montant": 222.2,
                         "modePayement": "Stripe",
                         "idReservation": 10
                    })
                    .set(header)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body)
                         done();
                    });
          });

          it('returns 400  when deplicat id reservation', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 1,
                         "montant": 222.2,
                         "modePaiement": "Stripe",
                         "idReservation": 9
                    })
                    .set('Accept', 'application/json')
                    .set(header)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.message).toBe('Reservation already paid.')
                         done();
                    });
          });


          it('returns 400 when when not sending an idReservation or idLocataire or "montant"', (done) => {
               request
                    .post('/')
                    .send({
                         "modePaiement": "Stripe",
                    })
                    .expect(400)
                    .set(header)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe('validation_error')
                         done();
                    });
          });

          it('returns 400  when not sending an ModePaiement', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 1,
                         "montant": 222.2,
                         "idReservation": 12
                    })
                    .set('Accept', 'application/json')
                    .set(header)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe('validation_error')
                         expect(res.body.message).toBe('Mode Paiement can not be empty!')
                         done();
                    });
          });


          it('returns 400 when sending a negative number in "montant"', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 1,
                         "montant": -222,
                         "modePaiement": "Stripe",
                         "idReservation": 9
                    })
                    .set(header)
                    .expect(400)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.message).toBe('montant must be a positive number')
                         done();
                    });
          });

          it('returns 400 when sending a string value in "montant"', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 1,
                         "montant": "22",
                         "idReservation": 9,
                         "modePaiement": "Stripe"
                    })
                    .set(header)
                    .expect(400)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.message).toBe("montant must be a number")
                         done();
                    });
          });
     })


     /**
      * Test "getUserTransactions" method
      */

     describe('Get transactions by user id', () => {

          it('returns 403 invalid_access_token when token is invalid', (done) => {
               request
                    .get('/1')
                    .set("Authorization", "aaaa")
                    .expect(403)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("invalid_access_token")
                         expect(res.body.message).toBe("Access Forbidden,invalid token")
                         done();
                    });
          });

          it('returns 403 authorization_required when user is Unauthorized ', (done) => {
               request
                    .get('/1')
                    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInJvbGUiOiJBZ2VudE1haW50ZW5hbmNlIiwiaWF0IjoxNjIzMjc5NzE3fQ.3mxpzv-U9WhM8vizNlAucLHdz8tkgbiLI36z1MHRSu0")
                    .expect(403)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("authorization_required")
                         expect(res.body.message).toBe("Access Forbidden,you can't do this operation")
                         done();
                    });
          });

          it('returns 200 OK when using an exesting id 1', (done) => {
               request
                    .get('/1')
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .set(header)
                    .end((err, res) => {
                         if (err) done(err);
                         else {
                              let transactions = res.body
                              expect(transactions.length).not.toEqual(0);
                              transactions.forEach(transaction => {
                                   expect(transaction.idLocataire).toEqual(1)
                              });
                              done();
                         }
                    });
          });

          it('returns 404 Not found when using an non exesting id 5', (done) => {
               request
                    .get('/5')
                    .expect(404)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .set(header)

                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.message).toBe('Locataire with ID 5 has no transaction yet');
                         done();
                    });
          });

          it('returns 500  server error when using a wrong id like a', (done) => {
               request
                    .get('/a')
                    .set(header)
                    .expect(500)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error)
                         done();
                    });
          });
     })

     /**
      * Test "getTransaction" method
      */

     describe('Visualize transaction details  ', () => {


          it('returns 403 invalid_access_token when token is invalid', (done) => {
               request
                    .get('/1/1')
                    .set("authorization", "aaaa")
                    .expect(403)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("invalid_access_token")
                         expect(res.body.message).toBe("Access Forbidden,invalid token")
                         done();
                    });
          });

          it('returns 403 authorization_required when user is Unauthorized ', (done) => {
               request
                    .get('/1/1')
                    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInJvbGUiOiJBZ2VudE1haW50ZW5hbmNlIiwiaWF0IjoxNjIzMjc5NzE3fQ.3mxpzv-U9WhM8vizNlAucLHdz8tkgbiLI36z1MHRSu0")
                    .expect(403)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("authorization_required")
                         expect(res.body.message).toBe("Access Forbidden,you can't do this operation")
                         done();
                    });
          });


          it('returns 200 OK when using an exesting id of user and transaction: 14', (done) => {
               request
                    .get('/1/1')
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .set(header)
                    .end((err, res) => {
                         if (err) done(err);
                         else {
                              expect(res.body).not.toEqual(null)
                              expect(res.body.idLocataire).toEqual(1)
                              expect(res.body.idTransaction).toEqual(1)
                              done();
                         }
                    });
          });

          it('returns 404 when using an non exesting id of transaction 50', (done) => {
               request
                    .get('/1/50')
                    .set(header)
                    .expect(404)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.message).toBe("Locataire transaction with ID: 50 does not exist")
                         done();
                    });
          });

          it('returns 500  server error when using a wrong id like a', (done) => {
               request
                    .get('/a')
                    .set(header)
                    .expect(500)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error)
                         done();
                    });
          });
     })

     /**
      * Filter transactions
      */

     describe('Post filterTransaction : returns a list of filtered user transactions ', () => {

          it('returns 403 invalid_access_token when token is invalid', (done) => {
               request
                    .post('/1/filter')
                    .send({})
                    .set("authorization", "aaaa")
                    .expect(403)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("invalid_access_token")
                         expect(res.body.message).toBe("Access Forbidden,invalid token")
                         done();
                    });
          });

          it('returns 403 authorization_required when user is Unauthorized ', (done) => {
               request
                    .post('/1/filter')
                    .send({})
                    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInJvbGUiOiJBZ2VudE1haW50ZW5hbmNlIiwiaWF0IjoxNjIzMjc5NzE3fQ.3mxpzv-U9WhM8vizNlAucLHdz8tkgbiLI36z1MHRSu0")
                    .expect(403)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error).toBe("authorization_required")
                         expect(res.body.message).toBe("Access Forbidden,you can't do this operation")
                         done();
                    });
          });


          it('should returns 200 OK and a list of user transaction when using an existing id 1 and no value chosen for filtering', (done) => {
               request
                    .post('/1/filter')
                    .send({})
                    .set('Accept', 'application/json')
                    .set(header)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.length).not.toEqual(0);
                         done();
                    });
          });

          it('should returns 200 OK and a list of user transaction with value chosen when using an existing id 1', (done) => {
               request
                    .post('/1/filter')
                    .send({
                         "montantTo": 2230
                    })
                    .set(header)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done.fail(err);
                         else {
                              let transactions = res.body
                              expect(transactions.length).not.toEqual(0);
                              transactions.forEach(transaction => {
                                   expect(transaction.montant).toBeLessThan(2230)
                              });
                              done();
                         }
                    });
          });

          it('should returns 404 when using  an existing id 1 and no transaction with the values chosen', (done) => {
               request
                    .post('/1/filter')
                    .send({
                         "montant": 223,
                         "dateFrom": "2021-05-15"
                    })
                    .set(header)
                    .set('Accept', 'application/json')
                    .expect(404)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error == 'There is no transaction with these parameters.').toBe(true);
                         done();
                    });
          });

          it('should returns 404 ERROR when using an non existing id 144', (done) => {
               request
                    .post('/144/filter')
                    .send({})
                    .set('Accept', 'application/json')
                    .expect(404)
                    .set(header)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.message).toBe('Locataire with ID 144 has no transaction yet');
                         done();
                    });
          });
     })

})