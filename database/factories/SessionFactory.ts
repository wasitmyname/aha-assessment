import Session from 'App/Models/Session'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const SessionFactory = Factory
  .define(Session, ({ faker }) => {
    const session = {}
    return session
  })
  .build()