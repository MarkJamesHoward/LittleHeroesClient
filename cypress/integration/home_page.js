describe("View Heroes", function() {
  it('clicks the link "type"', function() {
    cy.visit("http://localhost:8080");

    cy.contains('View Heroes').click();
    //cy.get("#QuickStartText").click();

    cy.url().should('include', '/children')
  });
});
