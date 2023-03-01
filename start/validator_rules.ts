import { validator } from '@ioc:Adonis/Core/Validator'
import PasswordValidator from 'password-validator'

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
                'hasLowercase validation failed',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
            compiledOptions: {},
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
                'hasUppercase validation failed',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
            compiledOptions: {},
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
                'hasDigit validation failed',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
            compiledOptions: {},
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
                'hasSymbol validation failed',
                options.arrayExpressionPointer
            )
        }
    },
    () => {
        return {
            async: true,
            compiledOptions: {},
        }
    }
)