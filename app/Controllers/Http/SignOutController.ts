import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Event from '@ioc:Adonis/Core/Event'
import User from "App/Models/User";

export default class SignOutController {
  public async submit({ auth, response }: HttpContextContract) {
    let user: User | undefined

    if (auth.user) {
      user = auth.user
    }
    // const userId = auth.user!.id
    
    await auth.logout()

    if (auth.isLoggedOut && user) {
      /**
       * Mark user signed out
       */
      Event.emit('user:inactive', user)
    }

    return response.redirect().toRoute('signin.show')
  }
}
