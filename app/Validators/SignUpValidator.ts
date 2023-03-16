import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Messages'

export default class SignUpValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.trim()
    ]),
    password: schema.string([
      rules.hasLowercase(),
      rules.hasUppercase(),
      rules.hasDigit(),
      rules.hasSymbol(),
      rules.minLength(8)
    ])
  })
}
