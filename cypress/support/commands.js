// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import './views/components';
import './views/create';
import './views/map';

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
      cy.log('Documento deletado: ', JSON.stringify(result)); // Loga o documento deletado
    }
  });
});

Cypress.Commands.add('postOrphanage', (orphanage) => {
  cy.fixture(orphanage.images[0], 'binary')
    .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/png'))
    .then((blob) => {
      const data = new FormData();

      data.append('name', orphanage.name);
      data.append('description', orphanage.description);
      data.append('latitude', orphanage.location.latitude);
      data.append('longitude', orphanage.location.longitude);
      data.append('opening_hours', orphanage.opening_hours);
      data.append('open_on_weekends', orphanage.open_on_weekends);
      data.append('images', blob, orphanage.images[0]);

      cy.env(['baseApi']).then(({ baseApi }) => {
        cy.request({
          url: `${baseApi}/orphanages`,
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
          },
          body: data,
        }).then((response) => {
          expect(response.status).to.eq(201);
        });
      });
    });
});
