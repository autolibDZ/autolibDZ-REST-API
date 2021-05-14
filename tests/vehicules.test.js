const testSelectVehicule = require('./index').testSelectVehicules;

describe('Testing select vehicules', () => {
	it('should return the vehicule wit numChassis is 123456 which model is 207', () => {
		const vehicule = testSelectVehicule(123456);
		expect(vehicule.modele).toEqual('207');
	});
});
