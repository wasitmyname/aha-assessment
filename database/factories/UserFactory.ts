import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    const user = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
    }

    return user
  })
  .build()