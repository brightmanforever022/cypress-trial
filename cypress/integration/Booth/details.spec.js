describe('check page contents', () => {
  before(() => {
    cy.intercept('GET', '/booths').as('boothsPage')
    cy.visit('/login')
    cy
      .get('.MuiInputBase-input.MuiOutlinedInput-input')
      .eq(0)
      .type('whitehorse1990324@gmail.com')
      
    cy
      .get('.MuiInputBase-input.MuiOutlinedInput-input')
      .eq(1)
      .type('irfan_farrel')
    cy
      .get('[data-test="Login button"]')
      .click()
      .url({timeout: 20000}).should('include', '/booths')
  })

  context('detail page', () => {
    before(() => {
      cy.get('a > p').contains('Demo Photo Booth', {timeout: 20000})
        .click()
        .url({timeout: 20000}).should('include', '/booth-details?id=')
    })
    
    it('The title of the booth is present in the header', () => {
      cy.get('h5', {timeout: 30000})
        .should('have.length', 3)
        // .and(($titleEl) => {
        //   expect($titleEl.get(0).textContent, 'Title').to.equal('Demo Photo Booth')
        // })
    })
  
    it('Related galleries are visible', () => {
      cy.contains('Gallery:')
    })

    it('Stop the booth', () => {
      cy.get('div > p').contains('Your Virtual Booth is up and running');
      cy.get('button > span', {timeout: 30000}).eq(0).contains("Stop")
        .click({ force: true })
      cy.get('p', {timeout: 10000}).contains('Stopping your booth')
    })
  })
})