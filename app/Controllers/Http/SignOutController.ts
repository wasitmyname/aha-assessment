import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SignOutController {
  public async submit({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('signin.show')
  }
}
