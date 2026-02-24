import { generator } from '../support/factory';

describe('Cadastro de orfanatos', () => {
  it('deve cadastrar um novo orfanato', () => {
    const orphanage = generator();

    cy.deleteOrphanage(orphanage);

    cy.goToCreate();

    cy.createOrphanage(orphanage);

    cy.modalHaveText('Orfanato cadastrado com sucesso.');
  });

  it('não deve cadastrar orfanato com o nome duplicado', () => {
    const orphanage = generator();

    cy.deleteOrphanage(orphanage);

    cy.postOrphanage(orphanage);

    cy.goToCreate();

    cy.createOrphanage(orphanage);

    cy.modalHaveText(`Já existe um cadastro com o nome: ${orphanage.name}`);
  });

  context('campos obrigatórios', () => {
    it('não deve cadastrar um orfanato sem preencher o campo "Nome"', () => {
      let orphanage = generator();

      delete orphanage.name;

      cy.goToCreate();

      cy.createOrphanage(orphanage);

      cy.alertHaveText('#name', 'Campo obrigatório');
    });

    it('não deve cadastrar um orfanato sem preencher o campo "Sobre"', () => {
      let orphanage = generator();

      delete orphanage.description;

      cy.goToCreate();

      cy.createOrphanage(orphanage);

      cy.alertHaveText('#description', 'Campo obrigatório');
    });

    it('não deve cadastrar um orfanato sem enviar ao menos uma foto', () => {
      let orphanage = generator();

      delete orphanage.images;

      cy.goToCreate();

      cy.createOrphanage(orphanage);

      cy.alertHaveText('input[type="file"]', 'Envie pelo menos uma foto');
    });

    it('não deve cadastrar um orfanato sem preencher os campos obrigatórios', () => {
      let orphanage = generator();

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
