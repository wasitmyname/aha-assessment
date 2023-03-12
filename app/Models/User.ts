import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Session from './Session'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  /**
   * To accomodate social oauth feature, we had to sacrifice for empty password
   * This allows signing up when user doesn't exists yet
   */
  @column({ serializeAs: null })
  public password: string | null

  @column()
  public avatarUrl: string | null

  @column()
  public rememberMeToken: string | null

  @column()
  public oauthToken: string | null

  @column.dateTime()
  public emailVerifiedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.password && user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  /**
   * To speed up sign up, we didn't require user to fill in their name
   * We'll use name in email address by default and user can change it later in their profile page
   */
  @beforeSave()
  public static async setName (user: User) {
    if (!user.name) {
      user.name = user.email.split('@')[0]
    }
  }

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>
}
