const data = require('../fixtures/orphanages.json');

describe('Mapa', () => {
  it('deve poder selecionar um orfanato no mapa', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);
    cy.postOrphanage(orphanage);

    cy.goTo('/map', -24.0191918, -46.4296952);

    cy.get('.leaflet-marker-icon').as('mapList');

    cy.get('@mapList').each((element, index, list) => {
      cy.get('@mapList').eq(index).click({ force: true });

      cy.wait(500);

      cy.get('.leaflet-popup-content').as('divName');

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

    cy.contains('.leaflet-popup-content', orphanage.name)
      .find('a')
      .click({ force: true });

    cy.get('.orphanage-details-content h1')
      .should('be.visible')
      .should('have.text', orphanage.name);
  });
});
