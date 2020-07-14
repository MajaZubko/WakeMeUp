const { check } = require('express-validator');
const usersRepo = require('./repositories/users');

module.exports = {
	requireEmailExists: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must provide a valid email')
		.custom(async (email) => {
			const user = await usersRepo.getOneBy({ email });
			if (!user) {
				throw new Error('Email not found');
			}
		}),
	requireValidPasswordForUser: check('password').trim().custom(async (password, { req }) => {
		const user = await usersRepo.getOneBy({ email: req.body.email });
		if (!user) {
			throw new Error('Invalid password');
		}
		const validPassword = await usersRepo.comparePasswords(user.password, password);
		if (!validPassword) {
			throw new Error('Invalid password');
		}
	})
};
