describe('Run CDill tests', () => {

	it('It logs in as user CDill.', () => {
		cy.visit('http://localhost:3000');
		cy.get('#loginLarge').click();
		cy.get(':nth-child(2) > .sc-fjdhpX > input').type('cody.dillman13@gmail.com');
		cy.get(':nth-child(3) > .sc-fjdhpX > input').type('L@mbda13')
		cy.get('.sc-gisBJw').click();
	});
	it('It navigates to "other" games catagory, selects the first video, and writes a comment and posts the comment.', () => {
		cy.get('[href="/games/9"]').click({force: true});
		cy.get('video').click();     
		cy.get('#commentInput').type(`Ain't that just the cutest thing?`, {force: true});
		cy.wait(250);        
		cy.get('#submitButton').click({force: true});
		cy.wait(250);        
	});
	it('It opens user info modal and selects a profile image.', () => {
		cy.get('#openUserInfo > img').click();
		cy.get('.css-19bqh2r').click();
		cy.wait(250);        
		cy.get('#react-select-2-option-1 > .sc-frDJqD').click();
		cy.wait(250);        
		cy.get('#closeModal').click();
		cy.get('#logoText').click();

	});
	it('It manually cycles through the carousel.', () => {
		cy.get('.slick-next').click({force: true});
		cy.wait(500);
		cy.get('.slick-next').click({force: true});
		cy.wait(500);
		cy.get('.slick-next').click({force: true});
		cy.wait(500);
		cy.get('.slick-next').click({force: true});
		cy.wait(500);
		cy.get('.slick-next').click({force: true});
		cy.wait(500);
		cy.get('.slick-next').click({force: true});
		cy.wait(500);
	});
	it("It will follow Admin's videos", () => {
		cy.get('input[type="text"')
			.type('admin')
			.parent()
			.click();
		// cy.get('a[href="/users/2"].dropdownLink').click({ force: true });

	})
})