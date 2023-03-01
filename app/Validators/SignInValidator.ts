import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Messages'

export default class SignInValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    email: schema.string([
      rules.required(),
      rules.email(),
      rules.trim()
    ]),
    password: schema.string([
      rules.required()
    ]),
    remember: schema.boolean.optional()
  })
}
