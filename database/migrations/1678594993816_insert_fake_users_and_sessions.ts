import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UsersWithSessionsSeeder from 'Database/seeders/UsersWithSessionsSeeder'

export default class extends BaseSchema {
  public async up () {
    await (new UsersWithSessionsSeeder(this.db)).run()
  }

  public async down () {}
}
