import { generator } from '../support/factory';

describe('Mapa', () => {
  it('deve poder selecionar um orfanato no mapa', () => {
    const orphanage = generator();

    cy.deleteOrphanage(orphanage);
    cy.postOrphanage(orphanage);

    cy.goTo('/map', -24.0191918, -46.4296952);

    cy.findOrphanage(orphanage);

    cy.get('.orphanage-details-content h1')
      .should('be.visible')
      .should('have.text', orphanage.name);

    cy.googleMapsLink(orphanage.location);
  });
});
