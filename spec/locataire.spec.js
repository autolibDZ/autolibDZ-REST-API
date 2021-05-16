const Request = require('supertest');
const request = Request('http://localhost:4000/api/locataire');
describe('Test CRUD locataire route', () => {
    it('It gets the locataire with id 4', (done) => {
        request.get("/4")
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body.data).not.toBe(undefined)
                done();
            })

    })
    it('It gets all the locataires', (done) => {
        request.get("/")
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body.data.length).not.toBe(0)
                done();
            })

    })
    const options = {
        'Content-Type': 'application/json'
    }
    let updatedlocataire = {
        nom: "newNom",
        prenom: "newPrenom",
    }
    it("It updates the agent with the id of 6", (done) => {
        request.put("/4",)
            .set(options)
            .send(JSON.stringify(updatedlocataire))
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) end(err)
                expect(res.body.success).toBe(true)
                done()
            })
    })
    it("It Delets the locataire  with the id 6 ", (done) => {
        request.delete("/5").expect(200)
            .end((err, res) => {
                if (err) end(err)
                expect(res.body.success).toBe(true)
                done()
            })
    })

})