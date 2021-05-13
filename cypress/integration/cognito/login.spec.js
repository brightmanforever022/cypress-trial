describe('Cognito', function () {
  beforeEach(function () {
    // Seed database with test data
    cy.task('db:seed')

    // Programmatically login via Amazon Cognito API
    cy.loginByCognitoApi(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    )
  })

  it('shows onboarding', function () {
    cy.contains('Get Started').should('be.visible')
  })
})