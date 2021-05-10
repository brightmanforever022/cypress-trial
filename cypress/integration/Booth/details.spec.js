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

  it('The title of the booth is present in the header', () => {
    cy.contains('Demo Photo Booth')    
  })

  it('Related galleries are visible', () => {
    cy.contains('Demo Gallery')
  })

  it('Stop the booth', () => {
    cy.get('a > p').contains('Demo Photo Booth', {timeout: 20000})
      .click()
      .url({timeout: 20000}).should('include', '/booth-details?id=');
    cy.get('[data-test="Page header heading"]', {timeout: 20000})
      .contains('Demo Photo Booth', {timeout: 20000});
    cy.get('p').contains('Your Virtual Booth is up and running', {timeout: 20000});
    cy.get('button > span').contains('Stop', {timeout: 20000}).click()
      .should('have.value', 'Start')
      .contains('Your Virtual Booth is stopped', {timeout: 100000});
  })
})