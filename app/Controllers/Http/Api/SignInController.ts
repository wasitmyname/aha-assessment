import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SignInValidator from 'App/Validators/SignInValidator';
import SendVerifyEmailCase from 'App/Cases/SendVerifyEmailCase';
import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'

export default class SignInController {
  public async submit({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(SignInValidator)

    const user = await User.query()
      .where('email', data.email)
      .firstOrFail()

    const hashedPassword = user.password ?? ''

    if (!(await Hash.verify(hashedPassword, data.password))) {
      return response.unauthorized({ message: 'Email or password is incorrect.' })
    }

    if (!user.emailVerifiedAt) {
      new SendVerifyEmailCase(user.email)
      return response.forbidden({ message: 'Please verify email to get into dashboard.' })
    }

    const token = await auth.login(user, {expiresIn: '10m'})

    return response.ok({ message: 'Ok', token: token })
  }
}
