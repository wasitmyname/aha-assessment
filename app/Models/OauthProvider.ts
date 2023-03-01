import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import OauthProfile from 'App/Models/OauthProvider'

export default class OauthProvider extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => OauthProfile)
  public profiles: HasMany<typeof OauthProfile>
}
