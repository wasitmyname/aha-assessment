import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Messages'

export default class ChangePasswordValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    old_password: schema.string([
      rules.oldPasswordMatch(this.ctx.auth.user!.password)
    ]),
    password: schema.string([
      rules.required(),
      rules.confirmed(),
      rules.hasLowercase(),
      rules.hasUppercase(),
      rules.hasDigit(),
      rules.hasSymbol(),
      rules.minLength(8)
    ])
  })
}
