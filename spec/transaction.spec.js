var request = require("request");
var base_url = "http://localhost:4000"

// Test "createTransaction" 
describe("add transaction", function () {
     describe("post/", function () {
          it("add one transaction", function (done) {
               request.post({
                    url: "http://localhost:4000/api/transaction", form: {
                         "idLocataire": 1,
                         "montant": 222.2,
                         "moyenPayement": "Paypal",
                         "idReservation": 3
                    }
               }, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    expect('Content-Type', 'application/json; charset=utf-8')
                    done();
               });
          });

          it("deplicat reservation id", function (done) {
               request.post({
                    url: "http://localhost:4000/api/transaction", form: {
                         "idLocataire": 1,
                         "montant": 222.2,
                         "moyenPayement": "Paypal",
                         "idReservation": 3
                    }
               }, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('body:', body);
                    expect(response.statusCode).toBe(500);
                    done();
               });
          });
     });
})

//Test "getUserTransactions" 

describe("Test get transaction", function () {
     describe("GET/", function () {
          it("get transactions by user id", function (done) {
               request.get("http://localhost:4000/api/transaction/1", function (error, response, body) {
                 console.log("error",error);
                 expect(JSON.parse(body)).toEqual([
                    {
                        idTransaction: 9,
                        dateTransaction: "2021-05-15T13:26:06.426Z",
                        montant: 222.2,
                        moyenPayement: "Paypal",
                        idLocataire: 1,
                        idReservation: 2
                    }
                ]);
                 done();
             });
         });
     });
 });
 