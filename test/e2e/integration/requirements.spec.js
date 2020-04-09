context('extra cards', () => {
  it('is visible', () => {
    cy.server()
    cy.wait(10000)
    cy.route('**home_page.2020_start_full*', 'fixture:full.json').as('getFull')
    cy.route('**home_page.2020_start_few*', 'fixture:few.json').as('getFew')
    cy.visit('/')
    cy.get('.extra-card').should('have.length.greaterThan', 0)
  }),

  it.skip('info card visible', () => {
    cy.get('.info-card').should('have.length.greaterThan', 0)
    cy.percySnapshot()
  }),

  it('ad card visible', () => {
    cy.get('.ad-card').should('have.length.greaterThan', 0)
    cy.percySnapshot()
  }),

  it('ad card at first position', () => {
    cy.get('.card').first().should('have.class', 'extra-card')
  }),

  it('last card is extra card', () => {
    cy.viewport(2560, 1050)
    cy.visit('/').wait(500)
    cy.get('.card').last().should('have.class', 'extra-card')
  }),

  it.skip('first card Änglamark shows info card', () => {
    cy.get('.brand').contains('Änglamark').parents('.buddy').find('.info-card header').should('contain.text', 'Änglamark')
  })

})

context('show 3 rows of products', () => {

  it('mobile show 6 cards', () => {
    cy.viewport(375, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 6)
    cy.percySnapshot('375', {widths: [375]})
  }),

  it('tablet show 12 cards, 768 screen', () => {
    cy.viewport(728, 1050)
    cy.visit('/')
    cy.get('.card').should('have.length', 12)
    cy.percySnapshot('728', {widths: [728]})
  }),

  it('1024 show 18 on 1024', () => {
    cy.viewport(944, 1050)
    cy.get('.card').should('have.length', 18)
    cy.percySnapshot('944', {widths: [944]})
  }),

  it('1145 show 21', () => {
    cy.viewport(1145, 1050)
    cy.get('.card').should('have.length', 21)
    cy.percySnapshot('1145', {widths: [1145]})
  }),

  it('big screen show 24', () => {
    cy.viewport(1320, 1050)
    cy.get('.card').should('have.length', 24)
    cy.percySnapshot('1320', {widths: [1320]})
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
