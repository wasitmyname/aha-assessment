import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import UserIsActiveCase from 'App/Cases/UserIsActiveCase'
import UserIsInactiveCase from 'App/Cases/UserIsInactiveCase'

Event.on('db:query', function ({ sql, bindings }) {
  Logger.info(sql, bindings)
})

Event.on('user:active', (user) => {
    new UserIsActiveCase(user)
})

Event.on('user:inactive', (user) => {
    new UserIsInactiveCase(user)
})