import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SignInValidator from 'App/Validators/SignInValidator';
import SendVerifyEmailCase from 'App/Cases/SendVerifyEmailCase';
import User from "App/Models/User";

export default class SignInController {
  public async show({ view }: HttpContextContract) {
    return view.render('signIn');
  }

  public async submit({ request, response, auth, session }: HttpContextContract) {
    const data = await request.validate(SignInValidator)
    let user: User | undefined
    
    try {
      await auth.attempt(data.email, data.password, !!data.remember)
      user = auth.user
    } catch (_error) {
      session.flash('errors.attempt', 'Email or password is incorrect')
      return response.redirect().back()
    }

    /**
     * watchout, this could end up become an infinite loop
     */
    if (!user) {
      return response.redirect().toRoute('signin.show')
    }

    if (!user.emailVerifiedAt) {
      await new SendVerifyEmailCase(user.email).send()
      return response.redirect().toRoute('signup.verify')
    }

    return response.redirect().toRoute('dashboard')
  }
}
