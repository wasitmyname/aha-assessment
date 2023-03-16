import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UpdateNameValidator from 'App/Validators/UpdateNameValidator';

export default class ProfileController {
  public async show({ auth, response }: HttpContextContract) {
    return response.ok(auth.user)
  }

  public async updateName({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(UpdateNameValidator)
    let user = auth.user!

    if (data.name != user.name) {
      user = await user.merge(data).save()
    }
    
    return response.ok(user)
  }
}
