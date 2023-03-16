import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Messages'

export default class UpdateNameValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super(ctx)
  }

  public schema = schema.create({
    name: schema.string()
  })
}
