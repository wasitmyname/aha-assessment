import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { SessionFactory } from 'Database/factories/SessionFactory'
import { UserFactory } from 'Database/factories/UserFactory'
import { DateTime, Interval, Settings } from 'luxon'

export default class UsersWithSessionsSeeder extends BaseSeeder {
  startsAt = DateTime.now().minus({months: 2})
  endsAt = DateTime.now().plus({months: 2})
  now = DateTime.now().valueOf()

  public async run () {
    await this.addFirstUser()
    await this.addUsersFromLastTwoMonthsUntilNextTwoMonths()
  }

  private async addFirstUser() {
    await User.create({
      name: 'John Doe',
      email: 'johndoe@domain.test',
      password: 'johndoe',
      emailVerifiedAt: DateTime.now()
    })
  }

  private async addUsersFromLastTwoMonthsUntilNextTwoMonths() {
    Settings.now = () => this.startsAt.valueOf()
    let day = this.startsAt

    while (day <= this.endsAt) {
      Settings.now = () => day.valueOf()

      const total = this.makeRandomTotalUsers()
      const users = await UserFactory.createMany(total)
      await this.addSessions(users)

      day = day.plus({days: 1})
    }
  }

  private async addSessions(users: User[]) {
    for (const user of users) {
      const sessions = this.makeSessions(user.id)
      await SessionFactory.merge(sessions).createMany(sessions.length)
    }
  }

  private makeSessions(userId: number) : Array<object> {
    const start = DateTime.now()
    const end = start.plus({ hours: 8 })
    const totalSessions = this.makeRandomTotalSessions()
    const times = Interval.fromDateTimes(start, end).divideEqually(totalSessions)

    let sessions: object[] = []
    for (const time of times) {
      const activeAt = this.chooseActiveAtRandomly(time)
      const signOutAt = this.chooseSignOutAtRandomly(time.end)
      const session = {
        userId: userId,
        signInAt: time.start,
        activeAt: activeAt,
        signOutAt: signOutAt
      }

      sessions.push(session)
    }

    return sessions
  }

  private makeRandomTotalUsers() {
    return this.chooseRandomlyWithinRange(1, 25)
  }

  private makeRandomTotalSessions() {
    return this.chooseRandomlyWithinRange(1, 30)
  }

  private chooseActiveAtRandomly(time: Interval) : DateTime {
    const start = time.start.toMillis();
    const end = time.end.toMillis();
    const choosen = this.chooseRandomlyWithinRange(start, end)
    return DateTime.fromMillis(choosen);
  }

  private chooseRandomlyWithinRange(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1) + start)
  }

  private chooseSignOutAtRandomly(time: DateTime) : DateTime | null {
    const choosen = Math.random() < 0.5;
    return choosen ? time : null
  }
}
