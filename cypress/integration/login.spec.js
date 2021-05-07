describe('check page contents', () => {
  it('visit and login', () => {
    cy.visit('http://dashboard.develop.doitselfie.eu/login')
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
      .wait(7000)
      .url().should('include', 'dashboard.develop.doitselfie.eu/booths')

  })
})