const authControl = require('../routes/controllers/AuthController')

describe('Test Register Security', () => {

	const workingAccount = {
		body: {
			email: 'hejkle@test.com',
			displayName: '',
			password: 'Th1sP4ssw0rdIsF1ne',
		}
	}

	const failNoNum = {
		body: {
			email: 'hejkle@test.com',
			displayName: 'EagleEyes',
			password: 'thisPassneedsNumbers'
		}
	}

	const failNoName = {
		body: {
			email: 'hejkle@test.com',
			displayName: '',
			password: 'Th1sP4ssw0rdIsF1ne'
		}
	}

	const failPassShort = {
		body: {
			email: 'hejkle@test.com',
			displayName: 'EagleEyes',
			password: 'ef'
		}
	}

	const failNoEmail = {
		body: {
			email: '',
			displayName: 'EagleEyes',
			password: 'Th1sP4ssw0rdIsF1ne'
		}
	}

	const failAll = {
		body: {
			email: '',
			displayName: '',
			password: ''
		}
	}

	test('Password with no numbers', () => {
		expect(authControl.register(failNoNum, null)).toEqual({
			response: false,
			reasons: ['Password should contain a number']
		})
	})

	test('Account with short password', () => {
		expect(authControl.register(failPassShort, null)).toEqual({
			response: false,
			reasons: ['Password should be longer than 6 characters']
		})
	})

	test('Account with no userName', () => {
		expect(authControl.register(failNoName, null)).toEqual({
			response: false,
			reasons: ['Must have a username']
		})
	})


	test('Account with no email', () => {
		expect(authControl.register(failNoEmail, null)).toEqual({
			response: false,
			reasons: ['Must have an email']
		})
	})

	test('Total Fail Account', () => {
		expect(authControl.register(failAll, null)).toMatchObject({
			response: false,
			reasons: [
				'Must have an email',
				'Must have a username',
				'Password should be longer than 6 characters',
				'Password should contain a number'
			]
		})
	})

	test('Valid Account works', () => {
		authControl.register(workingAccount, null).toHaveProperty('response', true)
	})

})