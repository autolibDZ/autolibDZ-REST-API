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

            //expect(res.body.balance != null)
            
            done();
          });
      
    });
  });

});

