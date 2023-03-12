import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class UserIsActiveCase {
    constructor(private user: User) {
        this.isActive()
    }

    /**
     * New session will be created when previous session expires.
     * But if active session found, we'll update the latest timestamp.
     */
    public async isActive() {
        const model = this.user.related('sessions')
        const session = await model.query()
            .withScopes((scopes) => scopes.active())
            .first()

        if (session) {
            await session.merge({ activeAt: DateTime.now() }).save()
        } else {
            await model.create({})
        }
    }
}