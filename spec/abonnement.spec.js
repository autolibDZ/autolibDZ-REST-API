const Request = require('supertest');
request = Request('http://localhost:4000/api/abonnement');

describe('Abonnement route test', () => {

  describe('getBalance 1st scenario', () => {
    
    it('returns 200 OK when using an exesting id 1', (done) => {
      request
        .get('/1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) done(err);
            
            expect(res.body.balance)
            
            done();
          });
      
    });


    it('returns 404 Not found when using an non exesting id 13', (done) => {
        request
          .get('/13')
          .expect(404)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end((err, res) => {
              if (err) done(err);
              
              expect(res.body.error == 'the id 13 does not exist')
              
              done();
            });
        
      });

      it('returns 500  server error when using a wrong id like 1m', (done) => {
        request
          .get('/1m')
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

