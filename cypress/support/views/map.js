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

Cypress.Commands.add('googleMapsLink', (location) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;

  cy.contains('a', 'Ver rotas no Google Maps').should(
    'have.attr',
    'href',
    googleMapsUrl,
  );
});
