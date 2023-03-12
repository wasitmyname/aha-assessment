import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UpdateNameValidator from 'App/Validators/UpdateNameValidator';

export default class ProfileController {
  public async show({ view, auth }: HttpContextContract) {
    const data = {
      user: auth.user,
    }
    return view.render('members/profile', data)
  }

  public async updateName({ request, auth, session, response }: HttpContextContract) {
    const data = await request.validate(UpdateNameValidator)
    const user = auth.user!

    if (data.name != user.name) {
      await user.merge(data).save()
      session.flash('message', 'Your name is updated!')
    }
    
    return response.redirect().back()
  }
}
