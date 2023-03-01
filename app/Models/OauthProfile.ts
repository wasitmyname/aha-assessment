import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import OauthProvider from 'App/Models/OauthProvider'

export default class OauthProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => OauthProvider)
  public provider_id: BelongsTo<typeof OauthProvider>

  @column()
  public provided_id: string | null

  @column()
  public name: string | null

  @column()
  public email: string | null

  @column()
  public avatarUrl: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
