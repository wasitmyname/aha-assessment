import VerifyEmailMailer from 'App/Mailers/VerifyEmailMailer'

export default class SendVerifyEmailCase {
    constructor(private email: string) {
        this.send()
    }

    public async send() {
        await new VerifyEmailMailer(this.email).sendLater()
    }
}