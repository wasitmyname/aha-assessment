import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    this.registerSendinblueDriver()
    this.registerValidationFailedApiResponse()    
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }

  private async registerSendinblueDriver() {
    const { SendinblueDriver } = await import('../drivers/sendinblue/driver')
    const Mail = this.app.container.use('Adonis/Addons/Mail')

    Mail.extend('sendinblue', (_mail, _mapping, config) => {
      return new SendinblueDriver(config)
    })
  }

  private async registerValidationFailedApiResponse() {
    const Response = this.app.container.use('Adonis/Core/Response')

    Response.macro('validationFailed', function (status, message) {
      this.status(status).json({ message })
      return this
    })
  }
}
