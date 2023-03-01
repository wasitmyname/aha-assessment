declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        hasLowercase(): Rule,
        hasUppercase(): Rule,
        hasDigit(): Rule,
        hasSymbol(): Rule,
    }
}