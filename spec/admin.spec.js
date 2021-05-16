const Request = require('supertest');
const request = Request('http://localhost:4000/api/admin');
describe('Test CRUD admin route', () => {
    it('It gets the admin with id 6', (done) => {
        request.get("/6")
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body.data).not.toBe(undefined)
                done();
            })

    })
    it('It gets all the admins', (done) => {
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
    let updatedAdmin = {
        nom: "newNom",
        prenom: "newPrenom",
    }
    it("It updates the admin with the id of 6", (done) => {
        request.put("/6",)
            .set(options)
            .send(JSON.stringify(updatedAdmin))
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) end(err)
                expect(res.body.success).toBe(true)
                done()
            })
    })
    it("It Delets the admin  with the id 6 ", (done) => {
        request.delete("/6").expect(200)
            .end((err, res) => {
                if (err) end(err)
                expect(res.body.success).toBe(true)
                done()
            })
    })

})