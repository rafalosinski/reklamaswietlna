import { productsData } from '../../src/configurator/productsData';

describe('Check product', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/konfigurator');
    cy.viewport('macbook-16');
  });

  productsData.forEach((product) => {
    return it(`should display options for ${product.name}`, () => {
      cy.get('#age-native-helper').click();
      cy.get(`[data-value="${product.name}"]`).click();

      cy.get('#Color').click();
      product.colorOptions.forEach((color) => {
        return cy
          .get(`[data-value="${color.value}"]`)
          .should('contain.text', `${color.label}${color.finishLabel ? color.finishLabel : ''}`);
      });
      cy.get(`[data-value="${product.colorOptions[0].value}"]`).click();

      if (product.lightingOptions) {
        cy.get('#lighting').click();
        product.lightingOptions.forEach((lighting) => {
          return cy.get(`[data-value="${lighting.value}"]`).should('contain.text', lighting.label);
        });
      }
    });
  });
});
