import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SignInValidator from 'App/Validators/SignInValidator';
import SendVerifyEmailCase from 'App/Cases/SendVerifyEmailCase';

export default class SignInController {
  public async show({ view }: HttpContextContract) {
    return view.render('guests/signIn')
  }

  public async submit({ request, response, auth, session }: HttpContextContract) {
    const data = await request.validate(SignInValidator)
    
    try {
      await auth.attempt(data.email, data.password, !!data.remember)
    } catch (error) {
      session.flash('errors.attempt', 'Email or password is incorrect')
      return response.redirect().back()
    }

    if (!auth.user!.emailVerifiedAt) {
      new SendVerifyEmailCase(auth.user!.email)
      return response.redirect().toRoute('signup.verify')
    }

    return response.redirect().toRoute('dashboard.show')
  }
}
