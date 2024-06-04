describe('Full flow', () => {
  it('Should get to the end', () => {
    cy.visit('http://localhost:3000/');
    cy.viewport('macbook-16');
    cy.get('button').contains('Konfigurator').click();
    cy.wait(8000);
    cy.get('input#conf-size-width').clear().type('250');
    cy.get('input#conf-size-height').clear().type('150');
    cy.get('div#Color').click();
    cy.get('li.MuiButtonBase-root').contains('Antracyt').click();
    cy.get('input[name="dusk-sensor"]').click();
    cy.get('input[name="effect3d"]').click();
    cy.get('input[name="fast-production"]').click();
    cy.get('input[name="project"]').click();
    cy.get('button').contains('Dalej').click();
    cy.get('input[name="shipping-localDelivery"]').click();
    cy.get('p').contains('5742.50');
    cy.get('button').contains('Dalej').click();
    cy.get('#login-email').clear().type('testy@reklamaswietlna.com');
    cy.get('#login-password').clear().type('dupa123');
    cy.get('#login-button').click();
    cy.wait(10000);
    cy.get('h6').contains('Dane do faktury');
    cy.get('button').contains('Dalej').click();
  });
});
