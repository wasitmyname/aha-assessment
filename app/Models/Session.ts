import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, BelongsTo, scope } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Config from '@ioc:Adonis/Core/Config'
import Pluralize from 'pluralize';
import Database from '@ioc:Adonis/Lucid/Database'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public signInAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public activeAt: DateTime

  @column.dateTime()
  public signOutAt: DateTime | null

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public static active = scope((query) => {
    const age = Pluralize.singular(Config.get('session.age'))
    query
      .where('active_at', '>=', Database.raw(`NOW() - INTERVAL ${age}`))
      .whereNull('sign_out_at')
  })
}