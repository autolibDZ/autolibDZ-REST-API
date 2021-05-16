
const stripe = require("stripe")("sk_test_51IpB9FFlA46GQCJtlgmMqZV1YLYJ8I4csD2ybXJKu7uNu2prvmTHIEMQ6r06tyXVU0vvTmqBdlVcmiujf6G6jUiI008woZKPpw");

const createPyementIntent = async (req, res) => {

    if (!req.body.prix) {
		res.status(400).send({
			message: "body 'prix' element can not be empty!",
		});
		return;
	}

    if (isNaN(req.body.prix)) {
		res.status(400).send({
			message: "body 'prix' element must be a number!",
		});
		return;
	}

    if (req.body.prix < 0 ) {
		res.status(400).send({
			message: "body 'prix' element must be a positive number!",
		});
		return;
	}

    try{

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.prix,
            currency: "dzd"
        });

        res.send({
            clientSecret : paymentIntent.client_secret,
            message : "payement intent created successfully "
        });

    }catch(err){
        res.status(500).send({
			error: err.message || 'Some error occurred !',
		});
    }


}

export default {
	createPyementIntent,
};