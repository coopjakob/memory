/// <reference types="Cypress" />

context('Categories', () => {
  it('should render products', () => {
    cy.visit('/')
    cy.get('[data-testid="productCard"]')
      .its('length')
      .should('be.gt', 0)
  })
})
