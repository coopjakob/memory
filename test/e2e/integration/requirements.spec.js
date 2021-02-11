
context('extra cards', () => {
  it('is visible', () => {
    cy.viewport(1320, 1050)
    cy.visit('/')
    cy.get('.extra-card').should('have.length.greaterThan', 0)
    cy.contains('Feta from fixture')
  }),
  it('ad card visible', () => {
    cy.viewport(1320, 1050)
    cy.get('.ad-card').should('have.length.greaterThan', 0)
    cy.percySnapshot('ad card', {widths: [1320+30]})
  })
})

context('loading screens', () => {
  it ('shows skeletons', () => {
    cy.visit('/skeleton')
    cy.percySnapshot()
  })
})

context('show 3 rows of products', () => {
  it('tiny phone show 6 cards', () => {
    cy.viewport(320, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 6)
    cy.percySnapshot('320', {widths: [320]})
  }),

  it('phone show 6 cards', () => {
    cy.viewport(375, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 6)
    cy.percySnapshot('375', {widths: [375]})
  }),

  it('big phone show 6 cards', () => {
    cy.viewport(425, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 6)
    cy.percySnapshot('425', {widths: [425]})
  }),

  it('tablet show 12 cards, 768 screen', () => {
    cy.viewport(728+30, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 12)
    cy.percySnapshot('728', {widths: [728+30]})
  }),

  it('1024 show 18 on 1024', () => {
    cy.viewport(944+30, 1050)
    cy.get('.card').should('have.length', 18)
    cy.percySnapshot('944', {widths: [944+30]})
  }),

  it('1145 show 21', () => {
    cy.viewport(1145+30, 1050)
    cy.get('.card').should('have.length', 21)
    cy.percySnapshot('1145', {widths: [1145+30]})
  }),

  it('big screen show 24', () => {
    cy.viewport(1320+30, 1050)
    cy.get('.card').should('have.length', 24)
    cy.percySnapshot('1320', {widths: [1320+30]})
  })

}),

context('on mobile', () => {

  it('click and show more', () => {
    cy.viewport(375, 1050)
    cy.visit('/')
    cy.get('.show-more button').click()
    cy.get('.card').should('have.length.greaterThan', 6)
    cy.percySnapshot('show more', {widths: [375]})
  })

})
