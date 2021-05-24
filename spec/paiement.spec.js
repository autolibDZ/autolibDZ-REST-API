const Request = require('supertest');
request = Request('http://localhost:4000/api/payment');


describe("Payment route test",()=>{


    describe('POST create-payment-intent : create the payement intent', () => {
    
        it('returns 200 OK when the body is not empty and the "prix" is greater than 10000', (done) => {
          request
            .post('/create-payment-intent')
            .send({
              prix : 10000 // prix is in dzd (centime) thes 10000 is 100 DA
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
    
                expect(res.body.message).toBe("payment intent created successfully ")

                expect(res.body.clientSecret != null).toBe(true)
                
                done();
              });
          
        });

    
        it('returns 400 bad request when sending a negative number', (done) => {
          request
            .post('/create-payment-intent')
            .send({
              prix : -10000 
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
    
                expect(res.body.message == "body 'prix' element must be a positive number!").toBe(true)
                
                done();
              });
          
        });
    
        it('returns 400 bad request when sending a string value for prix', (done) => {
          request
            .post('/create-payment-intent')
            .send({
              prix : "10000m"
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
    
                expect(res.body.message == "body 'prix' element must be a number!").toBe(true)
                
                done();
              });
          
        });
    
        it('returns 500 server error when the prix is less than 50 cent in usd', (done) => {
          request
            .post('/create-payment-intent')
            .send({
              prix : 100
            })
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
    
                expect(res.body.error).toBe("Amount must convert to at least 50 cents. 1.00 د.ج converts to approximately $0.01.")
                
                done();
              });
          
        });
    
      });


})