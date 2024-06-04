import { PRODUCTS } from '../../src/configurator/utils/constants';

describe('Price calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/konfigurator');
    cy.viewport('macbook-16');
  });

  it('should calculate correct price', () => {
    cy.get('#age-native-helper').click();
    cy.get(`[data-value="${PRODUCTS.SINGLE_DIBOND}"]`).click();
    cy.get('input#conf-size-width').clear().type('350');
    cy.get('input#conf-size-height').clear().type('160');
    cy.get('input[name="dusk-sensor"]').click();
    cy.get('input[name="effect3d"]').click();
    cy.get('input[name="fast-production"]').click();
    cy.get('input[name="project"]').click();
    cy.get('#netPrice').should('contain.text', '7392.00');
  });

  it('should calculate correct price', () => {
    cy.get('#age-native-helper').click();
    cy.get(`[data-value="${PRODUCTS.SINGLE_DIBOND}"]`).click();
    cy.get('input#conf-size-width').clear().type('160');
    cy.get('input#conf-size-height').clear().type('350');
    cy.get('input[name="dusk-sensor"]').click();
    cy.get('input[name="effect3d"]').click();
    cy.get('input[name="fast-production"]').click();
    cy.get('input[name="project"]').click();
    cy.get('#netPrice').should('contain.text', '7392.00');
  });

  it('should calculate correct price', () => {
    cy.get('#age-native-helper').click();
    cy.get(`[data-value="${PRODUCTS.SINGLE_DIBOND}"]`).click();
    cy.get('input#conf-size-width').clear().type('130');
    cy.get('input#conf-size-height').clear().type('350');
    cy.get('input[name="dusk-sensor"]').click();
    cy.get('input[name="effect3d"]').click();
    cy.get('input[name="fast-production"]').click();
    cy.get('input[name="project"]').click();
    cy.get('#netPrice').should('contain.text', '6216.00');
  });
});
