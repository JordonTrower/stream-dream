import authControl from '../routes/controllers/AuthController'

describe('Test Register Security', () => {

	const workingAccount = {
		body: {
			email: 'hejkle@test.com',
			displayName: 'EagleEyes',
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
			password: 'ef6'
		}
	}

	const failNoEmail = {
		body: {
			email: '',
			displayName: 'EagleEyes',
			password: 'Th1sP4ssw0rdIsF1ne'
		}
	}

	const failInvalidEmail = {
		body: {
			email: 'NotAValidEmail',
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
			reasons: ['Must have a valid email']
		})
	})

	test('Account with an invalid email', () => {
		expect(authControl.register(failInvalidEmail, null)).toEqual({
			response: false,
			reasons: ['Must have a valid email']
		})
	})

	test('Total Fail Account', () => {
		expect(authControl.register(failAll, null)).toEqual({
			response: false,
			reasons: [
				'Password should be longer than 6 characters',
				'Password should contain a number',
				'Must have a username',
				'Must have a valid email'
			]
		})
	})

	test('Valid Account works', async () => {
		expect(await authControl.register(workingAccount, null)).toEqual({
			response: true,
			reasons: []
		})
	})

	test('Valid account fails due to duplicate', async () => {
		expect(await authControl.register(workingAccount, null)).toEqual({
			response: false,
			reasons: ['Email or Username already is use']
		})
	})

	test('Delete Valid Account from DB', async () => {
		expect(await authControl.deleteAccount(workingAccount, null)).toEqual({
			response: true,
			reasons: []
		})
	})
})