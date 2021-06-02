const Request = require('supertest');
request = Request('https://autolib-dz.herokuapp.com/api/auth');

describe('POST : Authentification des locataire', () => {
    it('returns 200 OK when using valid input and credentials', (done) => {
        request
            .post('/administrateur')
            .send({
                email: 'administrateur@esi.dz',
                motdepasse: 'Admin123',
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.success == true).toBe(true);

                done();
            });
    });

    it('returns 400 Bad Request when not sending either an email or password', (done) => {
        request
            .post('/administrateur')
            .send({
                email: 'administrateur@esi.dz',
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.success == false).toBe(true);
                done();
            });
    });

    it('returns 401 Unauthorized when using wrong credentials', (done) => {
        request
            .post('/administrateur')
            .send({
                email: 'administrateur@esi.dz',
                motdepasse: '12345444',
            })
            .expect(401)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);

                expect(res.body.success == false).toBe(true);
                done();
            });
    });
});