const Request = require('supertest');
request = Request('http://localhost:4000/api');

//Test unitaire pour la creation d'un administrateur
describe('POST : Creation de administrateur', () => {

    //Creation reussite
    it('renvoie le code 200 quand on utilise des données valides', (done) => {
        request
        .post('/administrateur')
            .send({
                "nom": "test",
                "prenom": "test",
                "email": "sifax@esi.dz",
                "motDePasse": "zertyuiopqsdfghjDSSFSDFklm",
                "salaire":50000
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                console.log(res)
                console.log(request)
                expect(res.body.nom === "test").toBe(true)
                done();
            });

    });
    /*//Creation avec un mot de passe invalide
    it('renvoie le code 400 quand on utilise un mot de passe invalide', (done) => {
        request
            .post('/administrateur')
            .send({
                "nom": "Nait Mouloud",
                "prenom": "Sifax",
                "email": "sifax@esi.dz",
                "motDePasse": "azerty",
                "salaire":50000
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                //console.log(res)
                expect(res.body.message === "Mot de passe invalide!").toBe(true)
                done();
            });

    });
    //Creation avec un email invalide
    it('renvoie le code 400 quand on utilise un email invalide', (done) => {
        request
            .post('/administrateur')
            .send({
                "nom": "Nait Mouloud",
                "prenom": "Sifax",
                "email": "sifax",
                "motDePasse": "azertyAZSEFSFD12145645SFDS",
                "salaire":50000
            })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                //console.log(res)
                expect(res.body.message === "L'email est non valide!").toBe(true)
                done();
            });

    });
    //Creation avec un champ nom ou prénom vide
    it('renvoie le code 500 quand on utilise un champ nom vide', (done) => {
        request
            .post('/administrateur')
            .send({
                "nom": "",
                "prenom": "Sifax",
                "email": "sifax@esi.dz",
                "motDePasse": "azertyqdqsQDFSDFSD215445415",
                "salaire":50000
            })
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) done(err);
                //console.log(res)
                expect(res.body.message === "Le champ nom et prénom ne peuvent pas etre vides!").toBe(true)
                done();
            });

    });*/
})
/*
//Test unitaire pour la récupération des administrateurs
describe('GET : Récupération des administrateurs', () => {
    it('Doit retourner la liste des admins, aux moins un admin', (done) => {
		request
			.get('/administrateur')
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

//Test unitaire pour la récupération d'un administrateur
describe(' GET on /api/administrateur/:id endpoint, récupération d\'un administrateur donné', () => {
	it("Doit retourner informations de l'admin avec id=50", (done) => {
		request
			.get('/administrateur/50')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.idAdministrateur).toEqual(50);
					done();
				}
			});
	});
});

//Tester la modification d'un administrateur
describe('PUT on /api/administrateur/:id endpoint', () => {
	it("Doit retourner informations modifiées de l'admin avec id=50", (done) => {
		request
        .put('/administrateur/50')
        .send({
            "salaire":100000
        })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) done(err);
            console.log(res)
            expect(res.body.message==="L'Administrateur a bien été modifié!").toBe(true)
            done();
        });
	});
});*/
