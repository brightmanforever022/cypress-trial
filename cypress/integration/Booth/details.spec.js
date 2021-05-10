describe('check page contents', () => {
  beforeEach(() => {
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
    beforeEach(() => {
      cy.get('a > p').contains('Demo Photo Booth', {timeout: 20000})
        .click()
        .url({timeout: 20000}).should('include', '/booth-details?id=')
    })
    it('The title of the booth is present in the header', () => {
      cy.contains('Demo Photo Booth')
    })
  
    it('Related galleries are visible', () => {
      cy.contains('Demo Gallery')
    })

    it('Stop the booth', () => {
      // cy.get('h5', {timeout: 30000}).contains('Demo Photo Booth')
      // cy.get('div > p').contains('Your Virtual Booth is up and running')
      cy.get('button > span', {timeout: 30000}).contains("Stop").click()
        .should('have.value', 'Start', {timeout: 100000})
        .contains('Your Virtual Booth is stopped');
    })
  })
})