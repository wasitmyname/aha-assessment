import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from 'App/Models/User'
import NewLinkValidator from 'App/Validators/NewLinkValidator';
import { DateTime } from 'luxon'
import SendVerifyEmailCase from 'App/Cases/SendVerifyEmailCase';

export default class LinkController {
  public async show({ view }: HttpContextContract) {
    return view.render('verify/link')
  }

  public async send({ request, response }: HttpContextContract) {
    const data = await request.validate(NewLinkValidator)

    /**
     * for security reason, better not to let user know if email doesn't exists
     */
    try {
      const user = await User.query().where('email', data.email).first()
      if (user) {
        await new SendVerifyEmailCase(user.email).send()
      }
    } catch (_error) {}

    return response.redirect().toRoute('link.sent')
  }

  public async sent({ view }: HttpContextContract) {
    return view.render('verify/email')
  }

  public async verify({ request, response, auth }: HttpContextContract) {
    if (!request.hasValidSignature('verifyEmail')) {
      return response.redirect().toRoute('link.show')
    }

    const user = await User.query().where('email', request.qs().email).first()

    if (!user) {
      return response.redirect().toRoute('signup.show')
    }

    if (!user.emailVerifiedAt) {
      await user.merge({ emailVerifiedAt: DateTime.now() }).save()
    }

    await auth.login(user)

    return response.redirect().toRoute('dashboard')
  }
}
