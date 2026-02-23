const data = require('../fixtures/orphanages.json');

describe('Cadastro de orfanatos', () => {
  it('deve cadastrar um novo orfanato', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    cy.goToCreate();

    cy.setMapCoordinates(orphanage.latitude, orphanage.longitude);

    cy.createOrphanage(orphanage);

    cy.modalHaveText('Orfanato cadastrado com sucesso.');
  });

  it('não deve cadastrar orfanato com o nome duplicado', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    cy.postOrphanage(orphanage);

    cy.goToCreate();

    cy.setMapCoordinates(orphanage.latitude, orphanage.longitude);

    cy.createOrphanage(orphanage);

    cy.modalHaveText(`Já existe um cadastro com o nome: ${orphanage.name}`);
  });
});
