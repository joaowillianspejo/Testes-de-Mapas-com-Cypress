class modal {
  haveText(message) {
    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', message);
  }
}

export default new modal();
