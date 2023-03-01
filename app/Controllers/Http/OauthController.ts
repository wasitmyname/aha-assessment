import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import User from "App/Models/User";

export default class OauthController {
  public async redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, params }: HttpContextContract) {
    const provider = ally.use(params.provider)

    /**
     * User has explicitly denied the login request
     */
    if (provider.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (provider.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (provider.hasError()) {
      return provider.getError()
    }

    /**
     * Finally, access the user
     */
    const providedUser = await provider.user()

    console.log(providedUser)

    /**
     * Find the user by email or create
     * a new one
     */
    // const user = await User.firstOrCreate({
    //   email: providedUser.email,
    // }, {
    //   name: providedUser.name,
    //   // accessToken: providedUser.token.token,
    //   // isVerified: providedUser.emailVerificationState === 'verified'
    // })

    // /**
    //  * Login user using the web guard
    //  */
    // await auth.login(user)
  }
}
