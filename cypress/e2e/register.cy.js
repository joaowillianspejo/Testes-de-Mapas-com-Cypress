import createPage from '../support/pages/create';

const data = require('../fixtures/orphanages.json');

describe('Cadastro de orfanatos', () => {
  it('deve cadastrar um novo orfanato', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    createPage.go();
    cy.setMapCoordinates(orphanage.latitude, orphanage.longitude);
    createPage.form(orphanage);
    createPage.submit();
    createPage.modal.haveText('Orfanato cadastrado com sucesso.');
  });

  it('não deve cadastrar orfanato com o nome duplicado', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    cy.postOrphanage(orphanage);

    createPage.go();
    cy.setMapCoordinates(orphanage.latitude, orphanage.longitude);
    createPage.form(orphanage);
    createPage.submit();
    createPage.modal.haveText(
      `Já existe um cadastro com o nome: ${orphanage.name}`,
    );
  });
});
