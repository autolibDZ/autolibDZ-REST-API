
const stripe = require("stripe")("pk_test_51IpB9FFlA46GQCJtPCuVBzXAaWbT4Nwiy6RchGcxO2OeOHNLrQXBm0TgR4LcICPZQ9cgMKqkytKN2pUU9vGjkZSw00WhixIzkx");

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