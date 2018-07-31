describe('Run Jospook Tests', () => {
	it('Logs in', () => {
		cy.visit('http://localhost:3000');

		cy.get('button#loginLarge').click();

		cy.get('#closeModal').click();

		cy.get('button#loginLarge').click();

		cy.get('input[name="email"]').type('admin@test.com');

		cy.get('input[name="password"]').type('admin');

		cy.get('button[type="submit"]').click();
	});

	it('navigates through followed users', () => {
		const followed = cy.get('a[href="/upload-video"]').siblings();

		followed.click({ multiple: true });
	});

	it('navigates search bar', () => {
		cy.get('input[type="text"')
			.type('admin')
			.parent()
			.click();

		cy.get('a[href="/users/2"].dropdownLink').click({ force: true });
	});

	it('logs out', () => {
		cy.visit('http://localhost:3000');

		cy.get('button#loginLarge').click();

		cy.get('#closeModal').click();

		cy.get('button#loginLarge').click();

		cy.get('input[name="email"]').type('admin@test.com');

		cy.get('input[name="password"]').type('admin');

		cy.get('button[type="submit"]').click();

		cy.get('button#openUserInfo').click();

		cy.get('button#logoutUser').click();
	});

	it('navigates through followed users', () => {
		cy.visit('http://localhost:3000/users/2');

		const videoImages = cy.get('video');

		videoImages.each(videoEl => {
			videoEl.click();

			cy.visit('http://localhost:3000/users/2');
		});
	});
});
