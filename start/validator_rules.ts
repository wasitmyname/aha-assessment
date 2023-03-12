import { validator } from '@ioc:Adonis/Core/Validator'
import PasswordValidator from 'password-validator'
import Hash from '@ioc:Adonis/Core/Hash'

validator.rule(
    'hasLowercase',
    async (value, _, options) => {
        if (typeof value !== 'string') {
            return
        }

        var hasLowercase = (new PasswordValidator).has().lowercase();

        if (!hasLowercase.validate(value)) {
            options.errorReporter.report(
                options.pointer,
                'hasLowercase',
                'hasLowercase must contains a lowercase',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
        }
    }
)

validator.rule(
    'hasUppercase',
    async (value, _, options) => {
        if (typeof value !== 'string') {
            return
        }

        var hasUppercase = (new PasswordValidator).has().uppercase();

        if (!hasUppercase.validate(value)) {
            options.errorReporter.report(
                options.pointer,
                'hasUppercase',
                'hasUppercase must contains an uppercase',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
        }
    }
)

validator.rule(
    'hasDigit',
    async (value, _, options) => {
        if (typeof value !== 'string') {
            return
        }

        var hasDigit = (new PasswordValidator).has().digits();

        if (!hasDigit.validate(value)) {
            options.errorReporter.report(
                options.pointer,
                'hasDigit',
                'hasDigit must contains a number',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
        }
    }
)

validator.rule(
    'hasSymbol',
    async (value, _, options) => {
        if (typeof value !== 'string') {
            return
        }

        var hasSymbol = (new PasswordValidator).has().symbols();

        if (!hasSymbol.validate(value)) {
            options.errorReporter.report(
                options.pointer,
                'hasSymbol',
                'hasSymbol must contains a symbol',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
        }
    }
)

validator.rule(
    'oldPasswordMatch',
    async (value, [hashed], options) => {
        if (typeof value !== 'string') {
            return
        }

        const match = await Hash.verify(hashed, value)

        if (!match) {
            options.errorReporter.report(
                options.pointer,
                'oldPasswordMatch',
                'oldPasswordMatch does not match',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
        }
    }
)