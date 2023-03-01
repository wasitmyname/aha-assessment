import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { DateTime } from 'luxon'

export default class OauthController {
  public async redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, response, session, auth, request }: HttpContextContract) {
    /** 
     * facebook intentionally adds # _=_ in url
     * we'll remove that in frontend
    */
   
    const provider = ally.use(params.provider)

    /**
     * User has explicitly denied the login request
     */
    if (provider.accessDenied()) {
      session.flash('errors.attempt', "Ok, let's sign in later.")
      return response.redirect().toRoute('signin.show')
    }

    /**
     * Unable to verify the CSRF state
     */
    if (provider.stateMisMatch()) {
      session.flash('errors.attempt', "Sign in request expired. Let's try again.")
      return response.redirect().toRoute('signin.show')
    }

    /**
     * There was an unknown error during the redirect
     */
    if (provider.hasError()) {
      session.flash('errors.attempt', provider.getError())
      return response.redirect().toRoute('signin.show')
    }

    /**
     * All seems good, proceed with sign in process
     */
    const providedUser = await provider.user()

    let user = await User.query().where('email', providedUser.email).first()

    /**
     * Regardless user been signed up or not,
     * we'll create new account if email is not found
     */
    if (!user) {
      user = await User.create({
        name: providedUser.name,
        email: providedUser.email,
        avatarUrl: providedUser.avatarUrl,
        oauthToken: providedUser.token.token,
        emailVerifiedAt: DateTime.now(),
      })
    }

    /**
     * Update existing user details if needed
     */
    let updated = {}

    if (!user.name) {
      updated['name'] = providedUser.name
    }

    if (!user.avatarUrl) {
      updated['avatarUrl'] = providedUser.avatarUrl
    }

    if (!user.emailVerifiedAt) {
      updated['emailVerifiedAt'] = DateTime.now()
    }

    if (Object.keys(updated).length) {
      await user.merge(updated).save()
    }

    console.log('request', request)
    console.log('params', params)

    /**
     * Finally, let's rock
     */
    await auth.login(user)
    return response.redirect().toRoute('dashboard')
  }
}
