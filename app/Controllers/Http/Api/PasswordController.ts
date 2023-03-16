import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ChangePasswordValidator from 'App/Validators/ChangePasswordValidator';

export default class PasswordController {
  public async change({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(ChangePasswordValidator)
    await auth.user!.merge({password: data.password}).save()
    return response.ok({ message: 'Your new password has been set!' })
  }
}
