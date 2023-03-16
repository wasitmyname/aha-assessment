import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardStatisticsCase {
    public async get() {
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

        return {
            totalSignedUps: signedUps.total,
            totalActiveSessionsToday: activeSessionsToday.total,
            totalActiveSessionsLast7Days: activeSessionsLast7Days.total
        }
    }
}