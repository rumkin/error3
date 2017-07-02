'use strict';

class Error3 extends Error {
    constructor(code, ...args) {
        let length = Math.min(args.length, 3);
        let hasMessage = false;
        let hasDetails = false;
        let hasErrors = false;
        let message;
        let details;
        let errors;

        for (let i = 0; i < length; i++) {
            let arg = args[i];

            if (hasMessage && hasErrors && hasDetails) {
                break;
            }

            if (typeof arg === 'string') {
                if (hasMessage) {
                    break;
                }

                // This is a message
                message = arg;
                hasMessage = true;
            }
            else if (Array.isArray(arg)) {
                if (hasErrors) {
                    break;
                }

                errors = arg.slice();
                hasErrors = true;
                hasMessage = true;
                hasDetails = true;
            }
            else if (arg instanceof Error) {
                if (hasErrors) {
                    break;
                }

                errors = [arg];
                hasErrors = true;
                hasMessage = true;
                hasDetails = true;
            }
            else if (arg && arg instanceof Object){
                if (hasDetails) {
                    break;
                }

                details = arg;
                hasDetails = true;
                hasMessage = true;
            }
            else if (arg !== null) {
                break;
            }
        }

        if (! message) {
            message = code.replace(/_/g, ' ');
        }

        super(message);

        this.name = this.constructor.name;
        this.code = code;
        this.message = message;
        this.details = Object.assign({}, details);
        this.errors = errors || [];
    }

    valueOf() {
        return {
            code: this.code,
            message: this.message,
            details: this.details,
        };
    }

    toJSON() {
        return this.valueOf();
    }

    static fromJSON(value) {
        const errors = value.errors
            ? value.errors.map(this.fromJSON.bind(this))
            : [];

        return new this(value.code, value.message, value.details || {}, errors);
    }
}

module.exports = Error3;
