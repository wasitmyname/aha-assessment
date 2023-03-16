import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ApiGuard {
  public async handle({auth}: HttpContextContract, next: () => Promise<void>) {
    auth.defaultGuard = 'api'
    await next()
  }
}
