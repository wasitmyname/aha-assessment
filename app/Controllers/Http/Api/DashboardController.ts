import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import DashboardStatisticsCase from "App/Cases/DashboardStatisticsCase";

export default class DashboardController {
  public async show({ response }: HttpContextContract) {
    const data = await (new DashboardStatisticsCase).get()
    return response.ok(data)
  }

  public async users({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const users = await Database.from('users')
      .select('users.*')
      .select(Database.raw('count(sessions.id) as signInTotal'))
      .select(Database.raw('max(sessions.active_at) as lastSession'))
      .leftJoin('sessions', 'users.id', 'sessions.user_id')
      .groupBy('users.id')
      .paginate(page, limit)

    return response.ok(users)
  }
}
