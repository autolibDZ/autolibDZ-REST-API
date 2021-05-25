const Request = require('supertest');
request = Request('http://localhost:4000/api/transaction');



describe('Transaction route test', () => {

     /**
     * Test "createTransaction" method 
     */

     describe('Add one transaction', () => {

          it('returns 201 when the id reservation does not existe', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 3,
                         "montant": 222.2,
                         "moyenPayement": "Stripe",
                         "idReservation": 10
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body)
                         done();
                    });
          });

          it('returns 404 Error when deplicat id reservation', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 1,
                         "montant": 222.2,
                         "moyenPayement": "Stripe",
                         "idReservation": 9
                    })
                    .set('Accept', 'application/json')
                    .expect(404)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error == 'Reservation already paid.')
                         done();
                    });
          });
     })


     /**
      * Test "getUserTransactions" method 
      */

     describe('Get transactions by user id', () => {
          it('returns 200 OK when using an exesting id 1', (done) => {
               request
                    .get('/1')
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8')
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
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error == 'le locataire avec id 5 n\'a pas encore de transactions').toBe(true)
                         done();
                    });
          });

          it('returns 500  server error when using a wrong id like a', (done) => {
               request
                    .get('/a')
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
          it('returns 200 OK when using an exesting id of user and transaction: 14', (done) => {
               request
                    .get('/1/14')
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         else {
                              expect(res.body).not.toEqual(null)
                              expect(res.body.idLocataire).toEqual(1)
                              expect(res.body.idTransaction).toEqual(14)
                              done();
                         }
                    });
          });

          it('returns 404 when using an non exesting id of transaction 5', (done) => {
               request
                    .get('/1/5')
                    .expect(404)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error == "Locataire transaction with ID: 5 does not exist").toBe(true)
                         done();
                    });
          });

          it('returns 500  server error when using a wrong id like a', (done) => {
               request
                    .get('/a')
                    .expect(500)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error)
                         done();
                    });
          });
     })

})