const { trace } = require('joi');
const Request = require('supertest');
request = Request('http://localhost:4000/api/transaction');

describe('Transaction route test', () => {

     describe('Post filterTransaction : returns a list of filtered user transactions ', () => {

          it('should returns 200 OK and a list of user transaction when using an existing id 1 and no value chosen for filtering', (done) => {
               request
                    .post('/1/filter')
                    .send({})
                    .set('Accept', 'application/json')
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
                         "montantTo": 223
                    })
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done.fail(err);
                         else {
                              let transactions = res.body
                              expect(transactions.length).not.toEqual(0);
                              transactions.forEach(transaction => {
                                   expect(transaction.montant).toBeLessThan(223)
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
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error == 'le locataire avec id 144 n\'a pas encore de transactions.').toBe(true);
                         done();
                    });
          });





     })
})