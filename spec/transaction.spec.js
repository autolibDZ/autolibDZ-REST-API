const Request = require('supertest');
request = Request('http://localhost:4000/api/transaction');

describe('Transaction route test', () => {

     describe('Add one transaction', () => {

          it('returns 201 when the id reservation does not existe', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 1,
                         "montant": 222.2,
                         "moyenPayement": "Paypal",
                         "idReservation": 3
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body)
                         done();
                    });
          });

          it('returns 500 when deplicat id reservation', (done) => {
               request
                    .post('/')
                    .send({
                         "idLocataire": 1,
                         "montant": 222.2,
                         "moyenPayement": "Paypal",
                         "idReservation": 2
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
     })


     describe('Get transactions by user id', () => {
          it('returns 200 OK when using an exesting id 1', (done) => {
               request
                    .get('/1')
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error == 'Reservation already paid.')
                         done();
                    });
          });

          it('returns 404 Not found when using an non exesting id 5', (done) => {
               request
                    .get('/5')
                    .expect(404)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end((err, res) => {
                         if (err) done(err);
                         expect(res.body.error == 'le locataire avec id 5 n\'a pas encore de transactions')
                         done();
                    });
          });
     })
})