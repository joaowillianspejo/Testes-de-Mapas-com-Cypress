Cypress.Commands.add('modalHaveText', (message) => {
  cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text', message);
});
