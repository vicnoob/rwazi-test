// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/');
    cy.contains('div', 'Notes');
    cy.contains('#plusBtn', '+');
    cy.contains('#sortBtn', 'Sort by time');
    cy.get('.item-container').should('have.length', 4);
    cy.get('.page-number').should('have.length', 2);
    cy.get('.page-number:first').should('have.text', '1');
    cy.get('.next-btn').last().click();
    cy.get('.page-number').eq(1).should('have.class', 'bg-indigo-600');
  });
});
