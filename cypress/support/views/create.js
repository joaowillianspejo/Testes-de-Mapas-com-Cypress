Cypress.Commands.add('goToCreate', () => {
  cy.goTo('/orphanages/create', -24.0191918, -46.4296952);

  cy.get('.create-orphanage-form legend')
    .should('be.visible')
    .should('have.text', 'Cadastro');
});

Cypress.Commands.add('createOrphanage', (orphanage) => {
  cy.get('#name').as('fieldName');
  cy.get('#description').as('fieldDescription');
  cy.get('#opening_hours').as('fieldOpeningHours');
  cy.get('input[type="file"]').as('fieldImages');

  orphanage.location
    ? cy.setMapCoordinates(
        orphanage.location.latitude,
        orphanage.location.longitude,
      )
    : cy.log('Empty map coordinates');

  orphanage.name
    ? cy.get('@fieldName').type(orphanage.name)
    : cy.log('Empty field name');

  orphanage.description
    ? cy.get('@fieldDescription').type(orphanage.description)
    : cy.log('Empty field description');

  orphanage.opening_hours
    ? cy.get('@fieldOpeningHours').type(orphanage.opening_hours)
    : cy.log('Empty field opening_hours');

  orphanage.open_on_weekends == true
    ? cy.contains('button', 'Sim').click()
    : cy.contains('button', 'Não').click();

  if (orphanage.images) {
    const images = orphanage.images.map((image) => `cypress/fixtures/${image}`);

    cy.get('@fieldImages').selectFile(images, {
      force: true,
      action: 'select', // Garante que ele trate as strings como caminhos de arquivos
    });
  } else {
    cy.log('Empty field images');
  }

  cy.get('.create-orphanage-form .save-button').click();
});
