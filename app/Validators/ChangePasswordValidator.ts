import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Messages'

export default class ChangePasswordValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    old_password: schema.string([
      rules.oldPasswordMatch(this.ctx.auth.user!.password)
    ]),
    password: schema.string(this.passwordRules())
  })

  private passwordRules() {
    let criteria = [
      rules.hasLowercase(),
      rules.hasUppercase(),
      rules.hasDigit(),
      rules.hasSymbol(),
      rules.minLength(8)
    ]

    if (this.ctx.auth.defaultGuard === 'web') {
      criteria.push(rules.confirmed())
    }

    return criteria
  }
}
