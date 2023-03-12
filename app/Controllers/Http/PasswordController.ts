import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ChangePasswordValidator from 'App/Validators/ChangePasswordValidator';

export default class PasswordController {
  public async show({ view, auth }: HttpContextContract) {
    const data = {
      user: auth.user,
    }
    return view.render('members/password', data)
  }

  public async update({ request, auth, session, response }: HttpContextContract) {
    const data = await request.validate(ChangePasswordValidator)
    await auth.user!.merge({password: data.password}).save()
    session.flash('message', 'Your new password has been set!')
    
    return response.redirect().back()
  }
}
