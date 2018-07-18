import authControl from '../routes/controllers/AuthController'

const workingAccount = {
	body: {
		email: 'hejkle@test.com',
		displayName: 'EagleEyes',
		password: 'Th1sP4ssw0rdIsF1ne',
	}
}

describe('register test', () => {

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
			reasons: ['Password should 8 or more characters']
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
				'Password should 8 or more characters',
				'Password should contain a number',
				'Must have a username',
				'Must have a valid email'
			]
		})
	})

	test('Register Valid Account', (done) => {

		expect(authControl.register(workingAccount, null)).resolves.toEqual({
			response: true,
			reasons: []
		})

		done();
	})

	test('Valid account fails due to duplicate', (done) => {


		expect(authControl.register(workingAccount, null)).resolves.toEqual({
			response: false,
			reasons: ['Email or Username already is use']
		})

		done();
	})

})

describe('Login Tests', () => {

	test('Test Working Login', (done) => {

		expect(authControl.login(workingAccount, null)).resolves.toEqual({
			response: true,
			reasons: [],
			userInfo: {
				email: workingAccount.body.email,
				displayName: workingAccount.body.displayName,
				avatar: '',
			}
		})

		done();
	})

	test('Test Wrong Password', (done) => {

		const changePass = Object.assign({}, workingAccount);

		changePass.body.password = 'failure'

		expect(authControl.login(changePass, null)).resolves.toEqual({
			response: false,
			reasons: ['Password is incorrect'],
		})

		done();
	})

	test('Test Wrong Email', (done) => {

		const changeEmail = Object.assign({}, workingAccount);

		changeEmail.body.email = 'failure'

		expect(authControl.login(changeEmail, null)).resolves.toEqual({
			response: false,
			reasons: ['Email is not valid'],
		})

		done();
	})
})

test('Delete Valid Account from DB', (done) => {

	expect(authControl.deleteAccount(workingAccount, null)).resolves.toEqual({
		response: true,
		reasons: []
	})

	done()
})