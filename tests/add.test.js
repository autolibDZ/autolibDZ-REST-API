const { add } = require('./index');

describe('adding two numbers', () => {
	it('return 5 when i add 3 to 2', () => {
		expect(add(3, 2)).toEqual(5);
	});
});
