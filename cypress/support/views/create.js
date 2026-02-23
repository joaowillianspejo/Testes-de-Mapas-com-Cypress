Cypress.Commands.add('goToCreate', () => {
  cy.goTo('/orphanages/create', -24.0191918, -46.4296952);

  cy.get('.create-orphanage-form legend')
    .should('be.visible')
    .should('have.text', 'Cadastro');
});

Cypress.Commands.add('createOrphanage', (orphanage) => {
  cy.setMapCoordinates(orphanage.latitude, orphanage.longitude);

  cy.get('#name').type(orphanage.name);
  cy.get('#description').type(orphanage.description);
  cy.get('#opening_hours').type(orphanage.opening_hours);

  if (orphanage.open_on_weekends == true) {
    cy.contains('button', 'Sim').click();
  } else {
    cy.contains('button', 'Não').click();
  }

  const images = orphanage.images.map((image) => `cypress/fixtures/${image}`);

  cy.get('input[type="file"]').selectFile(images, {
    force: true,
    action: 'select', // Garante que ele trate as strings como caminhos de arquivos
  });

  cy.get('.create-orphanage-form .save-button').click();
});
