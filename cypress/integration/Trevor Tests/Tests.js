describe("Run My Tests", () => {
	it("BEFORE LOGIN", () => {
		cy.visit("http://localhost:3000/video/1");

		cy.get("#followLogin");
	});

	it("Logs in", () => {
		cy.get("button#loginLarge").click();

		cy.get("#closeModal").click();

		cy.get("button#loginLarge").click();

		cy.get('input[name="email"]').type("admin@test.com");

		cy.get('input[name="password"]').type("admin");

		cy.get('button[type="submit"]').click();
	});

	it("Follow Button", () => {
		cy.get("button#followButton").click({ force: true });
	});

	it("Unfollow Button", () => {
		cy.get("button#followButton").click({ force: true });
	});

	it("Edit and Changes name", () => {
		cy.get('a[href= "/upload-video"]').click();

		cy.get("button.EditButton")
			.first()
			.click();
	});
});
