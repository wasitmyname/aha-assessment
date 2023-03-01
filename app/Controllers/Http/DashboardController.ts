import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DashboardController {
  public async show({ view }: HttpContextContract) {
    return view.render('dashboard');
  }
}
