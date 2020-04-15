/// <reference types="Cypress" />

context('Categories', () => {
  it('should render products', () => {
    cy.visit('/')
    cy.get('.grid')
      .its('length')
      .should('be.gt', 0)
  })
})
