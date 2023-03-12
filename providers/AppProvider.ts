import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
// import { SendinblueDriver } from '../drivers/sendinblue/driver'
// import { DatabaseDriver } from '../drivers/session/databaseDriver'

export default class AppProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    const { SendinblueDriver } = await import('../drivers/sendinblue/driver')
    const Mail = this.app.container.use('Adonis/Addons/Mail')

    Mail.extend('sendinblue', (_mail, _mapping, config) => {
      return new SendinblueDriver(config)
    })
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
