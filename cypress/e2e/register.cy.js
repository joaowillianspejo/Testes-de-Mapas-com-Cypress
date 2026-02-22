const data = require('../fixtures/orphanages.json');

describe('Cadastro de orfanatos', () => {
  it('deve cadastrar um novo orfanato', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    cy.goTo('/orphanages/create', -24.0191918, -46.4296952);

    cy.get('.create-orphanage-form legend')
      .should('be.visible')
      .should('have.text', 'Cadastro');

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

    cy.get('.swal2-title').should('be.visible').should('have.text', 'Uhull!');

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Orfanato cadastrado com sucesso.');
  });

  it('não deve cadastrar orfanato com o nome duplicado', () => {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    cy.deleteOrphanage(orphanage);

    cy.postOrphanage(orphanage);

    cy.goTo('/orphanages/create', -24.0191918, -46.4296952);

    cy.get('.create-orphanage-form legend')
      .should('be.visible')
      .should('have.text', 'Cadastro');

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

    cy.get('.swal2-title').should('be.visible').should('have.text', 'Oops!');

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should(
        'have.text',
        `Já existe um cadastro com o nome: ${orphanage.name}`,
      );
  });
});

Cypress.Commands.add('goTo', (url, latitude, longitude) => {
  cy.visit(url, {
    onBeforeLoad(win) {
      // Simula as coordenadas de um local específico
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsArgWith(0, {
        coords: {
          latitude,
          longitude,
          accuracy: 10,
        },
      });
    },
  });
});

Cypress.Commands.add('setMapCoordinates', (latitude, longitude) => {
  window.localStorage.setItem('hope-qa:latitude', latitude);
  window.localStorage.setItem('hope-qa:longitude', longitude);
});

Cypress.Commands.add('deleteOrphanage', (orphanage) => {
  cy.findOneAndDelete(
    { name: orphanage.name },
    { collection: 'orphanages' },
  ).then((result) => {
    if (result == null) {
      cy.log('Nenhum documento conflitante');
    } else {
      cy.log('Documento deletado:', JSON.stringify(result)); // Loga o documento deletado
    }
  });
});

Cypress.Commands.add('postOrphanage', (orphanage) => {
  const data = new FormData();

  data.append('name', orphanage.name);
  data.append('description', orphanage.description);
  data.append('latitude', orphanage.latitude);
  data.append('longitude', orphanage.longitude);
  data.append('opening_hours', orphanage.opening_hours);
  data.append('open_on_weekends', orphanage.open_on_weekends);

  cy.request({
    url: 'http://localhost:3333/orphanages',
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    body: data,
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});
