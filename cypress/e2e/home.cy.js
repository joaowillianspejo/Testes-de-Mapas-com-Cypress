describe('home spec', () => {
  it('hope web deve estar online', () => {
    cy.visit('/');

    cy.get('#page-landing h1')
      .should('be.visible')
      .should('have.text', 'Semeando esperança, colhendo sorrisos');
  });
});
