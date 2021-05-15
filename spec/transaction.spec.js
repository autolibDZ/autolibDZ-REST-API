var request = require("request");
var base_url = "http://localhost:4000"



//Test "getUserTransactions" 

describe("Test get transaction", function () {
     describe("GET/", function () {
          it("get transactions by user id", function (done) {
               request.get("http://localhost:4000/api/transaction/1", function (error, response, body) {
                 console.log("error",error);
                 expect(JSON.parse(body)).toEqual([
                    {
                        idTransaction: 9,
                        dateTransaction: "2021-05-15T13:17:43.736Z",
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
 