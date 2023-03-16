declare module '@ioc:Adonis/Core/Response' {
    interface ResponseContract {
        validationFailed(status: number, message: any): this
    }
}