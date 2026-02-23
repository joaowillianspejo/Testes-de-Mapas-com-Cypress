Cypress.Commands.add('modalHaveText', (message) => {
  cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text', message);
});

Cypress.Commands.add('alertHaveText', (inputLocator, message) => {
  cy.get(inputLocator)
    .parent()
    .find('small')
    .should('be.visible')
    .should('have.text', message);
});
