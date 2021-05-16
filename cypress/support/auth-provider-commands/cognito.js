import Amplify, { Auth } from 'aws-amplify'
// var AWS = require('aws-sdk');
import awsmobile from '../../../aws-exports';

Amplify.configure(awsmobile);
Auth.configure({
  region: 'eu-central-1',
  userPoolId: 'eu-central-1_vzht8iuBl',
  userPoolWebClientId: 'voq51uncia50sa2kp24k5dchj',
  authenticationFlowType: 'USER_SRP_AUTH',
})

console.log('credentialsProvider: ', Auth)

// Amazon Cognito
Cypress.Commands.add('loginByCognitoApi', (username, password) => {
  const log = Cypress.log({
    displayName: 'COGNITO LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })

  log.snapshot('before')
  Amplify.configure({
    Auth: {
      identityPoolId: 'eu-central-1:8f20ecc8-a28f-41b3-9251-7f4639611c6e', // Amazon Cognito Identity Pool ID
      region: 'eu-central-1', // Amazon Cognito Region
    },
  })

  Auth.signIn(username, password)
    .then((user) => console.log(user))
    .catch((err) => console.log('signIn error: ', err))

  cy.wrap(signIn, { log: false }).then((cognitoResponse) => {
    console.log('cognitoResponse: ', cognitoResponse)
    const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.idToken`,
      cognitoResponse.signInUserSession.idToken.jwtToken
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.accessToken`,
      cognitoResponse.signInUserSession.accessToken.jwtToken
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.refreshToken`,
      cognitoResponse.signInUserSession.refreshToken.token
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.clockDrift`,
      cognitoResponse.signInUserSession.clockDrift
    )

    window.localStorage.setItem(
      `${cognitoResponse.keyPrefix}.LastAuthUser`,
      cognitoResponse.username
    )

    window.localStorage.setItem('amplify-authenticator-authState', 'signedIn')
    log.snapshot('after')
    log.end()
  })

  cy.visit('/')
})