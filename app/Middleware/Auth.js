'use strict'

class Auth {
  async handle ({ request, response, auth }, next) {
    try {
      await auth.check()
    } catch (error) {
      response.send('You are not logged in')
    }
    
    await next()
  }
}
