describe('My first test', () => {
	it('Visits Stream-Dream', () => {
		cy.visit('http://localhost:3000')
		cy.get('.slick-active > :nth-child(1) > .sc-bwzfXH > .sc-htpNat')
		cy.get('.slick-prev').click()
	})
})