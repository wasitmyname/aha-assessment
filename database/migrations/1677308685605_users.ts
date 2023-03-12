import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    await this.down()
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 50).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).nullable()
      table.string('avatar_url').nullable()
      table.string('remember_me_token').nullable()
      table.string('oauth_token').nullable()
      table.timestamp('email_verified_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName)
  }
}
