import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { DateTime } from 'luxon'

export default class DashboardController {
  public async show({ view, auth }: HttpContextContract) {
    const signedUps = await Database.from('users').count('id as total').first()

    const today = DateTime.now().endOf('day')
    const last7Days = today.minus({weeks:1}).startOf('day')

    /**
     * Regardless if a single user is logged in multiple times in a day
     * we gonna include it as total active sessions count
     */
    const activeSessionsToday = await Database.from('sessions')
      .where(Database.raw('date(active_at)'), today.toSQLDate())
      .count('id as total')
      .first()

    /**
     * Last 7 days will include today's as well
     */
    const activeSessionsLast7Days = await Database.from('sessions')
      .whereBetween(Database.raw('date(active_at)'), [last7Days.toSQLDate(), today.toSQLDate()])
      .count('id as total')
      .first()

    const data = {
      user: auth.user,
      totalSignedUps: signedUps.total,
      totalActiveSessionsToday: activeSessionsToday.total,
      totalActiveSessionsLast7Days: activeSessionsLast7Days.total
    }

    return view.render('members/dashboard', data);
  }

  /**
   * Should only be used with Datatables configured at frontend
   */
  public async users({ request, response }: HttpContextContract) {
    const dt = request.all();
    
    const query = Database.from('users')
    const notFiltered = await query.clone().count('id as total').first()

    query
      .if(dt.search.value, (query) => {
        query.where(query => {
          for (const column of dt.columns) {
            if (column.data && JSON.parse(column.searchable)) {
              query.whereRaw(`${column.data} like '%${dt.search.value}%'`)
            }
          }
        })
      })

    const filtered = await query.clone().count('id as total').first()

    const column = dt.columns[Number(dt.order[0].column)].data

    const users = await query
      .select('users.*')
      .select(Database.raw('count(sessions.id) as signInTotal'))
      .select(Database.raw('max(sessions.active_at) as lastSession'))
      .leftJoin('sessions', 'users.id', 'sessions.user_id')
      .groupBy('users.id')
      .orderBy(column, dt.order[0].dir)
      .offset(dt.start)
      .limit(dt.length)

    const data = {
      draw: dt.draw,
      recordsTotal: notFiltered.total,
      recordsFiltered: filtered.total,
      data: users
    }

    response.json(data)
  }
}
