import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from 'App/Models/User'
import NewLinkValidator from 'App/Validators/NewLinkValidator';
import SendVerifyEmailCase from 'App/Cases/SendVerifyEmailCase';

export default class LinkController {
  public async get({ request, response }: HttpContextContract) {
    const data = await request.validate(NewLinkValidator)

    /**
     * for security reason, better not to let user know if email doesn't exists
     */
    try {
      const user = await User.query().where('email', data.email).first()
      if (user) {
        new SendVerifyEmailCase(user.email)
      }
    } catch (error) {}

    return response.ok({ message: 'Please check your email to proceed with verification.' })
  }
}
