context('extra cards', () => {

  it('is visible', () => {
    cy.visit('/')
    cy.get('.extra-card').should('have.length.greaterThan', 0)
  }),

  it('info card visible', () => {
    cy.get('.info-card').should('have.length.greaterThan', 0)
  }),

  it('ad card visible', () => {
    cy.get('.ad-card').should('have.length.greaterThan', 0)
  }),

  it('ad card at first position', () => {
    cy.get('.card').first().should('have.class', 'extra-card')
  }),

  it('last card is extra card', () => {
    cy.viewport(2560, 1050)
    cy.visit('/').wait(500)
    cy.get('.card').last().should('have.class', 'extra-card')
  }),

  it('first card Änglamark shows info card', () => {
    cy.get('.brand').contains('Änglamark').parents('.buddy').find('.info-card header').should('contain.text', 'Änglamark')
  })

})

context('show 3 rows of products', () => {

  it('mobile show 6 cards', () => {
    cy.viewport(375, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 6)
  }),

  it('tablet show 12 cards, 768 screen', () => {
    cy.viewport(728, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 12)
  }),

  it('1024 show 18 on 1024', () => {
    cy.viewport(944, 1050)
    cy.get('.card')
      .its('length')
      cy.get('.card').should('have.length', 18)
  }),

  it('1145 show 21', () => {
    cy.viewport(1145, 1050)
    cy.get('.card')
      .its('length')
      cy.get('.card').should('have.length', 21)
  }),

  it('big screen show 24', () => {
    cy.viewport(1320, 1050)
    cy.get('.card')
      .its('length')
      cy.get('.card').should('have.length', 24)
  })

}),

context('on mobile', () => {

  it('click and show more', () => {
    cy.viewport(375, 1050)
    cy.visit('/')
    cy.get('.show-more button').click()
    cy.get('.card').should('have.length.greaterThan', 6)
  })

})