import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  public async up () {
    await this.down()
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamp('sign_in_at', { useTz: true }).notNullable()
      table.timestamp('active_at', { useTz: true }).notNullable()
      table.timestamp('sign_out_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}
