import { DateTime } from 'luxon'
import Session from 'App/Models/Session'
import User from 'App/Models/User'

export default class UserIsInactiveCase {
    constructor(private user: User) {
        if (!user) {
            return
        }
        
        this.isInactive()
    }

    /**
     * If active session found, we'll update the latest timestamps.
     * signOutAt is expected to be NULL when user left browser idle until session expires.
     */
    public async isInactive() {
        const session = await Session.query()
            .where('user_id', this.user.id)
            .withScopes((scopes) => scopes.active())
            .first()

        if (!session) {
            return
        }

        await session
            .merge({
                activeAt: DateTime.now(),
                signOutAt: DateTime.now()
            })
            .save()
    }
}