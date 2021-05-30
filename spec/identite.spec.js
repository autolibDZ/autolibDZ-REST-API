const Request = require('supertest');
request = Request('http://localhost:4000/api');

beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
});

afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

//Test unitaire pour la creation d'un administrateur
describe('POST : Creation identite', () => {
    //Creation reussite
    it('renvoie le code 200 quand on utilise des données valides', (done) => {
        request
            .post('/identites')
            .send({
                "numeroPermis": 12345,
                "photo": "urlPhoto",
                "valide": 0,
                "idLocataire": 3,
                "idOperateur": 1
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                console.log(res.body)
                expect(res.body.numeroPermis === 12345).toBe(true)
                done();
            });

    });
})
    

//Test unitaire pour la récupération des identites
describe('GET : Récupération des identites', () => {
    it('Doit retourner la liste des identites, aux moins une identite', (done) => {
		request
			.get('/identites')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.length).not.toEqual(0);
					done();
				}
			});
	});

})

//Test unitaire pour la récupération d'une identite
describe(' GET on /api/identites/:numeroPermis endpoint', () => {
	it("Doit retourner informations des identites", (done) => {
		request
			.get('/identites/123456789')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.numeroPermis).toEqual(123456789);
					done();
				}
			});
	});
});

//Tester la récupération d'un operateur ayant validé l'identité 123
describe('GET on /api/identites/:numeroPermis/operateur endpoint', () => {
	it("Doit retourner informations de l'operateur", (done) => {
		request
        .get('/identites/123/operateur')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) done(err);
            expect(res.body.idOperateur===1).toBe(true)
            done();
        });
	});
})
