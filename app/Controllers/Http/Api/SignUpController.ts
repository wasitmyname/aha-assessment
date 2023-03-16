import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from 'App/Models/User'
import SignUpValidator from 'App/Validators/SignUpValidator';
import SendVerifyEmailCase from 'App/Cases/SendVerifyEmailCase';

export default class SignUpController {
  public async submit({ request, response }: HttpContextContract) {
    const data = await request.validate(SignUpValidator)
    const user = await User.create(data)
    new SendVerifyEmailCase(user.email)
    return response.ok({ message: 'Please check your email to proceed with verification.' })
  }
}
