import Mail, { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Config from '@ioc:Adonis/Core/Config'
import Route from '@ioc:Adonis/Core/Route'

export default class VerifyEmailMailer extends BaseMailer {
  public mailer = Mail.use('sendinblue')

  constructor(private email: string) {
    super()
  }

  public prepare(message: MessageContract) {
    const appUrl = Config.get('app.url')
    const options = {
      expiresIn: '1d',
      purpose: 'verifyEmail',
      prefixUrl: appUrl,
      qs: {
        email: this.email
      }
    }

    const signedUrl = Route.makeSignedUrl(
      'link.verify',
      { email: this.email },
      options
    )

    message
      .subject('Please Verify Your Email')
      .from('noreply@aha-assessment.test')
      .to(this.email)
      .html(`
        Please click the following link to verify your email
        <a href="${signedUrl}" target="_blank">Verify email</a>
      `)
  }
}
