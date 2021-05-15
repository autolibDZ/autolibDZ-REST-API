var request = require("request");
var base_url = "http://localhost:4000"
/**
 * Test "getBorne" method 
 */
describe("Test get one borne", function () {
    describe("GET/", function () {
        it("returns status code 200", function (done) {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("get borne by id", function (done) {
            request.get("http://localhost:4000/api/bornes/1", function (error, response, body) {
                expect(JSON.parse(body)).toEqual({ idBorne: 1, nomBorne: 'Grande Poste', wilaya: 'Alger', commune: 'Grande Poste', latitude: 36.7731, longitude: 3.0595, nbVehicules: 20, nbPlaces: 9 });
                console.log(body);
                done();
            });
        });
    });
});



/**
 * Test getfilteredBornes method
 */
describe("get all bornes", function () {
    describe("post/filter", function () {


        it("get filtered brones", function (done) {

            request.post({ url: "http://localhost:4000/api/bornes/filter", form: { "filter": "" } }, function (error, response, body) {
                expect(JSON.parse(body)).toEqual([{ idBorne: 1, nomBorne: 'Grande Poste', wilaya: 'Alger', commune: 'Grande Poste', latitude: 36.7731, longitude: 3.0595, nbVehicules: 20, nbPlaces: 9 }]);

                console.log(body);
                done();
            });
        });
    });
});

/**
 * Test "createBorne" method
 */
describe("add borne", function () {
    describe("post/", function () {


        it("add one borne", function (done) {

            request.post({ url: "http://localhost:4000/api/bornes", form: { "idBorne": 2, "nomBorne": 'Bab El Oued', "wilaya": 'Alger', "commune": 'Bab El Oued', "latitude": 59.99, "longitude": 60, "nbVehicules": 19, "nbPlaces": 8 } }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});