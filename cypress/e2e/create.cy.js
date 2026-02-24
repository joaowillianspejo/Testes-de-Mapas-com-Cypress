const data = require('../fixtures/orphanages.json');

describe('Cadastro de orfanatos', () => {
  it('deve cadastrar um novo orfanato', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    cy.goToCreate();

    cy.createOrphanage(orphanage);

    cy.modalHaveText('Orfanato cadastrado com sucesso.');
  });

  it('não deve cadastrar orfanato com o nome duplicado', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    cy.postOrphanage(orphanage);

    cy.goToCreate();

    cy.createOrphanage(orphanage);

    cy.modalHaveText(`Já existe um cadastro com o nome: ${orphanage.name}`);
  });

  context('campos obrigatórios', () => {
    it('não deve cadastrar um orfanato sem preencher o campo "Nome"', () => {
      const randomOrphanage = Math.floor(
        Math.random() * data.orphanages.length,
      );

      let orphanage = data.orphanages[randomOrphanage];

      delete orphanage.name;

      cy.goToCreate();

      cy.createOrphanage(orphanage);

      cy.alertHaveText('#name', 'Campo obrigatório');
    });

    it('não deve cadastrar um orfanato sem preencher o campo "Sobre"', () => {
      const randomOrphanage = Math.floor(
        Math.random() * data.orphanages.length,
      );

      let orphanage = data.orphanages[randomOrphanage];

      delete orphanage.description;

      cy.goToCreate();

      cy.createOrphanage(orphanage);

      cy.alertHaveText('#description', 'Campo obrigatório');
    });

    it('não deve cadastrar um orfanato sem enviar ao menos uma foto', () => {
      const randomOrphanage = Math.floor(
        Math.random() * data.orphanages.length,
      );

      let orphanage = data.orphanages[randomOrphanage];

      delete orphanage.images;

      cy.goToCreate();

      cy.createOrphanage(orphanage);

      cy.alertHaveText('input[type="file"]', 'Envie pelo menos uma foto');
    });

    it('não deve cadastrar um orfanato sem preencher os campos obrigatórios', () => {
      const randomOrphanage = Math.floor(
        Math.random() * data.orphanages.length,
      );

      let orphanage = data.orphanages[randomOrphanage];

      delete orphanage.location;
      delete orphanage.name;
      delete orphanage.description;
      delete orphanage.images;
      delete orphanage.opening_hours;

      cy.goToCreate();

      cy.createOrphanage(orphanage);

      cy.alertHaveText(
        '.map .leaflet-container',
        'Informe a localizaçao no mapa',
      );
      cy.alertHaveText('#name', 'Campo obrigatório');
      cy.alertHaveText('#description', 'Campo obrigatório');
      cy.alertHaveText('input[type="file"]', 'Envie pelo menos uma foto');
      cy.alertHaveText('#opening_hours', 'Campo obrigatório');
    });
  });
});
