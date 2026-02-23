Cypress.Commands.add('findOrphanage', (orphanage) => {
  const popupLocator = '.leaflet-popup-content';

  cy.get('.leaflet-marker-icon').as('mapList');

  cy.get('@mapList').each((element, index, list) => {
    cy.get('@mapList').eq(index).click({ force: true });

    cy.wait(500);

    cy.get(popupLocator).as('divName');

    cy.get('@divName')
      .invoke('text')
      .then((text) => {
        cy.log(text);

        if (text === orphanage.name) {
          cy.get('@mapList').eq(index).as('foundItem');
          cy.log(`Orfanato "${orphanage.name}" encontrado!`);
        }
      });
  });

  cy.get('@foundItem');

  cy.contains(popupLocator, orphanage.name).find('a').click({ force: true });
});
