import VerifyEmailMailer from 'App/Mailers/VerifyEmailMailer'

export default class SendVerifyEmailCase {
    constructor(private email: string) {}

    public async send() {
        await new VerifyEmailMailer(this.email).sendLater()
    }
}